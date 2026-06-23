import { createProjectsRouteHandler } from "@/lib/createProjectsRoute";
import { ongoingProjects } from "@/lib/ongoingProjectsData";
import OngoingProject from "@/models/OngoingProject";

export const GET = createProjectsRouteHandler(OngoingProject, ongoingProjects);