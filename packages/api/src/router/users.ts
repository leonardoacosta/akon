import { router, publicProcedure, protectedProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

const departments = z.enum([
    "isAdmin",

    "isGuests",
    "isGuest",

    "isProgramming",
    "isPanelist",

    "isVendors",
    "isVendor",

    "isVolunteers",
    "isVolunteer",

])

const getFilter = z.object({
    id: z.string().optional(),
    department: departments.optional(),
})

const getById = z.string()

const toggleDepartment = z.object({
    id: z.string(),
    department: departments,
})

export const userRouter = router({
    all: protectedProcedure.input(getFilter).query(async ({ ctx, input }) => {
        const users = await clerkClient.users.getUserList();
        if (input.department !== undefined) {
            return users.filter(user => user.publicMetadata[input.department as string])
        }
        console.log(users, input);
        return users;
    }),
    byId: protectedProcedure
        .input(getById)
        .query(({ input }) => clerkClient.users.getUser(input)),
    toggleDepartment: protectedProcedure
        .input(toggleDepartment)
        .mutation(async ({ input }) => {
            const user = await clerkClient.users.getUser(input.id)
            const metadata = user.publicMetadata
            metadata[input.department as string] = !metadata[input.department as string]
            await clerkClient.users.updateUser(input.id, { publicMetadata: metadata })
            return user
        })
});

