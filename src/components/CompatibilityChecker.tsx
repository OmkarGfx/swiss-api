import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSupabaseQuery } from '../hooks/useSupabase'
import { toast } from 'sonner'

export function CompatibilityChecker() {
  const { user } = useAuth()
  const { data: charts } = useSupabaseQuery('birth_charts', (q) => 
    user ? q.eq('user_id', user.id) : q.limit(0)
  )
  
  const [selectedChart1, setSelectedChart1] = useState('')
  const [selectedChart2, setSelectedChart2] = useState('')
  const [compatibility, setCompatibility] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generateCompatibility = () => {
    if (!selectedChart1 || !selectedChart2) {
      toast.error('Please select two birth charts to compare')
      return
    }

    if (selectedChart1 === selectedChart2) {
      toast.error('Please select two different birth charts')
      return
    }

    setLoading(true)

    // Mock compatibility analysis
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60 // 60-100%
      const analysis = {
        score,
        emotional: Math.floor(Math.random() * 30) + 70,
        intellectual: Math.floor(Math.random() * 30) + 70,
        physical: Math.floor(Math.random() * 30) + 70,
        spiritual: Math.floor(Math.random() * 30) + 70,
        summary: `This is a ${score >= 85 ? 'highly compatible' : score >= 70 ? 'compatible' : 'moderately compatible'} match. Your charts show strong potential for a harmonious relationship with good communication and mutual understanding.`,
        strengths: [
          'Strong emotional connection',
          'Complementary personality traits',
          'Shared values and goals',
          'Good communication potential'
        ],
        challenges: [
          'Different approaches to conflict resolution',
          'Varying social needs',
          'Different life paces'
        ]
      }
      
      setCompatibility(analysis)
      setLoading(false)
    }, 2000)
  }

  if (!charts || charts.length < 2) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💕</div>
        <h3 className="text-xl font-semibold text-white mb-2">Need More Charts</h3>
        <p className="text-purple-200 mb-6">You need at least 2 birth charts to check compatibility</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Compatibility Analysis</h2>
        <p className="text-purple-200">Compare two birth charts for relationship insights</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white font-medium mb-2">First Person</label>
            <select
              value={selectedChart1}
              onChange={(e) => setSelectedChart1(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
            >
              <option value="">Select a chart...</option>
              {charts.map((chart) => (
                <option key={chart.id} value={chart.id}>
                  {chart.name} ({new Date(chart.birth_date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Second Person</label>
            <select
              value={selectedChart2}
              onChange={(e) => setSelectedChart2(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
            >
              <option value="">Select a chart...</option>
              {charts.map((chart) => (
                <option key={chart.id} value={chart.id}>
                  {chart.name} ({new Date(chart.birth_date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generateCompatibility}
          disabled={loading || !selectedChart1 || !selectedChart2}
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing Compatibility...</span>
            </div>
          ) : (
            'Analyze Compatibility'
          )}
        </button>

        {compatibility && (
          <div className="mt-6 space-y-4">
            <div className="text-center p-6 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-lg border border-pink-500/30">
              <div className="text-4xl font-bold text-white mb-2">{compatibility.score}%</div>
              <div className="text-pink-200">Overall Compatibility</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-white">{compatibility.emotional}%</div>
                <div className="text-purple-200 text-sm">Emotional</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-white">{compatibility.intellectual}%</div>
                <div className="text-purple-200 text-sm">Intellectual</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-white">{compatibility.physical}%</div>
                <div className="text-purple-200 text-sm">Physical</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-white">{compatibility.spiritual}%</div>
                <div className="text-purple-200 text-sm">Spiritual</div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="text-white font-medium mb-2">Summary</h4>
              <p className="text-purple-100">{compatibility.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-600/20 rounded-lg border border-green-500/30">
                <h4 className="text-white font-medium mb-2">Strengths</h4>
                <ul className="space-y-1">
                  {compatibility.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-green-200 text-sm">• {strength}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-orange-600/20 rounded-lg border border-orange-500/30">
                <h4 className="text-white font-medium mb-2">Areas to Work On</h4>
                <ul className="space-y-1">
                  {compatibility.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="text-orange-200 text-sm">• {challenge}</li>
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
