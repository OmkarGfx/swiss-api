import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProducts = query({
  args: {
    category: v.optional(v.union(v.literal("charts"), v.literal("gemstones"), v.literal("tarot"), v.literal("books"))),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("products");
    
    if (args.category) {
      query = query.filter((q) => q.eq(q.field("category"), args.category));
    }

    return await query.filter((q) => q.eq(q.field("inStock"), true)).collect();
  },
});

export const getFeaturedProducts = query({
  args: {},
  handler: async (ctx) => {
    // Return sample products for demo
    return [
      {
        _id: "sample1" as any,
        name: "Personalized Birth Chart Print",
        description: "Beautiful custom birth chart artwork for your wall",
        price: 29.99,
        category: "charts" as const,
        imageUrl: "/api/placeholder/300/300",
        inStock: true,
      },
      {
        _id: "sample2" as any,
        name: "Amethyst Crystal Set",
        description: "Enhance your spiritual practice with genuine amethyst",
        price: 45.00,
        category: "gemstones" as const,
        imageUrl: "/api/placeholder/300/300",
        inStock: true,
      },
      {
        _id: "sample3" as any,
        name: "Rider-Waite Tarot Deck",
        description: "Classic tarot deck for divination and self-discovery",
        price: 24.99,
        category: "tarot" as const,
        imageUrl: "/api/placeholder/300/300",
        inStock: true,
      },
    ];
  },
});
