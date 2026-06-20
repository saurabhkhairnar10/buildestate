import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ongoingProjects } from "@/lib/ongoingProjectsData";
import OngoingProject from "@/models/OngoingProject";

export async function GET() {
  try {
    await connectDB();

    const count = await OngoingProject.countDocuments();
    // First-time setup: seed the database with the shared defaults.
    if (count === 0) {
      await OngoingProject.insertMany(ongoingProjects as any[]);
    }

    const projects = await OngoingProject.find().sort({ id: 1 });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}