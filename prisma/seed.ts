const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Remove all old bookings
  console.log("Deleting all bookings...");
  await prisma.booking.deleteMany();
  console.log("Old bookings deleted.");

  // Check if the admin user already exists
  console.log("Checking for default admin account...");
  const adminExists = await prisma.user.findUnique({
    where: { email: "admin" }
  });

  if (!adminExists) {
    console.log("No admin account found. Creating default admin account...");
    const hashedPassword = await bcrypt.hash("admin", 10);

    // Create the admin user with default values
    console.log("Creating admin user with email: admin123@gmail.com");
    await prisma.user.create({
      data: {
        email: "admin123@gmail.com".toLowerCase(),
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log("Default admin account created.");
  } else {
    console.log("Default admin account already exists.");
  }
}

main()
  .catch((error) => {
    console.error("Seeding error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
