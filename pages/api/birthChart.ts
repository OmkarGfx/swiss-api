import type { NextApiRequest, NextApiResponse } from "next";
import { geocodeAndGetTimezone, getPlanetPositions, BirthData, PlanetPosition } from '../../src/lib/astrology';
import { supabase } from '../../src/utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { birthDate, birthTime, location, user_id, name = "", gender = null } = req.body;

  if (!birthDate || !birthTime || !location || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Geocode the location and get timezone
    const geoData = await geocodeAndGetTimezone(location);

    if (!geoData) {
      return res.status(404).json({ error: `Could not find location or determine timezone for: ${location}` });
    }

    const { latitude, longitude, tzid } = geoData;

    // 2. Check for existing chart in Supabase
    const { data: existing, error: fetchError } = await supabase
      .from('birth_charts')
      .select('*')
      .eq('user_id', user_id)
      .eq('birth_date', birthDate)
      .eq('birth_time', birthTime)
      .eq('latitude', latitude)
      .eq('longitude', longitude)
      .eq('timezone', tzid)
      .maybeSingle();

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return res.status(500).json({ error: 'Database fetch error', details: fetchError.message });
    }

    if (existing) {
      return res.status(200).json({ chart: existing.chart_data, cached: true });
    }

    // 3. Calculate planetary positions using Swiss Ephemeris
    const birthData: BirthData = {
      date: birthDate,
      time: birthTime,
      lat: latitude,
      lon: longitude,
      tzid: tzid,
    };
    const positions: PlanetPosition[] = getPlanetPositions(birthData);
    const chartData = { positions, birthData };

    // 4. Insert new chart into Supabase
    const { error: insertError } = await supabase
      .from('birth_charts')
      .insert([
        {
          user_id,
          name,
          birth_date: birthDate,
          birth_time: birthTime,
          birth_location: location,
          latitude,
          longitude,
          gender,
          timezone: tzid,
          chart_data: chartData,
          is_public: false,
        },
      ]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ error: 'Database insert error', details: insertError.message });
    }

    res.status(200).json({ chart: chartData, cached: false });
  } catch (e) {
    console.error("API Error:", e);
    res.status(500).json({ error: `Server error: ${e.message}` });
  }
}
