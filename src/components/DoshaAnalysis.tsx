import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSupabaseQuery } from '../hooks/useSupabase'
import { toast } from 'sonner'

export function DoshaAnalysis() {
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

    // Mock dosha analysis
    setTimeout(() => {
      const doshaAnalysis = {
        mangalDosha: {
          present: Math.random() > 0.7,
          severity: ['Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
          remedies: [
            "Worship Lord Hanuman on Tuesdays",
            "Chant Hanuman Chalisa daily",
            "Donate red lentils and jaggery",
            "Wear red coral gemstone",
            "Perform Mangal Shanti Puja"
          ]
        },
        kalSarpaDosha: {
          present: Math.random() > 0.8,
          type: ['Anant Kaal Sarp', 'Kulik Kaal Sarp', 'Vasuki Kaal Sarp'][Math.floor(Math.random() * 3)],
          remedies: [
            "Visit Trimbakeshwar Temple",
            "Chant Maha Mrityunjaya Mantra",
            "Perform Rudrabhishek",
            "Donate silver items",
            "Worship Lord Shiva regularly"
          ]
        },
        pitruDosha: {
          present: Math.random() > 0.6,
          remedies: [
            "Perform Shraddh rituals regularly",
            "Feed Brahmins and poor people",
            "Donate to charitable causes",
            "Plant trees in memory of ancestors",
            "Chant Gayatri Mantra daily"
          ]
        }
      }
      
      setAnalysis(doshaAnalysis)
      setLoading(false)
    }, 2000)
  }

  if (!charts || charts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Birth Charts Available</h3>
        <p className="text-purple-200 mb-6">Generate a birth chart first to analyze doshas</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Dosha Analysis</h2>
        <p className="text-purple-200">Identify planetary doshas and their remedies</p>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Select Birth Chart</label>
          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all"
          >
            <option value="">Choose a chart for dosha analysis...</option>
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
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing Doshas...</span>
            </div>
          ) : (
            'Analyze Doshas'
          )}
        </button>

        {analysis && (
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              {/* Mangal Dosha */}
              <div className={`p-4 rounded-lg border ${
                analysis.mangalDosha.present 
                  ? 'bg-red-600/20 border-red-500/30' 
                  : 'bg-green-600/20 border-green-500/30'
              }`}>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">🔴</span>
                  Mangal Dosha (Mars Dosha)
                </h4>
                {analysis.mangalDosha.present ? (
                  <div>
                    <p className="text-red-200 mb-2">
                      Present - Severity: {analysis.mangalDosha.severity}
                    </p>
                    <div>
                      <h5 className="text-white font-medium mb-2">Remedies:</h5>
                      <ul className="space-y-1">
                        {analysis.mangalDosha.remedies.map((remedy: string, index: number) => (
                          <li key={index} className="text-red-200 text-sm">• {remedy}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-green-200">Not present in your chart</p>
                )}
              </div>

              {/* Kaal Sarpa Dosha */}
              <div className={`p-4 rounded-lg border ${
                analysis.kalSarpaDosha.present 
                  ? 'bg-purple-600/20 border-purple-500/30' 
                  : 'bg-green-600/20 border-green-500/30'
              }`}>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">🐍</span>
                  Kaal Sarpa Dosha
                </h4>
                {analysis.kalSarpaDosha.present ? (
                  <div>
                    <p className="text-purple-200 mb-2">
                      Present - Type: {analysis.kalSarpaDosha.type}
                    </p>
                    <div>
                      <h5 className="text-white font-medium mb-2">Remedies:</h5>
                      <ul className="space-y-1">
                        {analysis.kalSarpaDosha.remedies.map((remedy: string, index: number) => (
                          <li key={index} className="text-purple-200 text-sm">• {remedy}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-green-200">Not present in your chart</p>
                )}
              </div>

              {/* Pitru Dosha */}
              <div className={`p-4 rounded-lg border ${
                analysis.pitruDosha.present 
                  ? 'bg-yellow-600/20 border-yellow-500/30' 
                  : 'bg-green-600/20 border-green-500/30'
              }`}>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">👴</span>
                  Pitru Dosha (Ancestral Dosha)
                </h4>
                {analysis.pitruDosha.present ? (
                  <div>
                    <p className="text-yellow-200 mb-2">Present in your chart</p>
                    <div>
                      <h5 className="text-white font-medium mb-2">Remedies:</h5>
                      <ul className="space-y-1">
                        {analysis.pitruDosha.remedies.map((remedy: string, index: number) => (
                          <li key={index} className="text-yellow-200 text-sm">• {remedy}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-green-200">Not present in your chart</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
              <h4 className="text-white font-medium mb-2">Important Note</h4>
              <p className="text-blue-200 text-sm">
                Dosha analysis should be confirmed by a qualified astrologer. These remedies are general suggestions 
                and may vary based on individual chart specifics. Consult with an experienced astrologer for 
                personalized guidance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
