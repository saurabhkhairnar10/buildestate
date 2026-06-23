import { createProjectsRouteHandler } from "@/lib/createProjectsRoute";
import { DEFAULT_COMPLETED_PROJECTS } from "@/lib/completedProjectsData";
import CompletedProject from "@/models/CompletedProject";

export const GET = createProjectsRouteHandler(CompletedProject, DEFAULT_COMPLETED_PROJECTS);