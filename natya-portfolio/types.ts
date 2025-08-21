
export interface ProjectDetail {
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  problem: string;
  outcome: string;
  gallery: string[];
  process: { step: string; note: string }[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  impact: string;
  cover: string;
  detail: ProjectDetail;
}