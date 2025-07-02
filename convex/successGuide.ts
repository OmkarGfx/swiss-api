import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateSuccessAnalysis = mutation({
  args: {
    chartId: v.id("birthCharts"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const chart = await ctx.db.get(args.chartId);
    if (!chart || chart.userId !== userId) {
      throw new Error("Chart not found or access denied");
    }

    const analysis = generateSuccessAnalysisData(chart);

    return await ctx.db.insert("successAnalyses", {
      userId,
      chartId: args.chartId,
      analysis,
      generatedAt: Date.now(),
    });
  },
});

export const getSuccessAnalysis = query({
  args: {
    chartId: v.id("birthCharts"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const analysis = await ctx.db
      .query("successAnalyses")
      .withIndex("by_chart", (q) => q.eq("chartId", args.chartId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .first();

    return analysis?.analysis || null;
  },
});

function generateSuccessAnalysisData(chart: any) {
  const chartData = chart.chartData;
  
  return {
    overallScore: Math.floor(Math.random() * 30) + 70,
    dominantElement: getRandomElement(),
    lifeTheme: getRandomLifeTheme(),
    
    keyStrengths: [
      "Natural leadership abilities",
      "Strong intuitive powers",
      "Excellent communication skills",
      "Creative problem-solving approach",
      "Resilient and adaptable nature",
      "Strong moral compass and ethics"
    ],
    
    developmentAreas: [
      "Patience in achieving long-term goals",
      "Balancing work and personal life",
      "Managing emotional reactions",
      "Building consistent daily routines",
      "Developing financial discipline"
    ],
    
    houseAnalysis: {
      1: {
        strength: Math.floor(Math.random() * 40) + 60,
        lord: getRandomPlanet(),
        lordSign: getRandomSign(),
        planets: getRandomPlanets(),
        interpretation: "Strong self-identity and confidence. Natural leadership qualities are evident."
      },
      2: {
        strength: Math.floor(Math.random() * 40) + 60,
        lord: getRandomPlanet(),
        lordSign: getRandomSign(),
        planets: getRandomPlanets(),
        interpretation: "Good potential for wealth accumulation through steady efforts and wise investments."
      },
      5: {
        strength: Math.floor(Math.random() * 40) + 60,
        lord: getRandomPlanet(),
        lordSign: getRandomSign(),
        planets: getRandomPlanets(),
        interpretation: "Creative intelligence and innovative thinking. Good for speculative gains and children."
      },
      9: {
        strength: Math.floor(Math.random() * 40) + 60,
        lord: getRandomPlanet(),
        lordSign: getRandomSign(),
        planets: getRandomPlanets(),
        interpretation: "Fortune and higher learning are well-supported. Spiritual inclinations bring success."
      },
      10: {
        strength: Math.floor(Math.random() * 40) + 60,
        lord: getRandomPlanet(),
        lordSign: getRandomSign(),
        planets: getRandomPlanets(),
        interpretation: "Strong career prospects and public recognition. Leadership roles suit you well."
      },
      11: {
        strength: Math.floor(Math.random() * 40) + 60,
        lord: getRandomPlanet(),
        lordSign: getRandomSign(),
        planets: getRandomPlanets(),
        interpretation: "Excellent for gains and fulfillment of desires. Strong network of influential friends."
      }
    },
    
    yogas: [
      {
        name: "Gaja Kesari Yoga",
        strength: "Strong",
        description: "Jupiter and Moon in mutual kendras create this auspicious yoga",
        formation: "Jupiter in 4th house from Moon",
        benefits: "Wisdom, prosperity, good reputation, and leadership qualities",
        activationPeriod: "Jupiter Mahadasha (2025-2041)"
      },
      {
        name: "Dhana Yoga",
        strength: "Moderate",
        description: "Wealth-giving planetary combination",
        formation: "2nd and 11th house lords in conjunction",
        benefits: "Financial prosperity, multiple income sources, material comforts",
        activationPeriod: "Venus-Mercury period (2026-2028)"
      },
      {
        name: "Raja Yoga",
        strength: "Moderate",
        description: "Combination of kendra and trikona lords",
        formation: "5th lord in 10th house",
        benefits: "Authority, recognition, success in career, royal treatment",
        activationPeriod: "Sun Mahadasha (2030-2036)"
      }
    ],
    
    currentDasha: {
      mahadasha: getRandomPlanet(),
      antardasha: getRandomPlanet(),
      period: "2024-2027",
      favorability: getRandomFavorability(),
      interpretation: "This period brings opportunities for career advancement and financial growth. Focus on building long-term foundations and maintaining good relationships."
    },
    
    upcomingPeriods: [
      {
        period: "Jupiter Mahadasha",
        timeframe: "2025-2041",
        opportunities: "Spiritual growth, teaching, counseling, higher education, and wisdom-based careers"
      },
      {
        period: "Venus Antardasha",
        timeframe: "2026-2028",
        opportunities: "Creative pursuits, luxury business, relationships, and artistic endeavors"
      },
      {
        period: "Mercury Bhukti",
        timeframe: "2027-2029",
        opportunities: "Communication, technology, writing, business, and intellectual pursuits"
      }
    ],
    
    career: {
      suitableFields: [
        "Education and Teaching",
        "Consulting and Advisory",
        "Technology and Innovation",
        "Healthcare and Healing",
        "Finance and Investment",
        "Creative Arts and Media",
        "Spiritual and Philosophical Work"
      ],
      strengths: [
        "Natural teaching ability",
        "Strategic thinking",
        "Problem-solving skills",
        "Interpersonal communication",
        "Analytical mindset",
        "Creative innovation"
      ],
      timeline: [
        {
          period: "2024-2027",
          focus: "Foundation Building",
          opportunities: "Establish expertise, build network, gain recognition in chosen field"
        },
        {
          period: "2027-2032",
          focus: "Growth and Expansion",
          opportunities: "Leadership roles, business ventures, significant career advancement"
        },
        {
          period: "2032-2040",
          focus: "Mastery and Influence",
          opportunities: "Industry leadership, mentoring others, creating lasting impact"
        }
      ]
    },
    
    wealth: {
      potential: "High",
      bestPeriod: "2028-2035",
      sources: "Multiple Streams",
      investments: [
        {
          type: "Real Estate",
          timing: "2025-2027",
          rationale: "Strong 4th house indicates property gains during Venus period"
        },
        {
          type: "Equity Markets",
          timing: "2026-2030",
          rationale: "Jupiter's influence on 11th house supports speculative gains"
        },
        {
          type: "Gold and Precious Metals",
          timing: "2024-2026",
          rationale: "Venus and Jupiter combination favors precious metal investments"
        }
      ],
      cautions: [
        {
          period: "2029-2031",
          warning: "Saturn transit may cause temporary financial constraints",
          advice: "Avoid major investments and focus on debt reduction"
        },
        {
          period: "2033-2035",
          warning: "Rahu influence may create speculative losses",
          advice: "Be cautious with high-risk investments and get expert advice"
        }
      ]
    },
    
    education: {
      recommendedFields: [
        "Philosophy and Spirituality",
        "Business Administration",
        "Information Technology",
        "Psychology and Counseling",
        "Medicine and Healthcare",
        "Arts and Creative Studies"
      ],
      learningStrengths: [
        "Quick grasp of complex concepts",
        "Excellent memory retention",
        "Practical application of knowledge",
        "Research and analytical skills",
        "Teaching and sharing knowledge"
      ],
      favorablePeriods: [
        {
          timeframe: "2024-2026",
          focus: "Professional Certifications",
          advice: "Pursue industry-relevant certifications and skill upgrades"
        },
        {
          timeframe: "2027-2030",
          focus: "Higher Education",
          advice: "Ideal time for advanced degrees or specialized training"
        },
        {
          timeframe: "2031-2035",
          focus: "Teaching and Mentoring",
          advice: "Share your knowledge through teaching or writing"
        }
      ]
    },
    
    relationships: {
      strengths: [
        "Natural empathy and understanding",
        "Good communication skills",
        "Loyalty and commitment",
        "Supportive and nurturing nature",
        "Ability to inspire others"
      ],
      growthAreas: [
        "Managing expectations in relationships",
        "Balancing personal and professional time",
        "Expressing emotions more openly",
        "Setting healthy boundaries",
        "Patience with different perspectives"
      ],
      guidance: [
        {
          aspect: "Marriage and Partnership",
          advice: "Focus on emotional compatibility and shared values. Best period for marriage is 2025-2027."
        },
        {
          aspect: "Family Relationships",
          advice: "Maintain regular communication with family. Your success will bring pride to your family."
        },
        {
          aspect: "Professional Relationships",
          advice: "Build a strong network of mentors and peers. Collaborative efforts will be highly beneficial."
        }
      ]
    },
    
    health: {
      strengths: [
        "Strong constitution and vitality",
        "Good recovery ability",
        "Mental resilience",
        "Natural healing tendencies"
      ],
      vulnerabilities: [
        "Stress-related digestive issues",
        "Eye strain from overwork",
        "Joint problems in later years",
        "Tendency toward anxiety"
      ],
      recommendations: [
        {
          category: "Physical Health",
          advice: "Regular exercise, yoga, and outdoor activities. Pay attention to diet and hydration."
        },
        {
          category: "Mental Health",
          advice: "Practice meditation and stress management. Maintain work-life balance."
        },
        {
          category: "Preventive Care",
          advice: "Regular health checkups, especially for heart and digestive system."
        }
      ]
    },
    
    timing: {
      principles: [
        {
          activity: "Starting New Ventures",
          timing: "Thursday mornings during waxing moon",
          rationale: "Jupiter's influence enhances success in new beginnings"
        },
        {
          activity: "Important Meetings",
          timing: "Wednesday or Friday afternoons",
          rationale: "Mercury and Venus periods favor communication and negotiations"
        },
        {
          activity: "Financial Investments",
          timing: "Friday during Venus hora",
          rationale: "Venus governs wealth and material prosperity"
        },
        {
          activity: "Educational Pursuits",
          timing: "Wednesday mornings",
          rationale: "Mercury's influence enhances learning and knowledge acquisition"
        }
      ],
      upcomingPeriods: [
        {
          timeframe: "March 2024 - May 2024",
          activities: "Career advancement, new projects",
          description: "Jupiter's favorable transit supports professional growth"
        },
        {
          timeframe: "August 2024 - October 2024",
          activities: "Financial planning, investments",
          description: "Venus-Mercury combination favors wealth accumulation"
        },
        {
          timeframe: "January 2025 - March 2025",
          activities: "Relationship matters, partnerships",
          description: "Favorable period for marriage and business partnerships"
        }
      ]
    }
  };
}

function getRandomElement(): string {
  const elements = ["Fire", "Earth", "Air", "Water"];
  return elements[Math.floor(Math.random() * elements.length)];
}

function getRandomLifeTheme(): string {
  const themes = ["Leadership", "Service", "Innovation", "Wisdom", "Creativity", "Healing"];
  return themes[Math.floor(Math.random() * themes.length)];
}

function getRandomPlanet(): string {
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  return planets[Math.floor(Math.random() * planets.length)];
}

function getRandomSign(): string {
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                 "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  return signs[Math.floor(Math.random() * signs.length)];
}

function getRandomPlanets(): string[] {
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];
  const count = Math.floor(Math.random() * 3);
  const selected: string[] = [];
  for (let i = 0; i < count; i++) {
    const planet = planets[Math.floor(Math.random() * planets.length)];
    if (!selected.includes(planet)) {
      selected.push(planet);
    }
  }
  return selected;
}

function getRandomFavorability(): string {
  const levels = ["Highly Favorable", "Favorable", "Neutral", "Challenging"];
  return levels[Math.floor(Math.random() * levels.length)];
}
