import type { NextApiRequest, NextApiResponse } from "next";
import { geocodeAndGetTimezone, getPlanetPositions, BirthData, PlanetPosition } from '../../src/lib/astrology'; // Import the new functions and types

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { birthDate, birthTime, location } = req.body;

  if (!birthDate || !birthTime || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Geocode the location and get timezone
    const geoData = await geocodeAndGetTimezone(location);

    if (!geoData) {
      return res.status(404).json({ error: `Could not find location or determine timezone for: ${location}` });
    }

    const { latitude, longitude, tzid } = geoData;

    // Prepare data for astrology calculation
    const birthData: BirthData = {
      date: birthDate,
      time: birthTime,
      lat: latitude,
      lon: longitude,
      tzid: tzid,
    };

    // 2. Calculate planetary positions using Swiss Ephemeris
    const positions: PlanetPosition[] = getPlanetPositions(birthData);

    // 3. (Optional) Cache/store results in Supabase - This part is not implemented yet.
    // You would add Supabase logic here to check for existing chart or insert new one.

    res.status(200).json({
      positions: positions,
      received: birthData, // Echo back processed data for verification
      cached: false, // Set to true if fetched from cache later
    });

  } catch (e) {
    console.error("API Error:", e);
    res.status(500).json({ error: `Server error: ${e.message}` });
  }
}
