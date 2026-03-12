import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

const getPrisma = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error("DATABASE_URL must be defined");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool as any);

  return new PrismaClient({ adapter: adapter as any });
};

export const prisma = globalForPrisma.prisma ?? getPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
