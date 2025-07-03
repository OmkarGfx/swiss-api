import swe from "swisseph";
import tzlookup from "tz-lookup";

/**
 * Planet constants from swisseph
 * 0=Sun, 1=Moon, 2=Mars, 3=Mercury, 4=Jupiter, 5=Venus, 6=Saturn, 7=Uranus, 8=Neptune, 9=Pluto
 */

// Set path to ephemeris files (adjust if your 'ephe' folder is elsewhere)
// This needs to be accessible from where your Node.js server runs.
// For Vercel/serverless, you might need to bundle these files or use a different approach.
// For local development, ensure the './ephe' folder exists relative to your build output.
swe.swe_set_ephe_path('./ephe');

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

export interface SWECalcResult {
  longitude: number;
  longitudeSpeed: number;
  // Add other properties if needed
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

/**
 * Calculates planetary positions using Swiss Ephemeris.
 * @param birth Birth data including date, time, lat, lon, and tzid.
 * @returns Array of planetary positions.
 */
export function getPlanetPositions(birth: BirthData): PlanetPosition[] {
  // Parse date/time
  const [year, month, day] = birth.date.split('-').map(Number);
  const [hour, minute] = birth.time.split(':').map(Number);

  // Calculate timezone offset in hours for the specific date/time/location
  let tzOffsetHours = 0;
  if (birth.tzid) {
      try {
          // Use Intl.DateTimeFormat to get the offset for the target timezone at the specific date/time
          // This is a more reliable way than relying on the system's local timezone offset.
          const dateForOffset = new Date(Date.UTC(year, month - 1, day, hour, minute)); // Create a UTC date object for the moment
          const options: Intl.DateTimeFormatOptions = {
              timeZone: birth.tzid,
              timeZoneName: 'shortOffset', // e.g., "GMT-5", "UTC+1:00"
              year: 'numeric', month: 'numeric', day: 'numeric',
              hour: 'numeric', minute: 'numeric', second: 'numeric'
          };
          const formatter = new Intl.DateTimeFormat('en-US', options);
          const parts = formatter.formatToParts(dateForOffset);
          const offsetPart = parts.find(p => p.type === 'timeZoneName');

          if (offsetPart && offsetPart.value) {
              // Parse offset string like "GMT-5" or "UTC+1:00"
              const offsetMatch = offsetPart.value.match(/GMT([+-]\d+)(:\d+)?/);
              if (offsetMatch && offsetMatch[1]) {
                  tzOffsetHours = parseInt(offsetMatch[1], 10);
                  if (offsetMatch[2]) {
                      tzOffsetHours += parseInt(offsetMatch[2].substring(1), 10) / 60;
                  }
              } else {
                   console.warn("Could not parse timezone offset string:", offsetPart.value);
                   // Fallback to 0 or handle error
              }
          } else {
              console.warn("Could not get timezone offset part from formatter for TZID:", birth.tzid);
              // Fallback to 0 or handle error
          }

      } catch (e) {
          console.error("Error calculating timezone offset:", e);
          // Assume UTC if timezone calculation fails
      }
  }

  // Calculate Julian Day for Universal Time (UT)
  // Calculate JD for the local time, then subtract the offset in days.
  // swe_julday expects 1-based month.
  const jd_local = swe.swe_julday(year, month, day, hour + minute / 60, swe.SE_GREG_CAL);

  const jd_ut = jd_local - (tzOffsetHours / 24);

  // Planets to calculate (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Rahu)
  const PLANETS_TO_CALC = [
    { name: 'Sun', id: swe.SE_SUN },
    { name: 'Moon', id: swe.SE_MOON },
    { name: 'Mercury', id: swe.SE_MERCURY },
    { name: 'Venus', id: swe.SE_VENUS },
    { name: 'Mars', id: swe.SE_MARS },
    { name: 'Jupiter', id: swe.SE_JUPITER },
    { name: 'Saturn', id: swe.SE_SATURN },
    { name: 'Uranus', id: swe.SE_URANUS },
    { name: 'Neptune', id: swe.SE_NEPTUNE },
    { name: 'Pluto', id: swe.SE_PLUTO },
    { name: 'Rahu', id: swe.SE_MEAN_NODE }, // Mean North Node
  ];

   const positions: PlanetPosition[] = [];

   PLANETS_TO_CALC.forEach(({ name, id }) => {
       // Use SEFLG_SPEED to get speed for retrograde check
       const flag = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED;
       // swe_calc_ut returns an object with properties when using the Node.js wrapper
       const result = swe.swe_calc_ut(jd_ut, id, flag) as SWECalcResult;

       // The swisseph npm types indicate the result has named properties like longitude, longitudeSpeed
       // Check if result is valid and has expected properties
       if (typeof result !== 'object' || result === null || typeof result.longitude !== 'number' || typeof result.longitudeSpeed !== 'number') {
            console.error(`Invalid result or missing properties for ${name}:`, result);
            // Optionally skip this planet or add an error placeholder
            return;
       }

       positions.push({
           name,
           longitude: result.longitude, // Access longitude by name
           retrograde: result.longitudeSpeed < 0 // Retrograde if speed in longitude is negative
       });
   });

   // Calculate Ketu (South Node) 180 degrees opposite Rahu
   const rahuPos = positions.find(p => p.name === 'Rahu');
   if (rahuPos) {
       let ketuLon = rahuPos.longitude + 180;
       if (ketuLon >= 360) ketuLon -= 360;
       positions.push({
           name: 'Ketu',
           longitude: ketuLon,
           retrograde: rahuPos.retrograde // Nodes are always retrograde together
       });
   }

  return positions;
}
