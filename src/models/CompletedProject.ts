import { createProjectModel } from "./BaseProjectSchema";

// Extra fields beyond BaseProject, matching the CompletedProject interface.
const CompletedProject = createProjectModel(
  "CompletedProject",
  {
    completionDate: { type: String, required: true },
    year: { type: String, required: true },
    units: { type: String, required: true },
  },
  "completedprojects" // explicit collection name in the buildestate database
);

export default CompletedProject;