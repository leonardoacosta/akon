import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const availabilityCreate = z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),


    roomID: z.string(),
    vendorHallID: z.string(),
})

const availabilityUpdate = z.object({
    id: z.string(),
    availability: availabilityCreate,
})

export const availabilityRouter = router({
    all: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.availability.findMany();
    }),
    byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.availability.findFirst({ where: { id: input } });
    }),
    create: protectedProcedure
        .input(availabilityCreate)
        .mutation(({ ctx, input }) => {
            return ctx.prisma.availability.create({ data: input });
        }),
    update: protectedProcedure
        .input(availabilityUpdate)
        .mutation(({ ctx, input }) => ctx.prisma.availability.update({ where: { id: input.id }, data: input.availability })),
});

