import { useAuth } from "../hooks/useAuth";
import { useSupabaseQuery } from "../hooks/useSupabase";

export function ChartViewer() {
  const { user } = useAuth();
  const { data: charts, loading, error } = useSupabaseQuery('birth_charts', (q) => 
    user ? q.eq('user_id', user.id).order('created_at', { ascending: false }) : q.limit(0)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error loading charts: {error}</p>
      </div>
    );
  }

  if (!charts || charts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Birth Charts Yet</h3>
        <p className="text-purple-200 mb-6">Generate your first birth chart to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Your Birth Charts</h2>
        <p className="text-purple-200">View and analyze your generated birth charts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charts.map((chart) => (
          <div key={chart.id} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{chart.name}</h3>
              <span className="text-purple-400 text-sm">
                {new Date(chart.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-200">Birth Date:</span>
                <span className="text-white">{chart.birth_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Birth Time:</span>
                <span className="text-white">{chart.birth_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Location:</span>
                <span className="text-white">{chart.birth_location}</span>
              </div>
              {chart.gender && (
                <div className="flex justify-between">
                  <span className="text-purple-200">Gender:</span>
                  <span className="text-white capitalize">{chart.gender}</span>
                </div>
              )}
            </div>

            {chart.chart_data && typeof chart.chart_data === 'object' && (chart.chart_data as any).birthSummary && (
              <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-medium mb-2">Birth Summary</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-purple-200">Ascendant:</span>
                    <span className="text-white">{(chart.chart_data as any).birthSummary.ascendantSign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Moon Sign:</span>
                    <span className="text-white">{(chart.chart_data as any).birthSummary.moonSign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Sun Sign:</span>
                    <span className="text-white">{(chart.chart_data as any).birthSummary.sunSign}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">Nakshatra:</span>
                    <span className="text-white">{(chart.chart_data as any).birthSummary.nakshatra}</span>
                  </div>
                </div>
              </div>
            )}

            <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
              View Full Chart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
