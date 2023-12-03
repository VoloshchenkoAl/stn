import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  const password = await argon.hash(process.env.SEED_USER_PASSWORD ?? '', {
    secret: Buffer.from(process.env.AUTH_SECRET ?? ''),
  });

  const user = await prisma.user.upsert({
    where: { email: process.env.SEED_USER_EMAIL },
    update: {},
    create: {
      name: 'John Doe',
      email: process.env.SEED_USER_EMAIL,
      password,
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
