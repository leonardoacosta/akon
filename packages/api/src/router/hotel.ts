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
  all: publicProcedure
    .query(({ ctx }) => ctx.prisma.hotel.findMany()),
  byId: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => ctx.prisma.hotel.findFirst({
      where: { id: input }, include: {
        rooms: {
          include: {
            availability: true,
          }
        },
      }
    })),
  create: protectedProcedure
    .input(hotelCreate)
    .mutation(({ ctx, input }) => ctx.prisma.hotel.create({ data: input })),
  update: protectedProcedure
    .input(hotelUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.hotel.update({ where: { id: input.id }, data: input.hotel })),
});

