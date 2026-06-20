import { createProjectModel } from "./BaseProjectSchema";

// Extra fields beyond BaseProject, matching the OngoingProject interface.
const OngoingProject = createProjectModel(
  "OngoingProject",
  {
    possession: { type: String, required: true },
    total: { type: Number, required: true },
    sold: { type: Number, required: true },
    progress: { type: Number, required: true },
  },
  "ongoingprojects" // explicit collection name in the buildestate database
);

export default OngoingProject;