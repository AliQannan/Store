/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Clerk event data
    const { id, email_addresses, first_name, last_name } = payload.data;

    // إدخال المستخدم في Supabase عبر Prisma
    await prisma.user.create({
      data: {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
    });

    return NextResponse.json({ message: "User saved to Supabase ✅" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

