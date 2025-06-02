import prisma from "@/db/prisma";

export async function GET() {
  const user = await prisma.user.findUnique({
    where: {},
  });
}
