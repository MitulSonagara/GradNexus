import { inferRouterOutputs } from "@trpc/server";
import { protectedProcedure, router } from "./context.trpc";
import { authApi } from "./auth/auth-api";
import { CloudinaryImageController } from "./controllers/cloudinaryImage.controller";
import { profileController } from "./controllers/profile.controller";
import { jobPostingController } from "./controllers/jobPosting.controller";
import { jobApplicationController } from "./controllers/jobApplication.controller";
import { donationsController } from "./controllers/donations.controller";
import { eventController } from "./controllers/event.controller";
import { jobController } from "./controllers/job.controller";
import { networkingHubController } from "./controllers/networkingHub.controller";
import { projectController } from "./controllers/project.controller";
import { successStoriesController } from "./controllers/successStories.controller";

export const trpcRouter = router({
  auth: authApi,
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    return user?.user;
  }),
  addImage: CloudinaryImageController.uploadImage,
  profile: profileController,
  jobPosting: jobPostingController,
  jobApplication: jobApplicationController,
  donation: donationsController,
  event: eventController,
  networking: networkingHubController,
  project: projectController,
  successStories: successStoriesController,

  profileUpdate: profileController.updateProfile,
  getProfile: profileController.getProfile,
  getAllProfiles: profileController.getAllProfiles,
  createEvent: eventController.createEvent,
  getEventById: eventController.getEventById,
  getAllJobs: jobController.getAllJobs,
  createJob: jobController.createJob,
  createSucessStory: successStoriesController.createSuccessStory,
  getSuccessStoryById : successStoriesController.getSuccessStory,
  getAllSuccessStories: successStoriesController.getSuccessStories
});

export type ApiRouter = typeof trpcRouter;
export type RouterOutputs = inferRouterOutputs<ApiRouter>;
