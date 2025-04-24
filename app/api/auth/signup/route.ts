import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  checkuserexist,
  checkusernameexist,
  removeAllSpaces,
} from "@/db/helper/helper";
import prisma from "@/db/prisma";

/**
 * @description this is a route for signing up
 * @param req
 * @param res
 * @returns
 */

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, userName, email, password } = await req.json();

    if (!firstName || !lastName || !userName || !email || !password) {
      return NextResponse.json(
        {
          message: "Every Field is required",
        },
        { status: 500 }
      );
    }

    // here we are checking if user already exist or not

    if (await checkuserexist(email)) {
      return NextResponse.json(
        {
          message: "User Already Exist",
        },
        { status: 500 }
      );
    }

    // here we are checking if the username is already taken or not

    if (await checkusernameexist(userName)) {
      return NextResponse.json(
        {
          message: "Username Already Exist, please try another one",
        },
        { status: 500 }
      );
    }

    //here we are hashing the passoword

    const hashedpassowrd = await bcrypt.hash(password, 12);
    const email_cleaned = removeAllSpaces(email.toLowerCase());
    const username_cleaned = removeAllSpaces(userName.toLowerCase());

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email_cleaned,
        password: hashedpassowrd,
        userName: username_cleaned,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error Creating user:", error);
    return NextResponse.json(
      {
        message: "Failed to create user, please try again",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
