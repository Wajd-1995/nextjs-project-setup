const { PrismaClient: PrismaClientCheck, Role: RoleCheck } = require('@prisma/client');

const prismaCheck = new PrismaClientCheck();

async function main() {
  const adminUser = await prismaCheck.user.findUnique({
    where: { email: "admin123@gmail.com" }
  });
  console.log("Admin user:", adminUser);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaCheck.$disconnect();
  });
