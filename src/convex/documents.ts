import { v } from "convex/values";
import { mutation, query } from "@/convex/_generated/server";
import { Doc, Id } from "@/convex/_generated/dataModel";

export const getSidebar = query({
  args: {
    parentId: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    const documents = ctx.db
      .query("documents")
      .withIndex(
        "by_user_parent",
        (q) => q
          .eq("userId", userId)
          .eq("parentId", args.parentId)
      )
      .filter((q) => q.
        eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect();

    return documents;
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    parentId: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentId: args.parentId,
      userId,
      isArchived: false,
      isPublished: false
    });

    return document;
  }
});