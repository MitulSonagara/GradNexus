import z from "zod";
import { protectedProcedure, router } from "../context.trpc";
import { db } from "../db/db.config";

export const ProfileInput = z.object({
  email: z.string().trim().email(),
  name: z.string().trim(),
  department: z.string().trim().nullable(),
  linkedinProfile: z.string().trim().nullable(),
  graduationYear: z.string().nullable(),
  currentLocation: z.string().trim().nullable(),
  mobileNumber: z.string().trim().nullable(),
  profilePicture: z.string().nullable(),
  currCompany: z.string().trim().nullable(),
  currRole: z.string().trim().nullable(),
  collegeId: z.string().trim().nullable(),
});

export const profileController = router({
  updateProfile: protectedProcedure
    .input(ProfileInput)
    .query(async ({ input, ctx }) => {
      console.info(input);
      const profile = await db.user
        .where({
          id: ctx.user?.user.id,
        })
        .update({
          email: input.email,
          name: input.name ?? "",
          department: input.department,
          linkedinProfile: input.linkedinProfile,
          graduationYear: Number(input.graduationYear),
          currentLocation: input.currentLocation,
          mobileNumber: input.mobileNumber,
          profilePicture: input.profilePicture,
          currCompany: input.currCompany,
          currRole: input.currRole,
          collegeId: input.collegeId,
        });
        return profile;
    }),
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await db.user.where({
      id: ctx.user?.user.id,
    });
    return profile[0];
  }),
  getAllProfiles: protectedProcedure.query(async ({}) => {
    const profiles = await db.user.selectAll();
    return profiles;
  }),
});
