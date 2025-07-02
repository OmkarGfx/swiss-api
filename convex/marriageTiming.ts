import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateMarriageAnalysis = mutation({
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

    const analysis = generateMarriageTimingAnalysis(chart);

    return await ctx.db.insert("marriageAnalyses", {
      userId,
      chartId: args.chartId,
      analysis,
      generatedAt: Date.now(),
    });
  },
});

export const getMarriageAnalysis = query({
  args: {
    chartId: v.id("birthCharts"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const analysis = await ctx.db
      .query("marriageAnalyses")
      .withIndex("by_chart", (q) => q.eq("chartId", args.chartId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .first();

    return analysis?.analysis || null;
  },
});

function generateMarriageTimingAnalysis(chart: any) {
  const chartData = chart.chartData;
  
  return {
    bestAge: `${Math.floor(Math.random() * 8) + 25}-${Math.floor(Math.random() * 8) + 30}`,
    favorablePeriod: "Venus Mahadasha",
    compatibility: Math.floor(Math.random() * 20) + 80,
    
    seventhHouse: {
      lord: getRandomPlanet(),
      position: `${getRandomSign()} in ${Math.floor(Math.random() * 12) + 1}th house`,
      strength: getRandomStrength(),
      interpretation: "The 7th house lord is well-placed, indicating a harmonious and supportive marriage. Your partner will be understanding and contribute positively to your life journey."
    },
    
    venus: {
      sign: getRandomSign(),
      house: `${Math.floor(Math.random() * 12) + 1}th house`,
      condition: getRandomCondition(),
      interpretation: "Venus is favorably placed, bringing love, harmony, and material comforts through marriage. Your relationship will be blessed with mutual understanding and affection."
    },
    
    favorablePeriods: [
      {
        timeframe: "2024-2026",
        dasha: "Venus-Jupiter",
        description: "Highly auspicious period for marriage with blessings of both love and wisdom planets"
      },
      {
        timeframe: "2027-2029",
        dasha: "Venus-Mercury",
        description: "Good communication and understanding with potential life partner"
      },
      {
        timeframe: "2030-2032",
        dasha: "Jupiter-Venus",
        description: "Divine blessings for a spiritually aligned and prosperous marriage"
      }
    ],
    
    partnerTraits: {
      physical: [
        "Attractive and well-groomed appearance",
        "Medium to tall height",
        "Pleasant facial features",
        "Graceful demeanor",
        "Healthy constitution"
      ],
      personality: [
        "Kind and compassionate nature",
        "Intelligent and well-educated",
        "Family-oriented values",
        "Artistic or creative inclinations",
        "Supportive and understanding",
        "Good communication skills"
      ]
    },
    
    remedies: [
      {
        type: "Venus Strengthening",
        description: "Wear white clothes on Friday, offer white flowers to Goddess Lakshmi"
      },
      {
        type: "7th House Activation",
        description: "Donate to couples, participate in wedding ceremonies as blessing"
      },
      {
        type: "Relationship Harmony",
        description: "Chant 'Om Shukraya Namaha' 108 times daily during Venus hora"
      },
      {
        type: "Marriage Timing",
        description: "Perform Swayamvara Parvathi Vratam for finding ideal life partner"
      }
    ]
  };
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

function getRandomStrength(): string {
  const strengths = ["Strong", "Moderate", "Weak"];
  return strengths[Math.floor(Math.random() * strengths.length)];
}

function getRandomCondition(): string {
  const conditions = ["Exalted", "Own Sign", "Friendly", "Neutral", "Debilitated"];
  return conditions[Math.floor(Math.random() * conditions.length)];
}
