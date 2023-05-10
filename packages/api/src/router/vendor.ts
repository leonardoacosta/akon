import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const vendorCreate = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string(),
  slotNumber: z.number(),
  artist: z.boolean().default(false),
})

const vendorUpdate = z.object({
  id: z.string(),
  vendor: vendorCreate,
})

export const vendorRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vendor.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.vendor.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(vendorCreate)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.vendor.create({ data: input });
    }),
  update: protectedProcedure
    .input(vendorUpdate)
    .mutation(({ ctx, input }) => ctx.prisma.vendor.update({ where: { id: input.id }, data: input.vendor })),
});

