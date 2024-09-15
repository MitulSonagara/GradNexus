import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const SuccessStorySingleInput = z.object({
    storyId: z.string().trim(),
});

export const SuccessStoryInput = z.object({
    storyTitle: z.string().trim(),
    storyContent: z.string().trim()
})

export const SuccessStoryUpdateInput = z.object({
    storyId: z.string().trim(),
    storyTitle: z.string().trim(),
    storyContent: z.string().trim()
})

export const successStoriesController = router({
    getSuccessStories: protectedProcedure
        .query(async () => {
            const successStories = await db.success_stories
                .select('alumniId','storyContent','storyTitle','postedAt','storyId')
            return successStories;
        }),

    getSuccessStory: protectedProcedure
        .input(SuccessStorySingleInput)
        .query(async ({ input }) => {
            const successStory = await db.success_stories
                .where({
                    storyId: input.storyId,
                })
            return successStory[0];
        }),
    createSuccessStory: protectedProcedure
        .input(SuccessStoryInput)
        .query(async ({ input, ctx }) => {
            const successStory = await db.success_stories
                .create({
                    alumniId: ctx.user?.user.id!,
                    storyTitle: input.storyTitle,
                    storyContent: input.storyContent,
                    postedAt: new Date(),
                })
            return successStory;
        }),
    updateSuccessStory: protectedProcedure
        .input(SuccessStoryUpdateInput)
        .query(async ({ input }) => {
            const successStory = await db.success_stories
                .where({
                    storyId: input.storyId,
                })
                .update({
                    storyTitle: input.storyTitle,
                    storyContent: input.storyContent,
                })
            return successStory;
        }),
    deleteSuccessStory: protectedProcedure
        .input(SuccessStorySingleInput)
        .query(async ({ input }) => {
            const successStory = await db.success_stories
                .where({
                    storyId: input.storyId,
                })
                .delete()
            return successStory;
        }),
})