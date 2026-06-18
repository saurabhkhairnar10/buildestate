import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { DEFAULT_CONTACT } from "@/lib/contactDefaults";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    await connectDB();
    let contact = await Contact.findOne();

    // First-time setup: seed the database with the shared defaults.
    if (!contact) {
      contact = await Contact.create(DEFAULT_CONTACT);
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const contact = await Contact.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}