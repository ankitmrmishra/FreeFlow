import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
export async function GET(req: NextRequest) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const token = queryParams.get("token");
    const email = queryParams.get("email");
    if (!token || !email) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User Not found" }, { status: 400 });
    }

    const TokenexpiryTime = user.verificationTime;
    if (TokenexpiryTime) {
      if (TokenexpiryTime?.getTime() < Date.now()) {
        return NextResponse.json({ error: "Token Expired" }, { status: 400 });
      } else {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            isemailverifed: true,
            verificationToken: null,
            verificationTime: null,
          },
        });

        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Email Verification Failed", details: error },
      { status: 500 }
    );
  }
}
