export type Cause = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  peopleHelped: number;
  priority: boolean;
  status: "active" | "completed";
  location: string;
  createdAt: string;
};

export type OrgStats = {
  volunteers: number;
  yearsActive: number;
  partnerCommunities: number;
};
