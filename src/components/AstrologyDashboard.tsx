import { useState } from 'react'
import { BirthChartGenerator } from './BirthChartGenerator'
import { ChartViewer } from './ChartViewer'
import { HoroscopeSection } from './HoroscopeSection'
import { CompatibilityChecker } from './CompatibilityChecker'
import { AstrologyChatbot } from './AstrologyChatbot'
import { SuccessGuide } from './SuccessGuide'
import { MarriageTimingPredictor } from './MarriageTimingPredictor'
import { DoshaAnalysis } from './DoshaAnalysis'
import { RemediesSection } from './RemediesSection'
import { ProductShowcase } from './ProductShowcase'
import { SubscriptionPanel } from './SubscriptionPanel'

type ActiveTab = 'dashboard' | 'chart' | 'charts' | 'horoscope' | 'compatibility' | 'chat' | 'success' | 'marriage' | 'dosha' | 'remedies' | 'products' | 'subscription'

export function AstrologyDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'chart', label: 'Generate Chart', icon: '⭐' },
    { id: 'charts', label: 'My Charts', icon: '📊' },
    { id: 'horoscope', label: 'Horoscope', icon: '🌙' },
    { id: 'compatibility', label: 'Compatibility', icon: '💕' },
    { id: 'chat', label: 'AI Astrologer', icon: '🤖' },
    { id: 'success', label: 'Success Guide', icon: '🎯' },
    { id: 'marriage', label: 'Marriage Timing', icon: '💒' },
    { id: 'dosha', label: 'Dosha Analysis', icon: '🔍' },
    { id: 'remedies', label: 'Remedies', icon: '🕉️' },
    { id: 'products', label: 'Products', icon: '🛍️' },
    { id: 'subscription', label: 'Premium', icon: '👑' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome to AstroMystic</h1>
              <p className="text-purple-200 text-lg">Discover your cosmic journey through the stars</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabs.slice(1).map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="text-3xl mb-3">{tab.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{tab.label}</h3>
                  <p className="text-purple-200 text-sm">
                    {tab.id === 'chart' && 'Generate your personalized birth chart'}
                    {tab.id === 'charts' && 'View your saved birth charts'}
                    {tab.id === 'horoscope' && 'Daily, weekly, and monthly predictions'}
                    {tab.id === 'compatibility' && 'Check relationship compatibility'}
                    {tab.id === 'chat' && 'Chat with our AI astrologer'}
                    {tab.id === 'success' && 'Unlock your success potential'}
                    {tab.id === 'marriage' && 'Predict marriage timing'}
                    {tab.id === 'dosha' && 'Analyze planetary doshas'}
                    {tab.id === 'remedies' && 'Personalized astrological remedies'}
                    {tab.id === 'products' && 'Spiritual products and services'}
                    {tab.id === 'subscription' && 'Upgrade to premium features'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'chart':
        return <BirthChartGenerator />
      case 'charts':
        return <ChartViewer />
      case 'horoscope':
        return <HoroscopeSection />
      case 'compatibility':
        return <CompatibilityChecker />
      case 'chat':
        return <AstrologyChatbot />
      case 'success':
        return <SuccessGuide />
      case 'marriage':
        return <MarriageTimingPredictor />
      case 'dosha':
        return <DoshaAnalysis />
      case 'remedies':
        return <RemediesSection />
      case 'products':
        return <ProductShowcase />
      case 'subscription':
        return <SubscriptionPanel />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-200 hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4">
        {renderContent()}
      </div>
    </div>
  )
}
