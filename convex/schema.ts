import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  userProfiles: defineTable({
    userId: v.id("users"),
    subscriptionTier: v.union(v.literal("free"), v.literal("premium")),
    subscriptionExpiry: v.optional(v.string()),
    preferences: v.optional(v.object({})),
  }).index("by_user", ["userId"]),

  birthCharts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    birthDate: v.string(),
    birthTime: v.string(),
    birthLocation: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    gender: v.optional(v.union(v.literal("male"), v.literal("female"), v.literal("other"))),
    timezone: v.optional(v.string()),
    chartData: v.object({
      userInfo: v.object({
        name: v.string(),
        birthDate: v.string(),
        birthTime: v.string(),
        gender: v.string(),
        birthLocation: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        timezone: v.string(),
        julianDay: v.number(),
      }),
      birthSummary: v.object({
        ascendantSign: v.string(),
        ascendantLord: v.string(),
        moonSign: v.string(),
        sunSign: v.string(),
        nakshatra: v.string(),
        nakshatraLord: v.string(),
        charan: v.number(),
      }),
      planets: v.array(v.object({
        name: v.string(),
        degree: v.number(),
        sign: v.string(),
        house: v.number(),
        retrograde: v.boolean(),
        nakshatra: v.string(),
        nakshatraLord: v.string(),
        pad: v.number(),
      })),
      houses: v.array(v.object({
        number: v.number(),
        sign: v.string(),
        degree: v.number(),
      })),
    }),
    isPublic: v.boolean(),
  }).index("by_user", ["userId"]),

  horoscopes: defineTable({
    type: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    sign: v.string(),
    date: v.string(),
    content: v.string(),
    aiGenerated: v.boolean(),
  }).index("by_type_and_sign", ["type", "sign"]),

  compatibilityReports: defineTable({
    userId: v.id("users"),
    person1ChartId: v.id("birthCharts"),
    person2ChartId: v.id("birthCharts"),
    compatibilityScore: v.number(),
    report: v.string(),
    synastryAspects: v.object({}),
  }).index("by_user", ["userId"]),

  consultations: defineTable({
    userId: v.id("users"),
    astrologerId: v.optional(v.id("users")),
    scheduledDate: v.string(),
    duration: v.number(),
    status: v.union(v.literal("scheduled"), v.literal("completed"), v.literal("cancelled")),
    notes: v.optional(v.string()),
    price: v.number(),
  }).index("by_user", ["userId"]),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.union(v.literal("charts"), v.literal("gemstones"), v.literal("tarot"), v.literal("books")),
    imageUrl: v.optional(v.string()),
    inStock: v.boolean(),
  }),

  chatSessions: defineTable({
    userId: v.id("users"),
    messages: v.array(v.object({
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
      timestamp: v.number(),
    })),
    isActive: v.boolean(),
  }).index("by_user", ["userId"]),

  successAnalyses: defineTable({
    userId: v.id("users"),
    chartId: v.id("birthCharts"),
    analysis: v.object({
      careerPredictions: v.array(v.string()),
      financialInsights: v.array(v.string()),
      personalityTraits: v.array(v.string()),
      recommendations: v.array(v.string()),
    }),
  }).index("by_user", ["userId"]),

  marriageAnalyses: defineTable({
    userId: v.id("users"),
    chartId: v.id("birthCharts"),
    analysis: v.object({
      marriageTiming: v.array(v.string()),
      partnerTraits: v.array(v.string()),
      compatibility: v.array(v.string()),
      recommendations: v.array(v.string()),
    }),
  }).index("by_user", ["userId"]),

  doshaAnalyses: defineTable({
    userId: v.id("users"),
    chartId: v.id("birthCharts"),
    analysis: v.object({
      mangalDosha: v.object({
        present: v.boolean(),
        severity: v.string(),
        remedies: v.array(v.string()),
      }),
      kalSarpaDosha: v.object({
        present: v.boolean(),
        type: v.string(),
        remedies: v.array(v.string()),
      }),
      pitruDosha: v.object({
        present: v.boolean(),
        remedies: v.array(v.string()),
      }),
    }),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
