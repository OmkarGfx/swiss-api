import React, { useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";

interface PlanetPosition {
  planet: string;
  longitude: number;
  retrograde: boolean;
}

export default function BirthChartGenerator() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [location, setLocation] = useState("");
  const [positions, setPositions] = useState<PlanetPosition[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [cached, setCached] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPositions(null);
    setCached(false);

    try {
      const res = await fetch("/api/birthChart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate, birthTime, location }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unknown error");
      } else {
        setPositions(data.positions);
        setCached(data.cached || false);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Birth Chart Generator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Birth Date:
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Birth Time:
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Generate Chart"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {positions && (
        <div>
          <h3>Planetary Positions {cached && "(from cache)"}</h3>
          <ul>
            {positions.map((pos) => (
              <li key={pos.planet}>
                {pos.planet}: {pos.longitude.toFixed(2)}° {pos.retrograde ? " (Retrograde)" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { birthDate, birthTime, location } = req.body;

  if (!birthDate || !birthTime || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Step 1: Just echo back the data for now
  res.status(200).json({
    positions: [],
    received: { birthDate, birthTime, location },
    cached: false,
  });
}
