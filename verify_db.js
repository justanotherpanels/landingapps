import 'dotenv/config';
import { prisma } from './lib/prisma.js';

async function main() {
  try {
    const userCount = await prisma.user.count();
    console.log('SUCCESS: Connection established. User count:', userCount);
  } catch (err) {
    console.error('FAILED: Connection error:', err.message);
    if (err.stack) console.error(err.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main();
