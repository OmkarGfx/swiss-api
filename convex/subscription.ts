import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserSubscription = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return {
      tier: profile?.subscriptionTier || "free",
      expiry: profile?.subscriptionExpiry,
      isActive: !profile?.subscriptionExpiry || profile.subscriptionExpiry > Date.now(),
    };
  },
});

export const upgradeToPremium = mutation({
  args: {
    plan: v.union(v.literal("monthly"), v.literal("yearly")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const expiryTime = args.plan === "monthly" 
      ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
      : Date.now() + (365 * 24 * 60 * 60 * 1000); // 365 days

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        subscriptionTier: "premium",
        subscriptionExpiry: expiryTime,
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        subscriptionTier: "premium",
        subscriptionExpiry: expiryTime,
      });
    }

    return { success: true, expiry: expiryTime };
  },
});

export const updateUserPreferences = mutation({
  args: {
    chartStyle: v.optional(v.union(v.literal("north_indian"), v.literal("south_indian"), v.literal("western"))),
    astroSystem: v.optional(v.union(v.literal("vedic"), v.literal("western"))),
    timezone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingProfile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const currentPrefs = existingProfile?.preferences || {
      chartStyle: "north_indian" as const,
      astroSystem: "vedic" as const,
    };

    const updatedPrefs = { ...currentPrefs };
    if (args.chartStyle !== undefined) updatedPrefs.chartStyle = args.chartStyle;
    if (args.astroSystem !== undefined) updatedPrefs.astroSystem = args.astroSystem;
    if (args.timezone !== undefined) updatedPrefs.timezone = args.timezone;

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, {
        preferences: updatedPrefs,
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        preferences: updatedPrefs,
      });
    }

    return { success: true };
  },
});

export const grantPremiumAccess = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const user = await ctx.db.get(userId);
    if (!user || user.email !== "omhegde4567@gmail.com") {
      return { success: false };
    }

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const expiryTime = Date.now() + (365 * 24 * 60 * 60 * 1000);

    if (profile) {
      await ctx.db.patch(profile._id, {
        subscriptionTier: "premium",
        subscriptionExpiry: expiryTime,
      });
    } else {
      await ctx.db.insert("userProfiles", {
        userId,
        subscriptionTier: "premium",
        subscriptionExpiry: expiryTime,
      });
    }

    return { success: true };
  },
});
