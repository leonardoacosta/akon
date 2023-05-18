import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const availabilityCreate = z.object({
    startTime: z.string(),
    endTime: z.string(),

    roomId: z.string().nullable(),
    vendorHallId: z.string().nullable(),
})

const availabilityUpdate = z.object({
    id: z.string(),
    availability: availabilityCreate,
})

const getAvailability = z.object({
    roomId: z.string().optional(),
    vendorHallId: z.string().optional(),
})

export const availabilityRouter = router({
    all: publicProcedure.input(getAvailability).query(({ ctx, input }) => {
        return ctx.prisma.availability.findMany({ where: { OR: { roomId: input.roomId, vendorHallId: input.vendorHallId } } });
    }),
    byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.availability.findFirst({ where: { id: input } });
    }),
    create: publicProcedure
        .input(availabilityCreate)
        .mutation(async ({ ctx, input }) => {
            // Check if there is already an availability for this date
            const test = await ctx.prisma.availability.findFirst({ where: { startTime: input.startTime, OR: { roomId: input.roomId, vendorHallId: input.vendorHallId } } });
            if (test) throw new TRPCError({ code: "BAD_REQUEST", message: "Availability already exists for this date" });

            return ctx.prisma.availability.create({ data: input });
        }),
    update: publicProcedure
        .input(availabilityUpdate)
        .mutation(({ ctx, input }) => ctx.prisma.availability.update({ where: { id: input.id }, data: input.availability })),
});

