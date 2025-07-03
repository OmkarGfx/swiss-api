import swe from 'swisseph'
import NodeGeocoder from 'node-geocoder'
import tzlookup from 'tz-lookup'

// Set path to Swiss Ephemeris data files
swe.swe_set_ephe_path('./ephe')

// Input birth details
const birthDetails = {
  date: '1995-04-12',
  time: '10:30',
  location: 'Belgaum, India'
}

async function run() {
  try {
    const geocoder = NodeGeocoder({ provider: 'openstreetmap' })
    const [geo] = await geocoder.geocode(birthDetails.location)

    if (!geo) throw new Error('Geocoding failed.')

    const timezone = tzlookup(geo.latitude, geo.longitude)

    const [year, month, day] = birthDetails.date.split('-').map(Number)
    const [hour, minute] = birthDetails.time.split(':').map(Number)
    const decimalTime = hour + minute / 60

    const julianDay = swe.swe_julday(year, month, day, decimalTime, swe.SE_GREG_CAL)

    const planets = [
      { name: 'Sun', id: swe.SE_SUN },
      { name: 'Moon', id: swe.SE_MOON },
      { name: 'Mercury', id: swe.SE_MERCURY },
      { name: 'Venus', id: swe.SE_VENUS },
      { name: 'Mars', id: swe.SE_MARS },
      { name: 'Jupiter', id: swe.SE_JUPITER },
      { name: 'Saturn', id: swe.SE_SATURN },
      { name: 'Rahu (Mean Node)', id: swe.SE_MEAN_NODE },
      { name: 'Ketu (True Node)', id: swe.SE_TRUE_NODE }
    ]

    console.log(`\n🌍 Location: ${birthDetails.location}`)
    console.log(`🕐 Timezone: ${timezone}`)
    console.log(`📅 Julian Day: ${julianDay.toFixed(4)}\n`)

    for (const planet of planets) {
      const result = await new Promise((resolve, reject) => {
        swe.swe_calc_ut(julianDay, planet.id, swe.SEFLG_SWIEPH, (result) => {
          if ('error' in result && result.error) {
            reject(new Error(result.error))
          } else {
            resolve(result)
          }
        })
      })

      const longitude = (result as any).longitude ?? (result as any).lon ?? 0
      const retrograde = (result as any).rflag === 1
      console.log(`${planet.name}: ${longitude.toFixed(2)}° ${retrograde ? 'R' : ''}`)
    }
  } catch (err) {
    console.error('❌ Error:', err)
  }
}

run()
