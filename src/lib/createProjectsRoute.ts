import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// Creates a standard GET handler for any project collection.
// Pass in the Mongoose model and the seed data array — the rest is identical
// across completed, ongoing, and upcoming routes.
export function createProjectsRouteHandler(
  model: mongoose.Model<any>,
  seedData: any[]
) {
  return async function GET() {
    try {
      await connectDB();

      const count = await model.countDocuments();

      if (count === 0) {
        await model.insertMany(seedData as any[]);
      }

      const projects = await model.find().sort({ id: 1 });

      return NextResponse.json({ success: true, data: projects });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return NextResponse.json({ success: false, message }, { status: 500 });
    }
  };
}