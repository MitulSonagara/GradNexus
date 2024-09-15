import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const DonationSingleInput = z.object({
    donationId: z.string().trim(),
})

export const DonationInput = z.object({
    amount: z.number(),
    projectId: z.string().trim(),
    paymentId: z.string().trim(),
    donationType: z.enum(['One-time', 'Recurring']),
    frequency: z.enum(['Monthly', 'Quarterly', 'Yearly']),
    donationDate: z.string().trim(),
}) 

export const DonationUpdateInput = z.object({
    donationId: z.string().trim(),
    projectId: z.string().trim(),
    amount: z.number(),
    donation_type: z.enum(['One-time', 'Recurring']),
    frequency: z.enum(['Monthly', 'Quarterly', 'Yearly']),
})

export const donationsController = router({
    getDonationsForUser: protectedProcedure
        .query(async ({  ctx }) => {
            const donations = await db.donations
                .where({
                    donator: ctx.user?.user.id,
                })
                .select()
            return donations;
        }),
    getDonation: protectedProcedure
        .input(DonationSingleInput)
        .query(async ({ input }) => {
            const donation = await db.donations
                .where({
                    donationId: input.donationId,
                })
            return donation[0];
        }),
        // TODO: update project raised amount
    createDonation: protectedProcedure
        .input(DonationInput)
        .query(async ({ input, ctx }) => {
            const donation = await db.donations
                .create({
                    donator: ctx.user?.user.id!,
                    amount: input.amount,
                    projectId: input.projectId,
                    paymentId: input.paymentId,
                    donationType: input.donationType,
                    frequency: input.frequency,
                    donationDate: input.donationDate,
                    updatedAt: new Date(),
                }
            );
            const project = await db.projects
                .where({
                    projectId: input.projectId,
                })
                .select('amountRaised', 'alumniDonors')
            
            project[0] && db.projects
                .where({
                    projectId: input.projectId,
                })
                .update({
                    amountRaised: project[0].amountRaised + input.amount,
                    alumniDonors: [...project[0].alumniDonors, ctx.user?.user.id!]
                })

            return donation;
        }),
    updateDonation: protectedProcedure
        .input(DonationUpdateInput)
        .query(async ({ input, ctx }) => {
            const donation = await db.donations
                .where({
                    donationId: input.donationId,
                })
                .update({
                    amount: input.amount,
                    donationType: input.donation_type,
                    frequency: input.frequency,
                    updatedAt: new Date(),
                }
            );

            const project = await db.projects
                .where({
                    projectId: input.projectId,
                })
                .select('amountRaised', 'alumniDonors')

            project[0] && db.projects
                .where({
                    projectId: input.projectId,
                })
                .update({
                    amountRaised: project[0].amountRaised + input.amount,
                    alumniDonors: [...project[0].alumniDonors, ctx.user?.user.id!]
                })


            return donation;
        }),
    deleteDonation: protectedProcedure
        .input(DonationSingleInput)
        .query(async ({ input }) => {
            const donation = await db.donations
                .where({
                    donationId: input.donationId,
                })
                .delete()
            return donation;
        }),
})