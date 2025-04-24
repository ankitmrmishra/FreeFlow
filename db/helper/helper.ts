import prisma from "@/db/prisma";
import jwt from "jsonwebtoken";

export async function checkuserexist(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return !!user;
}

export async function checkusernameexist(username: string) {
  const user = await prisma.user.findUnique({
    where: { userName: username },
  });

  return !!user;
}

/**
 * @description this function here is helping me to remove all the spaces mostly written to use in usernames and emails
 * @param inputString
 * @returns a string with removed spaces
 * @example
 * ```typescript
 * const originalString = "Hello World!";
 * const newString = removeAllSpaces(originalString);
 * console.log(newString); // Output: HelloWorld!
 * ```
 */
export function removeAllSpaces(inputString: string): string {
  return inputString.replace(/ /g, "");
}

export async function emailOrUsername(inputString: string) {
  if (!inputString) {
    throw new Error("Input string is required");
  }
  const isEmail = inputString.includes("@") && inputString.includes(".");

  const user = await prisma.user.findUnique({
    where: isEmail
      ? { email: inputString.toLowerCase() }
      : { userName: inputString.toLowerCase() },
  });

  return user;
}

export interface Payload {
  id: number;
  email: string;
  username: string;
  createdTime: Date;
}

const secret = process.env.JWT_SECRET;
export function generateacesstoken(payload: Payload): string {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
}

export function generaterefreshtoken(payload: Payload): string {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, secret, {
    expiresIn: "30d",
  });
}
