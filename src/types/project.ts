export interface FloorPlan {
  type: string;
  image: string;
  area: string;
}

export interface BaseProject {
  id: number;
  name: string;
  image: string;
  location: string;
  type: string;
  description: string;
  rera: string;
  amenities: string[];
  technologies: string[];
  gallery: string[];
  floorPlans: FloorPlan[];
}

export interface CompletedProject extends BaseProject {
  completionDate: string;
  year: string;
  units: string;
}

export interface OngoingProject extends BaseProject {
  possession: string;
  total: number;
  sold: number;
  progress: number;
}

export interface UpcomingProject extends BaseProject {
  launch: string;
}