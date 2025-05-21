import { postRouter } from "~/server/api/routers/post";
<<<<<<< HEAD
import { professorRouter } from "~/server/api/routers/professor";
=======
import { adminRouter } from "~/server/api/routers/admin";
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
<<<<<<< HEAD
  professor: professorRouter,
=======
  admin: adminRouter,
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
