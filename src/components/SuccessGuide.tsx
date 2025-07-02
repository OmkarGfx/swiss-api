import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSupabaseQuery } from '../hooks/useSupabase'
import { toast } from 'sonner'

export function SuccessGuide() {
  const { user } = useAuth()
  const { data: charts } = useSupabaseQuery('birth_charts', (q) => 
    user ? q.eq('user_id', user.id) : q.limit(0)
  )
  
  const [selectedChart, setSelectedChart] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generateAnalysis = () => {
    if (!selectedChart) {
      toast.error('Please select a birth chart')
      return
    }

    setLoading(true)

    // Mock success analysis
    setTimeout(() => {
      const successAnalysis = {
        careerPredictions: [
          "Strong leadership potential in technology or innovation sectors",
          "Natural ability to inspire and motivate teams",
          "Excellent communication skills will open doors",
          "Best success period: Ages 32-45",
          "Consider entrepreneurship or consulting roles"
        ],
        financialInsights: [
          "Multiple income streams will bring stability",
          "Investment in real estate shows positive returns",
          "Avoid impulsive financial decisions during Mercury retrograde",
          "Partnership ventures are highly favored",
          "Peak earning potential in your 40s"
        ],
        personalityTraits: [
          "Natural born leader with charismatic presence",
          "Highly intuitive and emotionally intelligent",
          "Creative problem-solver with innovative thinking",
          "Strong sense of justice and fairness",
          "Excellent at building lasting relationships"
        ],
        recommendations: [
          "Focus on developing your public speaking skills",
          "Network within your industry consistently",
          "Trust your intuition in major decisions",
          "Maintain work-life balance for sustained success",
          "Consider mentoring others to expand your influence"
        ]
      }
      
      setAnalysis(successAnalysis)
      setLoading(false)
    }, 2000)
  }

  if (!charts || charts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Birth Charts Available</h3>
        <p className="text-purple-200 mb-6">Generate a birth chart first to get your success analysis</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Success Guide</h2>
        <p className="text-purple-200">Unlock your potential with astrological career insights</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Select Birth Chart</label>
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
          >
            <option value="">Choose a chart for analysis...</option>
            {charts.map((chart) => (
              <option key={chart.id} value={chart.id}>
                {chart.name} ({new Date(chart.birth_date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generateAnalysis}
          disabled={loading || !selectedChart}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing Success Potential...</span>
            </div>
          ) : (
            'Generate Success Analysis'
          )}
        </button>

        {analysis && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">💼</span>
                  Career Predictions
                </h4>
                <ul className="space-y-2">
                  {analysis.careerPredictions.map((prediction: string, index: number) => (
                    <li key={index} className="text-green-200 text-sm">• {prediction}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">💰</span>
                  Financial Insights
                </h4>
                <ul className="space-y-2">
                  {analysis.financialInsights.map((insight: string, index: number) => (
                    <li key={index} className="text-yellow-200 text-sm">• {insight}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">✨</span>
                  Personality Strengths
                </h4>
                <ul className="space-y-2">
                  {analysis.personalityTraits.map((trait: string, index: number) => (
                    <li key={index} className="text-purple-200 text-sm">• {trait}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg border border-blue-500/30">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Success Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="text-blue-200 text-sm">• {recommendation}</li>
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
