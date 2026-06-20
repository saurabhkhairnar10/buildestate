import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UpcomingProject from "@/models/UpcomingProject";
import { upcomingProjects } from "@/lib/upcomingProjectsData";

export async function  GET() {
  try{
   await connectDB();
   const count = await UpcomingProject.countDocuments();
       // First-time setup: seed the database with the shared defaults.
       if (count === 0) {
         await UpcomingProject.insertMany(upcomingProjects as any[]);
       }

    const projects = await UpcomingProject.find().sort({id:1});   
    return NextResponse.json({success:true,data:projects});
  }catch(error){
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
