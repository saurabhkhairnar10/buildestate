import mongoose from "mongoose";

// Reusable sub-schema for floor plans — _id suppressed since these are
// embedded sub-documents, not independently queryable collections.
export const floorPlanSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String, required: true },
    image3D: { type: String },
  },
  { _id: false }
);

// Fields shared by CompletedProject, OngoingProject, and UpcomingProject,
// matching the BaseProject interface in types/project.ts.
export const baseProjectFields = {
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  rera: { type: String, required: true },
  amenities: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  gallery: { type: [String], default: [] },
  floorPlans: { type: [floorPlanSchema], default: [] },
};

// Factory that creates and caches a Mongoose model with a given name,
// extra schema fields, and an explicit collection name.
// The mongoose.models check prevents "model already compiled" errors
// during Next.js hot reloads.
export function createProjectModel(
  modelName: string,
  extraFields: Record<string, unknown>,
  collectionName: string
) {
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }

  const schema = new mongoose.Schema(
    { ...baseProjectFields, ...extraFields },
    { timestamps: true }
  );

  return mongoose.model(modelName, schema, collectionName);
}