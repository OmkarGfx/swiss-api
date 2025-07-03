import tzlookup from "tz-lookup";

/**
 * Planet constants from swisseph
 * 0=Sun, 1=Moon, 2=Mars, 3=Mercury, 4=Jupiter, 5=Venus, 6=Saturn, 7=Uranus, 8=Neptune, 9=Pluto
 */

export interface BirthData {
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:mm'
  lat: number;
  lon: number;
  tzid?: string; // Timezone identifier (e.g., 'America/New_York')
}

export interface PlanetPosition {
  name: string;
  longitude: number;
  retrograde: boolean;
}

/**
 * Helper function to geocode a location string to lat/lon and timezone using PositionStack API
 * @param location Location string (e.g. "New York, NY")
 * @returns {latitude, longitude, tzid} or null if not found or error
 */
export async function geocodeAndGetTimezone(
  location: string
): Promise<{ latitude: number; longitude: number; tzid: string } | null> {
  try {
    const access_key = '4517eb9e903079c566ee70bd4305f3f2';
    const url = `https://api.positionstack.com/v1/forward?access_key=${access_key}&query=${encodeURIComponent(location)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch geocoding data');
    const data = await response.json();
    if (!data.data || !data.data.length) {
      console.warn("Geocoding failed for location:", location);
      return null;
    }
    const { latitude, longitude } = data.data[0];
    if (latitude === undefined || longitude === undefined) {
      console.warn("Geocoding result missing lat/lon for location:", location);
      return null;
    }
    const tzid = tzlookup(latitude, longitude);
    return { latitude, longitude, tzid };
  } catch (error) {
    console.error("Geocoding or Timezone lookup error:", error);
    return null;
  }
}

// Placeholder: In Vercel, this should call an external Swiss API (e.g., Railway)
export async function getPlanetPositions(birth: BirthData): Promise<PlanetPosition[]> {
  // TODO: Implement fetch to external Swiss Ephemeris API
  throw new Error('Swiss Ephemeris calculation is not available in this environment.');
}
