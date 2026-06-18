import mongoose from "mongoose";

const floorPlanSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const completedProjectSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    units: { type: String, required: true },
    year: { type: String, required: true },
    completionDate: { type: String, required: true },
    rera: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    amenities: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    floorPlans: { type: [floorPlanSchema], default: [] },
    gallery: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Third argument explicitly sets the collection name to "completedprojects".
const CompletedProject =
  mongoose.models.CompletedProject ||
  mongoose.model("CompletedProject", completedProjectSchema, "completedprojects");

export default CompletedProject;