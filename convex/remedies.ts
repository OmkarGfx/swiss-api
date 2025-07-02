import { query } from "./_generated/server";
import { v } from "convex/values";

export const getRemedies = query({
  args: {
    category: v.optional(v.union(
      v.literal("mantras"),
      v.literal("gemstones"),
      v.literal("rituals"),
      v.literal("charity"),
      v.literal("lifestyle"),
      v.literal("fasting")
    )),
    planet: v.optional(v.union(
      v.literal("sun"),
      v.literal("moon"),
      v.literal("mars"),
      v.literal("mercury"),
      v.literal("jupiter"),
      v.literal("venus"),
      v.literal("saturn"),
      v.literal("rahu"),
      v.literal("ketu")
    )),
  },
  handler: async (ctx, args) => {
    // Return comprehensive remedy data
    const allRemedies = [
      // Sun Remedies
      {
        name: "Gayatri Mantra",
        category: "mantras",
        categoryIcon: "📿",
        planet: "Sun",
        planetIcon: "☀️",
        purpose: "Strengthen Sun, enhance leadership and vitality",
        difficulty: "Easy",
        instructions: "Chant 'Om Bhur Bhuva Swaha, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat' 108 times daily during sunrise",
        timing: "Early morning during sunrise, facing east",
        benefits: [
          "Increased confidence and leadership",
          "Better health and vitality",
          "Success in government jobs",
          "Improved father relationships"
        ],
        precautions: [
          "Maintain purity while chanting",
          "Face east during recitation"
        ]
      },
      {
        name: "Ruby Gemstone",
        category: "gemstones",
        categoryIcon: "💎",
        planet: "Sun",
        planetIcon: "☀️",
        purpose: "Enhance Sun's positive effects",
        difficulty: "Medium",
        instructions: "Wear a natural ruby of at least 3 carats in gold ring on ring finger of right hand on Sunday morning",
        timing: "Sunday morning during sunrise",
        benefits: [
          "Enhanced leadership qualities",
          "Better health and immunity",
          "Success in career",
          "Improved self-confidence"
        ],
        precautions: [
          "Ensure ruby is natural and unheated",
          "Consult astrologer before wearing",
          "Energize with Sun mantras"
        ]
      },
      
      // Moon Remedies
      {
        name: "Chandra Mantra",
        category: "mantras",
        categoryIcon: "📿",
        planet: "Moon",
        planetIcon: "🌙",
        purpose: "Strengthen Moon, improve emotional balance",
        difficulty: "Easy",
        instructions: "Chant 'Om Chandraya Namaha' or 'Om Som Somaya Namaha' 108 times daily",
        timing: "Monday evening or during full moon",
        benefits: [
          "Emotional stability",
          "Better sleep and peace",
          "Improved mother relationships",
          "Enhanced intuition"
        ]
      },
      {
        name: "Pearl Gemstone",
        category: "gemstones",
        categoryIcon: "💎",
        planet: "Moon",
        planetIcon: "🌙",
        purpose: "Enhance Moon's calming effects",
        difficulty: "Medium",
        instructions: "Wear natural pearl in silver ring on little finger on Monday",
        timing: "Monday evening during moon rise",
        benefits: [
          "Mental peace and stability",
          "Better relationships",
          "Improved memory",
          "Emotional healing"
        ]
      },
      
      // Mars Remedies
      {
        name: "Hanuman Chalisa",
        category: "mantras",
        categoryIcon: "📿",
        planet: "Mars",
        planetIcon: "🔴",
        purpose: "Reduce Mars malefic effects, increase courage",
        difficulty: "Easy",
        instructions: "Recite Hanuman Chalisa daily, especially on Tuesdays",
        timing: "Tuesday morning or evening",
        benefits: [
          "Increased courage and strength",
          "Protection from enemies",
          "Reduced anger and aggression",
          "Success in competitions"
        ]
      },
      {
        name: "Red Coral",
        category: "gemstones",
        categoryIcon: "💎",
        planet: "Mars",
        planetIcon: "🔴",
        purpose: "Channel Mars energy positively",
        difficulty: "Medium",
        instructions: "Wear red coral in gold or copper ring on ring finger on Tuesday",
        timing: "Tuesday morning",
        benefits: [
          "Increased energy and vitality",
          "Better leadership skills",
          "Success in sports and competition",
          "Improved blood circulation"
        ]
      },
      
      // Mercury Remedies
      {
        name: "Vishnu Sahasranama",
        category: "mantras",
        categoryIcon: "📿",
        planet: "Mercury",
        planetIcon: "💚",
        purpose: "Enhance Mercury for better communication",
        difficulty: "Medium",
        instructions: "Recite Vishnu Sahasranama on Wednesdays",
        timing: "Wednesday morning",
        benefits: [
          "Improved communication skills",
          "Better business acumen",
          "Enhanced learning ability",
          "Success in education"
        ]
      },
      {
        name: "Emerald Gemstone",
        category: "gemstones",
        categoryIcon: "💎",
        planet: "Mercury",
        planetIcon: "💚",
        purpose: "Strengthen Mercury for intelligence",
        difficulty: "Medium",
        instructions: "Wear emerald in gold ring on little finger on Wednesday",
        timing: "Wednesday morning",
        benefits: [
          "Enhanced intelligence",
          "Better communication",
          "Success in business",
          "Improved memory"
        ]
      },
      
      // Jupiter Remedies
      {
        name: "Guru Mantra",
        category: "mantras",
        categoryIcon: "📿",
        planet: "Jupiter",
        planetIcon: "🟡",
        purpose: "Strengthen Jupiter for wisdom and prosperity",
        difficulty: "Easy",
        instructions: "Chant 'Om Guruve Namaha' or 'Om Brihaspataye Namaha' 108 times",
        timing: "Thursday morning",
        benefits: [
          "Increased wisdom and knowledge",
          "Financial prosperity",
          "Spiritual growth",
          "Better teacher-student relationships"
        ]
      },
      {
        name: "Yellow Sapphire",
        category: "gemstones",
        categoryIcon: "💎",
        planet: "Jupiter",
        planetIcon: "🟡",
        purpose: "Enhance Jupiter's beneficial effects",
        difficulty: "Medium",
        instructions: "Wear yellow sapphire in gold ring on index finger on Thursday",
        timing: "Thursday morning during Jupiter hora",
        benefits: [
          "Wealth and prosperity",
          "Wisdom and knowledge",
          "Spiritual advancement",
          "Good fortune"
        ]
      },
      
      // Venus Remedies
      {
        name: "Lakshmi Mantra",
        category: "mantras",
        categoryIcon: "📿",
        planet: "Venus",
        planetIcon: "🩷",
        purpose: "Strengthen Venus for love and prosperity",
        difficulty: "Easy",
        instructions: "Chant 'Om Shukraya Namaha' or 'Om Mahalakshmyai Namaha' 108 times",
        timing: "Friday morning or evening",
        benefits: [
          "Improved relationships",
          "Material comforts",
          "Artistic abilities",
          "Beauty and charm"
        ]
      },
      {
        name: "Diamond or White Sapphire",
        category: "gemstones",
        categoryIcon: "💎",
        planet: "Venus",
        planetIcon: "🩷",
        purpose: "Enhance Venus for love and luxury",
        difficulty: "Hard",
        instructions: "Wear diamond or white sapphire in platinum or white gold on middle finger on Friday",
        timing: "Friday morning during Venus hora",
        benefits: [
          "Harmonious relationships",
          "Luxury and comfort",
          "Artistic success",
          "Enhanced beauty"
        ]
      },
      
      // Saturn Remedies
      {
        name: "Shani Mantra",
        category: "mantras",
        categoryIcon: "📿",
        planet: "Saturn",
        planetIcon: "🖤",
        purpose: "Reduce Saturn's malefic effects",
        difficulty: "Easy",
        instructions: "Chant 'Om Shanishcharaya Namaha' 108 times daily",
        timing: "Saturday evening",
        benefits: [
          "Reduced obstacles",
          "Better discipline",
          "Long-term success",
          "Spiritual growth"
        ]
      },
      {
        name: "Blue Sapphire",
        category: "gemstones",
        categoryIcon: "💎",
        planet: "Saturn",
        planetIcon: "🖤",
        purpose: "Channel Saturn's energy positively",
        difficulty: "Hard",
        instructions: "Wear blue sapphire in silver or iron ring on middle finger on Saturday (only after proper consultation)",
        timing: "Saturday evening",
        benefits: [
          "Quick results in career",
          "Discipline and focus",
          "Protection from enemies",
          "Spiritual advancement"
        ],
        precautions: [
          "Must consult expert astrologer",
          "Test for 3 days before permanent wearing",
          "Remove if negative effects occur"
        ]
      },
      
      // Lifestyle Remedies
      {
        name: "Surya Namaskar",
        category: "lifestyle",
        categoryIcon: "🌿",
        planet: "Sun",
        planetIcon: "☀️",
        purpose: "Overall health and Sun strengthening",
        difficulty: "Medium",
        instructions: "Perform 12 rounds of Surya Namaskar daily facing east during sunrise",
        timing: "Early morning during sunrise",
        benefits: [
          "Physical fitness",
          "Mental clarity",
          "Spiritual growth",
          "Sun strengthening"
        ]
      },
      {
        name: "Meditation",
        category: "lifestyle",
        categoryIcon: "🌿",
        planet: "Moon",
        planetIcon: "🌙",
        purpose: "Mental peace and Moon strengthening",
        difficulty: "Easy",
        instructions: "Practice 20 minutes of meditation daily, preferably during moon rise",
        timing: "Evening during moon rise or early morning",
        benefits: [
          "Mental peace",
          "Emotional stability",
          "Better sleep",
          "Spiritual awareness"
        ]
      },
      
      // Charity Remedies
      {
        name: "Feed the Poor",
        category: "charity",
        categoryIcon: "🤲",
        planet: "Jupiter",
        planetIcon: "🟡",
        purpose: "Gain Jupiter's blessings",
        difficulty: "Easy",
        instructions: "Feed poor people, especially on Thursdays. Donate yellow items like turmeric, yellow cloth, or gold",
        timing: "Thursday",
        benefits: [
          "Spiritual merit",
          "Jupiter's blessings",
          "Prosperity",
          "Good karma"
        ]
      },
      {
        name: "Donate to Temples",
        category: "charity",
        categoryIcon: "🤲",
        planet: "Sun",
        planetIcon: "☀️",
        purpose: "Strengthen Sun and gain divine blessings",
        difficulty: "Easy",
        instructions: "Donate wheat, jaggery, copper items, or red cloth to temples on Sundays",
        timing: "Sunday morning",
        benefits: [
          "Divine blessings",
          "Sun strengthening",
          "Good health",
          "Success in career"
        ]
      },
      
      // Fasting Remedies
      {
        name: "Monday Fast",
        category: "fasting",
        categoryIcon: "🌙",
        planet: "Moon",
        planetIcon: "🌙",
        purpose: "Strengthen Moon and gain Lord Shiva's blessings",
        difficulty: "Medium",
        instructions: "Fast on Mondays, eat only fruits or milk. Visit Shiva temple and offer milk to Shiva Linga",
        timing: "Every Monday",
        benefits: [
          "Mental peace",
          "Emotional stability",
          "Lord Shiva's blessings",
          "Moon strengthening"
        ]
      },
      {
        name: "Saturday Fast",
        category: "fasting",
        categoryIcon: "🌙",
        planet: "Saturn",
        planetIcon: "🖤",
        purpose: "Reduce Saturn's malefic effects",
        difficulty: "Medium",
        instructions: "Fast on Saturdays, eat only once in evening. Donate black items and visit Hanuman temple",
        timing: "Every Saturday",
        benefits: [
          "Reduced obstacles",
          "Saturn's grace",
          "Discipline",
          "Spiritual growth"
        ]
      }
    ];

    // Filter based on category and planet
    let filteredRemedies = allRemedies;
    
    if (args.category) {
      filteredRemedies = filteredRemedies.filter(remedy => remedy.category === args.category);
    }
    
    if (args.planet) {
      filteredRemedies = filteredRemedies.filter(remedy => remedy.planet.toLowerCase() === args.planet);
    }

    return filteredRemedies;
  },
});
