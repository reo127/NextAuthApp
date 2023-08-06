// Notice from where NextResponse is imported:
import { NextRequest, NextResponse } from "next/server";

// Notice the function definition:
export async function GET(request: NextRequest) {
  // ...
  return NextResponse.json({ message: "Hello World" });
}