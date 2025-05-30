import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  checkuserexist,
  checkusernameexist,
  removeAllSpaces,
} from "@/db/helper/helper";
import prisma from "@/db/prisma";
import { Resend } from "resend";
import { VerificationEmailTemplate } from "@/lib/verifyemail/email-template";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/lib/verifyemail/sendemail";

const secret = process.env.JWT_SECRET!;
const resend = new Resend(process.env.RESEND_API);

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

    // this is here we will be adding in the generating the verification token

    const verificationToken = jwt.sign({ userName: userName }, secret, {
      expiresIn: "1h",
    });
    const verifyTokenExpiry = new Date(Date.now() + 1000 * 60 * 15);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email_cleaned,
        password: hashedpassowrd,
        userName: username_cleaned,
        verificationToken: verificationToken,
        verificationTime: verifyTokenExpiry,
      },
    });
    /**
     * here we will now write the logic for sending the email for verification purpose
     */

    await sendVerificationEmail({
      firstName: firstName,
      email: email,
      verifyTokengen: verificationToken,
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
