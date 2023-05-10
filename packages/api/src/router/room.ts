import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const roomCreate = z.object({
  name: z.string(),
  description: z.string(),
  capacity: z.number(),
  hotelId: z.string(),
})

const roomUpdate = z.object({
  id: z.string(),
  room: roomCreate,
})

export const roomRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.room.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.room.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(roomCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.room.create({ data: input });
    }),
  update: protectedProcedure
    .input(roomUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.room.update({ where: { id: input.id }, data: input.room })),
});

