import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getHoroscope = query({
  args: {
    type: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    sign: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const horoscope = await ctx.db
      .query("horoscopes")
      .withIndex("by_type_and_sign", (q) => 
        q.eq("type", args.type).eq("sign", args.sign)
      )
      .filter((q) => q.eq(q.field("date"), args.date))
      .first();

    if (horoscope) {
      return horoscope;
    }

    // Generate a new horoscope if not found
    const content = generateHoroscopeContent(args.type, args.sign);
    
    const horoscopeId = await ctx.db.insert("horoscopes", {
      type: args.type,
      sign: args.sign,
      date: args.date,
      content,
      aiGenerated: true,
    });

    return await ctx.db.get(horoscopeId);
  },
});

function generateHoroscopeContent(type: string, sign: string): string {
  const predictions = [
    "Today brings new opportunities for growth and self-discovery.",
    "Your intuition is particularly strong right now - trust your instincts.",
    "A chance encounter may lead to meaningful connections.",
    "Focus on balance in all aspects of your life.",
    "Your creativity is flowing - express yourself freely.",
    "Financial matters require careful attention today.",
    "Relationships take center stage in your cosmic forecast.",
    "Your leadership qualities shine brightly.",
    "Adventure and learning await you.",
    "Trust in the process of transformation.",
  ];

  const advice = [
    "Embrace change with an open heart.",
    "Practice gratitude for life's blessings.",
    "Listen to your inner wisdom.",
    "Take time for self-care and reflection.",
    "Communicate openly with loved ones.",
    "Stay grounded while reaching for your dreams.",
    "Be patient with yourself and others.",
    "Focus on what truly matters to you.",
    "Trust in divine timing.",
    "Celebrate your unique gifts.",
  ];

  const prediction = predictions[Math.floor(Math.random() * predictions.length)];
  const guidance = advice[Math.floor(Math.random() * advice.length)];

  return `${prediction} ${guidance} The stars align favorably for ${sign} during this ${type} period.`;
}
