import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSupabaseQuery } from '../hooks/useSupabase'
import { toast } from 'sonner'

export function MarriageTimingPredictor() {
  const { user } = useAuth()
  const { data: charts } = useSupabaseQuery('birth_charts', (q) => 
    user ? q.eq('user_id', user.id) : q.limit(0)
  )
  
  const [selectedChart, setSelectedChart] = useState('')
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generatePrediction = () => {
    if (!selectedChart) {
      toast.error('Please select a birth chart')
      return
    }

    setLoading(true)

    // Mock marriage timing prediction
    setTimeout(() => {
      const marriagePrediction = {
        favorablePeriods: [
          "2024-2025: Highly favorable period with Jupiter's blessing",
          "2027-2028: Strong planetary support for marriage",
          "2030-2031: Excellent time for long-term commitments"
        ],
        partnerTraits: [
          "Likely to be from a different cultural background",
          "Strong communication skills and intellectual compatibility",
          "Career-oriented and ambitious personality",
          "Family-oriented with traditional values",
          "Artistic or creative inclinations"
        ],
        compatibility: [
          "Best matches: Fire and Air signs",
          "Avoid: Overly possessive or controlling partners",
          "Look for: Emotional maturity and stability",
          "Important: Shared life goals and values",
          "Key factor: Mutual respect and understanding"
        ],
        recommendations: [
          "Focus on personal growth before committing",
          "Be open to arranged introductions",
          "Trust your intuition in partner selection",
          "Consider compatibility beyond physical attraction",
          "Seek family blessings for lasting happiness"
        ]
      }
      
      setPrediction(marriagePrediction)
      setLoading(false)
    }, 2000)
  }

  if (!charts || charts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💒</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Birth Charts Available</h3>
        <p className="text-purple-200 mb-6">Generate a birth chart first to get marriage timing predictions</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Marriage Timing Predictor</h2>
        <p className="text-purple-200">Discover when the stars align for your perfect union</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Select Birth Chart</label>
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
          >
            <option value="">Choose a chart for marriage analysis...</option>
            {charts.map((chart) => (
              <option key={chart.id} value={chart.id}>
                {chart.name} ({new Date(chart.birth_date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generatePrediction}
          disabled={loading || !selectedChart}
          className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Predicting Marriage Timing...</span>
            </div>
          ) : (
            'Predict Marriage Timing'
          )}
        </button>

        {prediction && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-to-r from-pink-600/20 to-red-600/20 rounded-lg border border-pink-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">⏰</span>
                  Favorable Marriage Periods
                </h4>
                <ul className="space-y-2">
                  {prediction.favorablePeriods.map((period: string, index: number) => (
                    <li key={index} className="text-pink-200 text-sm">• {period}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg border border-purple-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">👤</span>
                  Ideal Partner Traits
                </h4>
                <ul className="space-y-2">
                  {prediction.partnerTraits.map((trait: string, index: number) => (
                    <li key={index} className="text-purple-200 text-sm">• {trait}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg border border-green-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">💕</span>
                  Compatibility Insights
                </h4>
                <ul className="space-y-2">
                  {prediction.compatibility.map((insight: string, index: number) => (
                    <li key={index} className="text-green-200 text-sm">• {insight}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">💡</span>
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {prediction.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="text-yellow-200 text-sm">• {recommendation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
