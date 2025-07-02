import { useState } from 'react'

export function RemediesSection() {
  const [selectedCategory, setSelectedCategory] = useState('general')

  const remedies = {
    general: [
      {
        title: "Daily Meditation",
        description: "Practice 15-20 minutes of meditation daily to align with cosmic energies",
        icon: "🧘‍♀️"
      },
      {
        title: "Gratitude Practice",
        description: "Express gratitude to the universe for blessings received",
        icon: "🙏"
      },
      {
        title: "Charity & Donation",
        description: "Regular charitable acts improve karmic balance",
        icon: "💝"
      }
    ],
    planetary: [
      {
        title: "Sun Remedies",
        description: "Offer water to Sun at sunrise, wear ruby gemstone, chant Surya mantras",
        icon: "☀️"
      },
      {
        title: "Moon Remedies",
        description: "Wear pearl, drink water from silver vessel, worship Lord Shiva",
        icon: "🌙"
      },
      {
        title: "Mars Remedies",
        description: "Worship Hanuman, wear red coral, donate red items on Tuesdays",
        icon: "🔴"
      },
      {
        title: "Mercury Remedies",
        description: "Wear emerald, feed green vegetables to cows, chant Vishnu mantras",
        icon: "💚"
      }
    ],
    gemstones: [
      {
        title: "Ruby (Manik)",
        description: "For Sun - Enhances leadership, confidence, and vitality",
        icon: "💎"
      },
      {
        title: "Pearl (Moti)",
        description: "For Moon - Brings emotional balance and mental peace",
        icon: "🤍"
      },
      {
        title: "Red Coral (Moonga)",
        description: "For Mars - Increases courage, energy, and removes obstacles",
        icon: "🔴"
      },
      {
        title: "Emerald (Panna)",
        description: "For Mercury - Improves communication and intellectual abilities",
        icon: "💚"
      }
    ],
    mantras: [
      {
        title: "Gayatri Mantra",
        description: "Universal mantra for spiritual growth and divine protection",
        icon: "🕉️"
      },
      {
        title: "Maha Mrityunjaya Mantra",
        description: "For health, longevity, and protection from negative energies",
        icon: "🛡️"
      },
      {
        title: "Hanuman Chalisa",
        description: "For courage, strength, and removal of obstacles",
        icon: "🐒"
      },
      {
        title: "Vishnu Sahasranama",
        description: "For peace, prosperity, and spiritual advancement",
        icon: "🌸"
      }
    ]
  }

  const categories = [
    { id: 'general', label: 'General Remedies', icon: '✨' },
    { id: 'planetary', label: 'Planetary Remedies', icon: '🪐' },
    { id: 'gemstones', label: 'Gemstones', icon: '💎' },
    { id: 'mantras', label: 'Mantras', icon: '🕉️' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Astrological Remedies</h2>
        <p className="text-purple-200">Harmonize your life with cosmic remedies and practices</p>
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
        {remedies[selectedCategory as keyof typeof remedies].map((remedy, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="text-4xl mb-4 text-center">{remedy.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3 text-center">{remedy.title}</h3>
            <p className="text-purple-200 text-sm text-center leading-relaxed">{remedy.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg p-6 border border-orange-500/30">
        <h3 className="text-white font-medium mb-3 flex items-center">
          <span className="mr-2">⚠️</span>
          Important Guidelines
        </h3>
        <div className="space-y-2 text-orange-200 text-sm">
          <p>• Consult with a qualified astrologer before implementing major remedies</p>
          <p>• Gemstones should be properly energized and worn as per astrological guidance</p>
          <p>• Mantras should be chanted with proper pronunciation and devotion</p>
          <p>• Consistency and faith are key to the effectiveness of remedies</p>
          <p>• Combine remedies with positive actions and ethical living</p>
        </div>
      </div>
    </div>
  )
}
