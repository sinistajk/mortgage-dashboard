import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

globalForPrisma.prisma = prisma;

export default prisma;