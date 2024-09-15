import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const ProjectSingleInput = z.object({
    projectId: z.string().trim(),
});

export const ProjectInput = z.object({
    projectName: z.string().trim(),
    description: z.string().trim(),
    targetAmount: z.number(),
    amountRaised: z.number(),
    startDate: z.string().trim(),
    endDate: z.string().trim(),
    projectType: z.enum(['Scholarship', 'Research', 'Infrastructure']),
});

export const ProjectUpdateInput = z.object({
    projectId: z.string().trim(),
    projectName: z.string().trim(),
    description: z.string().trim(),
    targetAmount: z.number(),
    amountRaised: z.number(),
    startDate: z.string().trim(),
    endDate: z.string().trim(),
    projectType: z.enum(['Scholarship', 'Research', 'Infrastructure']),
    alumniDonors: z.array(z.string().trim()),
})

export const projectController = router({
    getProjects: protectedProcedure
        .query(async ({  }) => {
            const projects = await db.projects
                .select()
            return projects;
        }),
    getProject: protectedProcedure
        .input(ProjectSingleInput)
        .query(async ({ input }) => {
            const project = await db.projects
                .where({
                    projectId: input.projectId,
                })
            return project[0];
        }),
    createProject: protectedProcedure
        .input(ProjectInput)
        .query(async ({ input, ctx }) => {
            const project = await db.projects
                .create({
                    projectName: input.projectName,
                    description: input.description,
                    targetAmount: input.targetAmount,
                    amountRaised: 0,
                    startDate: new Date(input.startDate),
                    endDate: new Date(input.endDate),
                    projectType: input.projectType,
                    createdBy: ctx.user?.user.id!,
                    alumniDonors: [],
                });
            return project;
        }),
    updateProject: protectedProcedure
        .input(ProjectUpdateInput)
        .query(async ({ input, ctx }) => {
            const project = await db.projects
                .where({
                    projectId: input.projectId,
                })
                .update({
                    projectName: input.projectName,
                    description: input.description,
                    targetAmount: input.targetAmount,
                    startDate: new Date(input.startDate),
                    endDate: new Date(input.endDate),
                    projectType: input.projectType,
                    createdBy: ctx.user?.user.id!,
                    alumniDonors: input.alumniDonors,
                });
            return project;
        }),
    deleteProject: protectedProcedure
        .input(ProjectSingleInput)
        .query(async ({ input }) => {
            const project = await db.projects
                .where({
                    projectId: input.projectId,
                })
                .delete()
            return project;
        }),
})