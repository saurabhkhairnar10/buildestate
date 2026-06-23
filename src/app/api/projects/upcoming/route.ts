import { createProjectsRouteHandler } from "@/lib/createProjectsRoute";
import { upcomingProjects } from "@/lib/upcomingProjectsData";
import UpcomingProject from "@/models/UpcomingProject";

export const GET = createProjectsRouteHandler(UpcomingProject, upcomingProjects);
