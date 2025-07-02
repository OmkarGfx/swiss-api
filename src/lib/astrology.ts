
import swisseph from "swisseph";
import tzlookup from "tz-lookup";
import NodeGeocoder from "node-geocoder";

/**
 * Planet constants from swisseph
 * 0=Sun, 1=Moon, 2=Mars, 3=Mercury, 4=Jupiter, 5=Venus, 6=Saturn, 7=Uranus, 8=Neptune, 9=Pluto
 */
const PLANETS = [
  swisseph.SE_SUN,
  swisseph.SE_MOON,
  swisseph.SE_MARS,
  swisseph.SE_MERCURY,
  swisseph.SE_JUPITER,
  swisseph.SE_VENUS,
  swisseph.SE_SATURN,
  swisseph.SE_URANUS,
  swisseph.SE_NEPTUNE,
  swisseph.SE_PLUTO,
];

// Initialize geocoder with OpenStreetMap provider (free)
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

/**
 * Convert date/time to Julian Day
 * @param date Date object in UTC
 * @returns Julian Day number
 */
function toJulianDay(date: Date): number {
  return swisseph.swe_julday(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600,
    swisseph.SE_GREG_CAL
  );
}

/**
 * Get timezone offset in hours for a given lat/lon and date
 * @param lat Latitude
 * @param lon Longitude
 * @param date Date object
 * @returns offset in hours (e.g. +5.5)
 */
function getTimezoneOffsetHours(lat: number, lon: number, date: Date): number {
  const tz = tzlookup(lat, lon);
  // Use Intl API to get offset in minutes
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "short",
  });
  const parts = dtf.formatToParts(date);
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value || "";
  // Create a date string with timezone and parse offset
  const localDate = new Date(date.toLocaleString("en-US", { timeZone: tz }));
  const offsetMinutes = (date.getTime() - localDate.getTime()) / 60000;
  return -offsetMinutes / 60;
}

/**
 * Main function to get planetary positions
 * @param birthDate Date of birth (local time)
 * @param latitude Latitude of birth location
 * @param longitude Longitude of birth location
 * @returns Array of planetary positions with longitude and retrograde flag
 */
export async function getPlanetaryPositions(
  birthDate: Date,
  latitude: number,
  longitude: number
): Promise<
  {
    planet: string;
    longitude: number;
    retrograde: boolean;
  }[]
> {
  // Adjust birthDate to UTC by subtracting timezone offset
  const tzOffset = getTimezoneOffsetHours(latitude, longitude, birthDate);
  const utcDate = new Date(birthDate.getTime() - tzOffset * 3600 * 1000);

  // Calculate Julian Day in UTC
  const jd = toJulianDay(utcDate);

  // Set ephemeris path to default (optional)
  swisseph.swe_set_ephe_path("");

  const results = [];

  for (const planet of PLANETS) {
    const flag = swisseph.SEFLG_SPEED; // to get speed for retrograde check
    const planetPos = await new Promise<{
      longitude: number;
      speed: number;

    }>((resolve, reject) => {
      swisseph.swe_calc_ut(jd, planet, flag, (tjd, ipl, iflag, xxr, serr) => {
        if (serr) reject(new Error(serr));
        else
          resolve({
            longitude: xxr.longitude,
            speed: xxr.longitudeSpeed,
          });
      });
    });

    results.push({
      planet: swisseph.swe_get_planet_name(planet).name,
      longitude: planetPos.longitude,
      retrograde: planetPos.speed < 0,
    });
  }

  return results;
}

/**
 * Helper function to geocode a location string to lat/lon
 * @param location Location string (e.g. "New York, NY")
 * @returns {latitude, longitude} or null if not found
 */
export async function geocodeLocation(
  location: string
): Promise<{ latitude: number; longitude: number } | null> {
  const res = await geocoder.geocode(location);
  if (res.length === 0) return null;
  return { latitude: res[0].latitude, longitude: res[0].longitude };
}
