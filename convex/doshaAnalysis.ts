import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateDoshaAnalysis = mutation({
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

    const analysis = generateDoshaAnalysisData(chart);

    return await ctx.db.insert("doshaAnalyses", {
      userId,
      chartId: args.chartId,
      analysis,
      generatedAt: Date.now(),
    });
  },
});

export const getDoshaAnalysis = query({
  args: {
    chartId: v.id("birthCharts"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const analysis = await ctx.db
      .query("doshaAnalyses")
      .withIndex("by_chart", (q) => q.eq("chartId", args.chartId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .first();

    return analysis?.analysis || null;
  },
});

function generateDoshaAnalysisData(chart: any) {
  const doshas = [
    {
      name: "Mangal Dosha (Mars Dosha)",
      present: Math.random() > 0.6,
      severity: getRandomSeverity(),
      formation: "Mars placed in 1st, 2nd, 4th, 7th, 8th, or 12th house from Lagna or Moon",
      effects: [
        "Delays in marriage",
        "Conflicts in married life",
        "Aggressive temperament",
        "Accidents or injuries",
        "Property disputes"
      ],
      remedies: [
        {
          type: "Mantra",
          description: "Chant 'Om Angarakaya Namaha' 108 times daily"
        },
        {
          type: "Gemstone",
          description: "Wear red coral on Tuesday in gold ring"
        },
        {
          type: "Charity",
          description: "Donate red lentils, jaggery, and red cloth on Tuesdays"
        },
        {
          type: "Ritual",
          description: "Perform Mangal Shanti Puja on Tuesday"
        }
      ]
    },
    {
      name: "Shani Dosha (Saturn Dosha)",
      present: Math.random() > 0.5,
      severity: getRandomSeverity(),
      formation: "Saturn in malefic houses or aspecting important houses negatively",
      effects: [
        "Delays in career progress",
        "Financial struggles",
        "Health issues",
        "Mental stress and anxiety",
        "Obstacles in life goals"
      ],
      remedies: [
        {
          type: "Mantra",
          description: "Chant 'Om Shanishcharaya Namaha' 108 times daily"
        },
        {
          type: "Gemstone",
          description: "Wear blue sapphire or amethyst on Saturday"
        },
        {
          type: "Charity",
          description: "Donate black sesame seeds, iron, and black cloth"
        },
        {
          type: "Fasting",
          description: "Fast on Saturdays and visit Shani temple"
        }
      ]
    },
    {
      name: "Rahu Dosha",
      present: Math.random() > 0.7,
      severity: getRandomSeverity(),
      formation: "Rahu in conjunction with or aspecting important planets",
      effects: [
        "Confusion and illusions",
        "Sudden ups and downs",
        "Foreign travel or settlement",
        "Unconventional thinking",
        "Technology-related issues"
      ],
      remedies: [
        {
          type: "Mantra",
          description: "Chant 'Om Rahave Namaha' 108 times daily"
        },
        {
          type: "Gemstone",
          description: "Wear hessonite garnet on Saturday"
        },
        {
          type: "Charity",
          description: "Donate mustard oil, black gram, and blue cloth"
        },
        {
          type: "Ritual",
          description: "Perform Rahu Shanti Puja during Rahu Kaal"
        }
      ]
    },
    {
      name: "Ketu Dosha",
      present: Math.random() > 0.7,
      severity: getRandomSeverity(),
      formation: "Ketu in malefic position or aspecting important houses",
      effects: [
        "Spiritual inclinations",
        "Detachment from material world",
        "Sudden losses",
        "Health issues",
        "Lack of direction"
      ],
      remedies: [
        {
          type: "Mantra",
          description: "Chant 'Om Ketave Namaha' 108 times daily"
        },
        {
          type: "Gemstone",
          description: "Wear cat's eye on Thursday"
        },
        {
          type: "Charity",
          description: "Donate multi-colored cloth and sesame seeds"
        },
        {
          type: "Spiritual",
          description: "Practice meditation and visit Ganesha temples"
        }
      ]
    },
    {
      name: "Pitra Dosha",
      present: Math.random() > 0.8,
      severity: getRandomSeverity(),
      formation: "Sun with Rahu or Ketu, or malefic planets in 9th house",
      effects: [
        "Ancestral curses",
        "Family problems",
        "Childlessness",
        "Financial instability",
        "Lack of peace at home"
      ],
      remedies: [
        {
          type: "Ritual",
          description: "Perform Pitra Paksha rituals and Shraddha"
        },
        {
          type: "Charity",
          description: "Feed Brahmins and poor people regularly"
        },
        {
          type: "Spiritual",
          description: "Visit Gaya and perform Pind Daan"
        },
        {
          type: "Mantra",
          description: "Chant Gayatri Mantra and Mahamrityunjaya Mantra"
        }
      ]
    }
  ];

  const presentDoshas = doshas.filter(dosha => dosha.present);
  const totalDoshas = presentDoshas.length;
  
  const overallSeverity = totalDoshas === 0 ? "None" :
                         totalDoshas <= 2 ? "Low" :
                         totalDoshas <= 3 ? "Medium" : "High";

  return {
    overallSeverity,
    totalDoshas,
    remedyEffectiveness: Math.floor(Math.random() * 30) + 70,
    doshas,
    combinations: [
      {
        doshas: ["Mangal Dosha", "Shani Dosha"],
        effect: "Double malefic influence causing significant delays",
        recommendation: "Perform combined remedies and seek astrological guidance"
      },
      {
        doshas: ["Rahu Dosha", "Ketu Dosha"],
        effect: "Karmic influences creating spiritual awakening",
        recommendation: "Focus on spiritual practices and meditation"
      }
    ],
    timingAnalysis: [
      {
        period: "Saturn Transit (2024-2027)",
        activeDoshas: ["Shani Dosha"],
        precautions: "Be extra careful with health and finances during this period"
      },
      {
        period: "Rahu-Ketu Transit (2025-2026)",
        activeDoshas: ["Rahu Dosha", "Ketu Dosha"],
        precautions: "Avoid major decisions and focus on spiritual growth"
      }
    ],
    comprehensiveRemedies: [
      {
        category: "Daily Practices",
        practices: [
          "Morning prayers and meditation",
          "Chanting specific mantras",
          "Offering water to Sun",
          "Reading sacred texts"
        ]
      },
      {
        category: "Weekly Rituals",
        practices: [
          "Visit temples on specific days",
          "Fasting on designated days",
          "Charity and donations",
          "Lighting lamps and incense"
        ]
      },
      {
        category: "Gemstone Therapy",
        practices: [
          "Wear prescribed gemstones",
          "Energize stones with mantras",
          "Proper metal combinations",
          "Regular cleansing rituals"
        ]
      }
    ]
  };
}

function getRandomSeverity(): string {
  const severities = ["Low", "Medium", "High"];
  return severities[Math.floor(Math.random() * severities.length)];
}
