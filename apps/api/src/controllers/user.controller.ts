import { protectedProcedure, publicProcedure, router } from "../context.trpc";

export const userController = router({
  getAll: protectedProcedure.query(() => {
    return {
      name: "All",
    };
  }),
  me: protectedProcedure.query(() => {
    return {
      name: "Me",
    };
  }),
  create: publicProcedure.mutation(({ input, ctx: { req } }) => {
    req.server.log.debug({ input });
  }),
});
