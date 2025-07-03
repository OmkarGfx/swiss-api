const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swisseph = require('swisseph');
const tzlookup = require('tz-lookup');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Set Swiss Ephemeris path to local ephe folder
swisseph.swe_set_ephe_path('./ephe');

// POST /api/birth-chart
app.post('/api/birth-chart', async (req, res) => {
  const { birthDate, birthTime, latitude, longitude } = req.body;
  if (!birthDate || !birthTime || typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // 1. Parse date/time and calculate Julian Day
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);
    // 2. Get timezone
    const tzid = tzlookup(latitude, longitude);
    // Calculate timezone offset in hours
    let tzOffsetHours = 0;
    try {
      const dateForOffset = new Date(Date.UTC(year, month - 1, day, hour, minute));
      const options = {
        timeZone: tzid,
        timeZoneName: 'shortOffset',
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(dateForOffset);
      const offsetPart = parts.find(p => p.type === 'timeZoneName');
      if (offsetPart && offsetPart.value) {
        const offsetMatch = offsetPart.value.match(/GMT([+-]\d+)(:\d+)?/);
        if (offsetMatch && offsetMatch[1]) {
          tzOffsetHours = parseInt(offsetMatch[1], 10);
          if (offsetMatch[2]) {
            tzOffsetHours += parseInt(offsetMatch[2].substring(1), 10) / 60;
          }
        }
      }
    } catch (e) {}
    // Julian Day for Universal Time (UT)
    const jd_local = swisseph.swe_julday(year, month, day, hour + minute / 60, swisseph.SE_GREG_CAL);
    const jd_ut = jd_local - (tzOffsetHours / 24);
    // 3. Calculate planetary positions
    const PLANETS = [
      { name: 'Sun', id: swisseph.SE_SUN },
      { name: 'Moon', id: swisseph.SE_MOON },
      { name: 'Mercury', id: swisseph.SE_MERCURY },
      { name: 'Venus', id: swisseph.SE_VENUS },
      { name: 'Mars', id: swisseph.SE_MARS },
      { name: 'Jupiter', id: swisseph.SE_JUPITER },
      { name: 'Saturn', id: swisseph.SE_SATURN },
      { name: 'Rahu', id: swisseph.SE_MEAN_NODE },
    ];
    const positions = PLANETS.map(({ name, id }) => {
      const flag = swisseph.SEFLG_SWIEPH | swisseph.SEFLG_SPEED;
      const result = swisseph.swe_calc_ut(jd_ut, id, flag);
      return {
        name,
        longitude: result.longitude,
        retrograde: result.longitudeSpeed < 0
      };
    });
    // 4. Ketu (South Node)
    const rahu = positions.find(p => p.name === 'Rahu');
    if (rahu) {
      let ketuLon = rahu.longitude + 180;
      if (ketuLon >= 360) ketuLon -= 360;
      positions.push({
        name: 'Ketu',
        longitude: ketuLon,
        retrograde: rahu.retrograde
      });
    }
    // 5. Return JSON response
    res.json({
      julianDay: jd_ut,
      timezone: tzid,
      positions
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Basic test route
app.get('/', (req, res) => {
  res.send('Swiss API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Swiss API server listening at http://localhost:${port}`);
});
