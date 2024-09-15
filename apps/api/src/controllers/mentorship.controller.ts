import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const mentorshipController = router({
  getAllMentorships: protectedProcedure.query(async () => {
    const jobs = await db.job_postings.selectAll();
    return jobs;
  }),
});
