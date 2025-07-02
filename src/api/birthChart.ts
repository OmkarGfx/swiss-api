import type { NextApiRequest, NextApiResponse } from 'next';
import { getPlanetaryPositions, geocodeLocation } from '../lib/astrology';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed, use POST' });
      return;
    }

    const { birthDate, birthTime, location } = req.body;

    if (!birthDate || !birthTime || !location) {
      res.status(400).json({ error: 'Missing birthDate, birthTime or location in request body' });
      return;
    }

    const dateTimeString = `${birthDate}T${birthTime}`;
    const birthDateTime = new Date(dateTimeString);
    if (isNaN(birthDateTime.getTime())) {
      res.status(400).json({ error: 'Invalid birthDate or birthTime format' });
      return;
    }

    // Check cache in Supabase
    const cacheKey = `${birthDateTime.toISOString()}_${location}`;
    const { data: cached, error: cacheError } = await supabase
      .from('birth_charts')
      .select('positions')
      .eq('cache_key', cacheKey)
      .single();

    if (cacheError && cacheError.code !== 'PGRST116') {
      console.error('Supabase cache query error:', cacheError);
    }

    if (cached) {
      // Return cached result
      res.status(200).json({ positions: cached.positions, cached: true });
      return;
    }

    // Geocode location to lat/lon
    const coords = await geocodeLocation(location);
    if (!coords) {
      res.status(400).json({ error: 'Could not geocode location' });
      return;
    }

    // Get planetary positions
    const positions = await getPlanetaryPositions(birthDateTime, coords.latitude, coords.longitude);

    // Store in cache
    const { error: insertError } = await supabase.from('birth_charts').insert({
      cache_key: cacheKey,
      birth_datetime: birthDateTime.toISOString(),
      location,
      positions,
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('Supabase cache insert error:', insertError);
    }

    res.status(200).json({ positions, cached: false });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Internal server error' });
  }
}
