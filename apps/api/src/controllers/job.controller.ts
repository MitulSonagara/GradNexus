import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

const jobCreationInput = z.object({
  title: z.string().trim(),
  company: z.string().trim(),
  location: z.string().trim(),
  description: z.string().trim(),
  salaryRange: z.string().trim(),
  jobType: z.string().trim(),
});

export const jobController = router({
  createJob: protectedProcedure
    .input(jobCreationInput)
    .query(async ({ input, ctx }) => {
      console.info(input);
      console.info(ctx.user?.user.id);

      const job = await db.job_postings.create({
        jobTitle: input.title,
        companyName: input.company,
        description: input.description,
        jobType: input.jobType,
        location: input.location,
        salaryRange: input.salaryRange,
        postedBy: ctx.user?.user.id!,
        createdAt: new Date(),
      });
      console.info(job);
      return job;
    }),

  getAllJobs: protectedProcedure.query(async () => {
    const jobs = await db.job_postings.selectAll();
    return jobs;
  }),
});
