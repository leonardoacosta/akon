import { router } from "../trpc";
import { availabilityRouter } from "./availability";
import { groupRouter } from "./group";

export const appRouter = router({
  Availability: availabilityRouter,
  group: groupRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
