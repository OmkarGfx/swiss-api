import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'sonner'

export function SubscriptionPanel() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'Forever',
      features: [
        'Basic birth chart generation',
        'Daily horoscope',
        'Limited AI chat (5 messages/day)',
        'Basic compatibility check',
        'Community access'
      ],
      limitations: [
        'No detailed reports',
        'Limited chart storage (3 charts)',
        'Basic remedies only'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      period: 'per month',
      features: [
        'Unlimited birth charts',
        'Detailed astrological reports',
        'Unlimited AI astrologer chat',
        'Advanced compatibility analysis',
        'Marriage timing predictions',
        'Success & career guidance',
        'Dosha analysis with remedies',
        'Priority customer support',
        'Exclusive webinars & content',
        'Personalized remedy suggestions'
      ],
      limitations: [],
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: 299.99,
      period: 'one-time',
      features: [
        'All Premium features',
        'Lifetime access',
        'Personal astrologer consultation (2 sessions/year)',
        'Custom gemstone recommendations',
        'Exclusive lifetime member benefits',
        'Early access to new features',
        'VIP customer support'
      ],
      limitations: [],
      popular: false
    }
  ]

  const handleSubscribe = (planId: string) => {
    if (!user) {
      toast.error('Please sign in to subscribe')
      return
    }

    setSelectedPlan(planId)
    
    // Mock subscription process
    setTimeout(() => {
      toast.success(`Successfully subscribed to ${plans.find(p => p.id === planId)?.name} plan!`)
      setSelectedPlan(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
        <p className="text-purple-200">Unlock the full power of cosmic insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative bg-white/5 rounded-lg border p-6 transition-all hover:bg-white/10 ${
              plan.popular 
                ? 'border-purple-500 ring-2 ring-purple-500/50' 
                : 'border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-purple-200 ml-2">/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-white font-medium">Features:</h4>
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start text-green-200 text-sm">
                  <span className="mr-2 mt-0.5">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
              
              {plan.limitations.length > 0 && (
                <>
                  <h4 className="text-white font-medium mt-4">Limitations:</h4>
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start text-red-300 text-sm">
                      <span className="mr-2 mt-0.5">✗</span>
                      <span>{limitation}</span>
                    </div>
                  ))}
                </>
              )}
            </div>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={selectedPlan === plan.id || plan.id === 'free'}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                plan.id === 'free'
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : selectedPlan === plan.id
                  ? 'bg-purple-400 text-white cursor-not-allowed'
                  : plan.popular
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {selectedPlan === plan.id ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : plan.id === 'free' ? (
                'Current Plan'
              ) : (
                `Subscribe to ${plan.name}`
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-500/30">
        <h3 className="text-white font-medium mb-3 flex items-center">
          <span className="mr-2">💳</span>
          Payment & Billing Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-200 text-sm">
          <div>
            <h4 className="font-medium mb-1">Secure Payments</h4>
            <p>All payments are processed securely through encrypted channels</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Cancel Anytime</h4>
            <p>No long-term commitments. Cancel your subscription anytime</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Money-Back Guarantee</h4>
            <p>30-day money-back guarantee if you're not satisfied</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Instant Access</h4>
            <p>Get immediate access to all premium features upon subscription</p>
          </div>
        </div>
      </div>
    </div>
  )
}
