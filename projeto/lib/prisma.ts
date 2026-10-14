import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };

export const prisma = globalPrisma.prisma ?? new PrismaClient({
  log: process.env.PRISMA_LOG_QUERIES === "1" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;
