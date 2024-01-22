import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(req: Request) {
  const user = await currentUser();
  console.log(user);
  return NextResponse.json(user);
}
