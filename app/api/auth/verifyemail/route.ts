import { NextResponse } from "next/server";

export async function POST() {
  try {
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
