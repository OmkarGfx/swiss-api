import { serve } from "std/server";
import { getPlanetaryPositions, geocodeLocation } from "../../../src/lib/astrology";

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed, use POST" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { birthDate, birthTime, location } = await req.json();

    if (!birthDate || !birthTime || !location) {
      return new Response(JSON.stringify({ error: "Missing birthDate, birthTime or location in request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const dateTimeString = `${birthDate}T${birthTime}`;
    const birthDateTime = new Date(dateTimeString);
    if (isNaN(birthDateTime.getTime())) {
      return new Response(JSON.stringify({ error: "Invalid birthDate or birthTime format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const coords = await geocodeLocation(location);
    if (!coords) {
      return new Response(JSON.stringify({ error: "Could not geocode location" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const positions = await getPlanetaryPositions(birthDateTime, coords.latitude, coords.longitude);

    return new Response(JSON.stringify({ positions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error instanceof Error ? error.message : "Internal server error") }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
