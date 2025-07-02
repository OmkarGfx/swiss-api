import { useState } from 'react'
import { toast } from 'sonner'

export function HoroscopeSection() {
  const [selectedSign, setSelectedSign] = useState('Aries')
  const [selectedType, setSelectedType] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [horoscope, setHoroscope] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ]

  const generateHoroscope = () => {
    setLoading(true)
    
    // Mock horoscope generation
    setTimeout(() => {
      const predictions = [
        "Today brings new opportunities for growth and self-discovery.",
        "Your intuition is particularly strong right now - trust your instincts.",
        "A chance encounter may lead to meaningful connections.",
        "Focus on balance in all aspects of your life.",
        "Your creativity is flowing - express yourself freely.",
        "Financial matters require careful attention today.",
        "Relationships take center stage in your cosmic forecast.",
        "Your leadership qualities shine brightly.",
        "Adventure and learning await you.",
        "Trust in the process of transformation.",
      ]

      const advice = [
        "Embrace change with an open heart.",
        "Practice gratitude for life's blessings.",
        "Listen to your inner wisdom.",
        "Take time for self-care and reflection.",
        "Communicate openly with loved ones.",
        "Stay grounded while reaching for your dreams.",
        "Be patient with yourself and others.",
        "Focus on what truly matters to you.",
        "Trust in divine timing.",
        "Celebrate your unique gifts.",
      ]

      const prediction = predictions[Math.floor(Math.random() * predictions.length)]
      const guidance = advice[Math.floor(Math.random() * advice.length)]
      
      setHoroscope(`${prediction} ${guidance} The stars align favorably for ${selectedSign} during this ${selectedType} period.`)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Your Horoscope</h2>
        <p className="text-purple-200">Get personalized astrological insights</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white font-medium mb-2">Zodiac Sign</label>
            <select
              value={selectedSign}
              onChange={(e) => setSelectedSign(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
            >
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>{sign}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Time Period</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateHoroscope}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating Horoscope...</span>
            </div>
          ) : (
            `Get ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Horoscope`
          )}
        </button>

        {horoscope && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg border border-purple-500/30">
            <h3 className="text-white font-medium mb-2">
              {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Horoscope for {selectedSign}
            </h3>
            <p className="text-purple-100 leading-relaxed">{horoscope}</p>
          </div>
        )}
      </div>
    </div>
  )
}
