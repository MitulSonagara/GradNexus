import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const JobPostingInput = z.object({
    jobTitle: z.string().trim(),
    companyName: z.string().trim(),
    location: z.string().trim(),
    description: z.string().trim(),
    salaryRange: z.string().trim(),
    jobType: z.string().trim(),
})

export const JobPostingUpdateInput = z.object({
    jobId: z.string().trim(),
    jobTitle: z.string().trim(),
    companyName: z.string().trim(),
    location: z.string().trim(),
    description: z.string().trim(),
    salaryRange: z.string().trim(),
    jobType: z.string().trim(),
})

export const JobPostingSingleInput = z.object({
    jobId: z.string().trim(),
})


export const jobPostingController = router({
    getJobPostingsForUser: protectedProcedure
        .query(async ({ ctx }) => {
            const jobPostings = await db.job_postings
                .where({
                    postedBy: ctx.user?.user.id,
                })
                .select()
            return jobPostings;
        }),
    getJobPosting: protectedProcedure
        .input(JobPostingSingleInput)
        .query(async ({ input }) => {
            const jobPosting = await db.job_postings
                .where({
                    jobId: input.jobId,
                })
            return jobPosting[0];
        }),
    createJobPosting: protectedProcedure
        .input(JobPostingInput)
        .query(async ({ input, ctx }) => {
            const jobPosting = await db.job_postings
                .create({
                    postedBy: ctx.user?.user.id!,
                    jobTitle: input.jobTitle,
                    companyName: input.companyName,
                    location: input.location,
                    description: input.description,
                    salaryRange: input.salaryRange,
                    jobType: input.jobType,
                    createdAt: new Date(),
                }
            );
            return jobPosting;
        }),
    updateJobPosting: protectedProcedure
        .input(JobPostingUpdateInput)
        .query(async ({ input }) => {
            const jobPosting = await db.job_postings
                .where({
                    jobId: input.jobId,
                })
                .update({
                    jobTitle: input.jobTitle,
                    companyName: input.companyName,
                    location: input.location,
                    description: input.description,
                    salaryRange: input.salaryRange,
                    jobType: input.jobType,
                }
            );
            return jobPosting;
        }),
    deleteJobPosting: protectedProcedure
        .input(JobPostingSingleInput)
        .query(async ({ input }) => {
            const jobPosting = await db.job_postings
                .where({
                    jobId: input.jobId,
                })
                .delete()
            return jobPosting;
        }),

    getAllJobs: protectedProcedure.query(async () => {
        const jobs = await db.job_postings.selectAll();
        return jobs;
    }),
})