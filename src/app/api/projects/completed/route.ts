
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { DEFAULT_COMPLETED_PROJECTS } from "@/lib/completedProjectsData"
import CompletedProject from "@/models/CompletedProject";

export async function GET() {
  try {
    await connectDB();

    const count = await CompletedProject.countDocuments();

    // First-time setup: seed the database with the shared defaults.
    if (count === 0) {
      await CompletedProject.insertMany(DEFAULT_COMPLETED_PROJECTS);
    }

    const projects = await CompletedProject.find().sort({ id: 1 });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}