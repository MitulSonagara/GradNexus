import { protectedProcedure, publicProcedure, router } from "../context.trpc";

export const authApi = router({
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.clearCookie("session");
    return;
  }),
  profile: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    return user;
  }),
});
