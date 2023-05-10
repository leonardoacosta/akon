import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const vendorHallCreate = z.object({
  name: z.string(),
  description: z.string(),
  totalSlots: z.number(),
})

const vendorHallUpdate = z.object({
  id: z.string(),
  vendorHall: vendorHallCreate,
})

export const vendorHallRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vendorHall.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.vendorHall.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(vendorHallCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.vendorHall.create({ data: input });
    }),
  update: protectedProcedure
    .input(vendorHallUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.vendorHall.update({ where: { id: input.id }, data: input.vendorHall })),
});

