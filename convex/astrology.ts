import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createBirthChart = mutation({
  args: {
    name: v.string(),
    birthDate: v.string(),
    birthTime: v.string(),
    birthLocation: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    gender: v.union(v.literal("male"), v.literal("female"), v.literal("other")),
    timezone: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated to create birth chart");
    }

    // Generate mock chart data
    const chartData = {
      userInfo: {
        name: args.name,
        birthDate: args.birthDate,
        birthTime: args.birthTime,
        gender: args.gender,
        birthLocation: args.birthLocation,
        latitude: args.latitude,
        longitude: args.longitude,
        timezone: args.timezone,
        julianDay: 2460000, // Mock value
      },
      birthSummary: {
        ascendantSign: "Aries",
        ascendantLord: "Mars",
        moonSign: "Cancer",
        sunSign: "Leo",
        nakshatra: "Pushya",
        nakshatraLord: "Saturn",
        charan: 2,
      },
      planets: [
        {
          name: "Sun",
          degree: 15.5,
          sign: "Leo",
          house: 5,
          retrograde: false,
          nakshatra: "Magha",
          nakshatraLord: "Ketu",
          pad: 1,
        },
        {
          name: "Moon",
          degree: 22.3,
          sign: "Cancer",
          house: 4,
          retrograde: false,
          nakshatra: "Pushya",
          nakshatraLord: "Saturn",
          pad: 2,
        },
        {
          name: "Mars",
          degree: 8.7,
          sign: "Aries",
          house: 1,
          retrograde: false,
          nakshatra: "Ashwini",
          nakshatraLord: "Ketu",
          pad: 1,
        },
      ],
      houses: Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        sign: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][i],
        degree: Math.random() * 30,
      })),
    };

    const chartId = await ctx.db.insert("birthCharts", {
      userId,
      name: args.name,
      birthDate: args.birthDate,
      birthTime: args.birthTime,
      birthLocation: args.birthLocation,
      latitude: args.latitude,
      longitude: args.longitude,
      gender: args.gender,
      timezone: args.timezone,
      chartData,
      isPublic: false,
    });

    return chartId;
  },
});

export const getUserBirthCharts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("birthCharts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getBirthChart = query({
  args: { chartId: v.id("birthCharts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated");
    }

    const chart = await ctx.db.get(args.chartId);
    if (!chart || chart.userId !== userId) {
      throw new Error("Chart not found or access denied");
    }

    return chart;
  },
});

export const deleteBirthChart = mutation({
  args: { chartId: v.id("birthCharts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be authenticated");
    }

    const chart = await ctx.db.get(args.chartId);
    if (!chart || chart.userId !== userId) {
      throw new Error("Chart not found or access denied");
    }

    await ctx.db.delete(args.chartId);
  },
});
