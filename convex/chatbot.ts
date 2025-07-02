import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const startChatSession = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Close any existing active sessions
    const existingSessions = await ctx.db
      .query("chatSessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    for (const session of existingSessions) {
      await ctx.db.patch(session._id, { isActive: false });
    }

    // Create new session
    return await ctx.db.insert("chatSessions", {
      userId,
      messages: [{
        role: "assistant",
        content: "🔮 Welcome! I'm your personal astrology guide. I can help you understand your birth chart, generate horoscopes, check compatibility, and answer any astrological questions. What would you like to explore today?",
        timestamp: Date.now(),
      }],
      isActive: true,
    });
  },
});

export const getChatSession = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db
      .query("chatSessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
  },
});

export const addMessage = mutation({
  args: {
    sessionId: v.id("chatSessions"),
    message: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");

    const newMessages = [
      ...session.messages,
      {
        role: args.role,
        content: args.message,
        timestamp: Date.now(),
      }
    ];

    await ctx.db.patch(args.sessionId, { messages: newMessages });
    return newMessages;
  },
});

// Simplified send message without AI for now
export const sendMessage = mutation({
  args: {
    message: v.string(),
    sessionId: v.id("chatSessions"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");

    // Add user message
    const userMessages = [
      ...session.messages,
      {
        role: "user" as const,
        content: args.message,
        timestamp: Date.now(),
      }
    ];

    // Add simple response
    const responseMessages = [
      ...userMessages,
      {
        role: "assistant" as const,
        content: "Thank you for your question! The AI astrologer feature will be available soon. For now, you can explore your birth charts and horoscopes using the other sections.",
        timestamp: Date.now() + 1000,
      }
    ];

    await ctx.db.patch(args.sessionId, { messages: responseMessages });
    return "Message sent successfully";
  },
});
