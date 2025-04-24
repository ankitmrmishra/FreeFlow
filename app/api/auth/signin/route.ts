import {
  emailOrUsername,
  generateacesstoken,
  Payload,
} from "@/db/helper/helper";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const { username_OR_Email, password } = await req.json();
    const user = await emailOrUsername(username_OR_Email);
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 200 }
      );
    }

    if (user.isemailverifed === false) {
      return NextResponse.json(
        {
          message: "Please verify your email",
        },
        { status: 401 }
      );
    }

    const passwordcheck = await bcrypt.compare(password, user.password);
    if (!passwordcheck) {
      return NextResponse.json(
        {
          message: "Please check your credentials",
        },
        { status: 401 }
      );
    }

    const payload: Payload = {
      id: user.id,
      email: user.email,
      username: user.userName,
      createdTime: user.createdAt,
    };

    const accessToken = generateacesstoken(payload);
    const refreshToken = generateacesstoken(payload);
    await prisma.session.create({
      data: {
        refreshToken: refreshToken,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        accessToken,
      },
      {
        headers: {
          "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=30d`,
        },
      }
    );
  } catch (error) {
    console.error("Error Creating user:", error);
    return NextResponse.json(
      {
        message: "Failed to login, please try again",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
