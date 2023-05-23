import { router } from "../trpc";
import { availabilityRouter } from "./availability";
import { eventRouter } from "./event";
import { groupRouter } from "./group";
import { hotelRouter } from "./hotel";
import { memberRouter } from "./member";
import { panelRouter } from "./panel";
import { roomRouter } from "./room";
import { tagRouter } from "./tags";
import { userRouter } from "./users";
import { vendorRouter } from "./vendor";
import { vendorHallRouter } from "./vendorHall";

export const appRouter = router({
  availability: availabilityRouter,
  events: eventRouter,
  groups: groupRouter,
  hotels: hotelRouter,
  members: memberRouter,
  panels: panelRouter,
  room: roomRouter,
  tags: tagRouter,
  vendors: vendorRouter,
  vendorHalls: vendorHallRouter,
  users: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
