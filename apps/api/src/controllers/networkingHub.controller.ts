import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const NetworkingHubSingleInput = z.object({
    alumniId1: z.string().trim(),
    alumniId2: z.string().trim()
});

export const NetworkingHubForAlumniInput = z.object({
    alumniId: z.string().trim()
})

export const NetworkCreateInput = z.object({
    alumniId: z.string().trim(),
})

export const NetworkingHubUpdateConnectedInput = NetworkCreateInput
    .extend({
        connectionId: z.string().trim(),
    });

export const NetworkingHubDelete = z.object({
    connectionId: z.string().trim(),
});

export const networkingHubController = router({
    // getNetworkingHubs: protectedProcedure
    //     .query(async ({ input, ctx }) => {
    //         const networkingHubs = await db.networking_hub
    //             .select()
    //         return networkingHubs;
    //     }),
    getNetworkingHub: protectedProcedure
        .input(NetworkingHubSingleInput)
        .query(async ({ input }) => {
            const networkingHub = await db.networking_hub
                .where({
                    alumniId1: input.alumniId1,
                    alumniId2: input.alumniId2,
                })
            return networkingHub[0];
        }),
    createNetworkingHub: protectedProcedure
        .input(NetworkCreateInput)
        .query(async ({ input, ctx }) => {
            const fromAlumni = ctx.user?.user.id! === input.alumniId ? 'Sent' : 'Pending';
            const networkingHub = await db.networking_hub
                .create({
                    alumniId1: input.alumniId,
                    alumniId2: ctx.user?.user.id!,
                    statusFrom1: fromAlumni,
                    statusFrom2: fromAlumni === 'Sent' ? 'Pending' : 'Sent',
                    connectionType: 'Professional'
                });
            return networkingHub;
        }),

    updateNetworkingHub: protectedProcedure
        .input(NetworkingHubUpdateConnectedInput)
        .query(async ({ input }) => {
            const networkingHub = await db.networking_hub
                .where({
                    connectionId: input.connectionId,
                })
                .update({
                    statusFrom1: 'connected',
                    statusFrom2: 'connected',
                });
            return networkingHub;
        }),
    deleteNetworkingHub: protectedProcedure
        .input(NetworkingHubDelete)
        .query(async ({ input }) => {
            const networkingHub = await db.networking_hub
                .where({
                    connectionId: input.connectionId,
                })
                .delete();
            return networkingHub;
        }),
})