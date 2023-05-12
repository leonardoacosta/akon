import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const hotelCreate = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  eventId: z.string(),
})

const hotelUpdate = z.object({
  id: z.string(),
  hotel: hotelCreate,
})

export const hotelRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.hotel.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.hotel.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(hotelCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.hotel.create({ data: input });
    }),
  update: protectedProcedure
    .input(hotelUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.hotel.update({ where: { id: input.id }, data: input.hotel })),
});

