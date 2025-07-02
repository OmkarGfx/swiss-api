import { useState } from 'react'

export function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const products = [
    {
      id: 1,
      name: "Complete Birth Chart Analysis",
      description: "Detailed 50-page birth chart report with predictions and remedies",
      price: 99,
      category: "charts",
      image: "📊",
      features: ["Planetary positions", "Dasha periods", "Remedies", "Career guidance"]
    },
    {
      id: 2,
      name: "Ruby Gemstone (Certified)",
      description: "Natural ruby gemstone for Sun, enhances leadership and confidence",
      price: 299,
      category: "gemstones",
      image: "💎",
      features: ["Certified authentic", "Properly energized", "Custom sizing", "Wearing guide"]
    },
    {
      id: 3,
      name: "Tarot Card Reading",
      description: "Personal tarot reading session with experienced reader",
      price: 49,
      category: "tarot",
      image: "🔮",
      features: ["30-minute session", "Recorded reading", "Follow-up questions", "Guidance notes"]
    },
    {
      id: 4,
      name: "Vedic Astrology Guide",
      description: "Comprehensive book on Vedic astrology principles and practices",
      price: 29,
      category: "books",
      image: "📚",
      features: ["400+ pages", "Illustrated charts", "Practical examples", "Digital version"]
    },
    {
      id: 5,
      name: "Pearl Necklace (Energized)",
      description: "Natural pearl necklace for Moon, brings emotional balance",
      price: 199,
      category: "gemstones",
      image: "🤍",
      features: ["Natural pearls", "Vedic energization", "Silver setting", "Authenticity certificate"]
    },
    {
      id: 6,
      name: "Compatibility Report",
      description: "Detailed relationship compatibility analysis for couples",
      price: 79,
      category: "charts",
      image: "💕",
      features: ["Synastry analysis", "Compatibility score", "Relationship guidance", "Future predictions"]
    }
  ]

  const categories = [
    { id: 'all', label: 'All Products', icon: '🛍️' },
    { id: 'charts', label: 'Charts & Reports', icon: '📊' },
    { id: 'gemstones', label: 'Gemstones', icon: '💎' },
    { id: 'tarot', label: 'Tarot Reading', icon: '🔮' },
    { id: 'books', label: 'Books', icon: '📚' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Spiritual Products & Services</h2>
        <p className="text-purple-200">Enhance your spiritual journey with our curated collection</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden hover:bg-white/10 transition-colors">
            <div className="p-6">
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
              <p className="text-purple-200 text-sm mb-4">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-purple-300 text-xs">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">${product.price}</div>
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg p-6 border border-green-500/30">
        <h3 className="text-white font-medium mb-3 flex items-center">
          <span className="mr-2">🛡️</span>
          Our Guarantee
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-200 text-sm">
          <div>
            <h4 className="font-medium mb-1">Authentic Products</h4>
            <p>All gemstones are certified and reports are prepared by experienced astrologers</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Satisfaction Guarantee</h4>
            <p>30-day money-back guarantee if you're not completely satisfied</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Expert Support</h4>
            <p>Free consultation and guidance on product selection and usage</p>
          </div>
        </div>
      </div>
    </div>
  )
}
