import { createProjectModel } from "./BaseProjectSchema";

// Extra fields beyond BaseProject, matching the UpcomingProject interface.
const UpcomingProject = createProjectModel(
  "UpcomingProject",
  {
    launch: { type: String, required: true },
    teaser: {type: String, required:true}
  },
  "upcomingprojects" // explicit collection name in the buildestate database
);

export default UpcomingProject;