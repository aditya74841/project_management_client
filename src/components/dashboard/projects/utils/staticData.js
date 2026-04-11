export const staticProjects = [
  {
    _id: "static-1",
    name: "Nova AI Platform",
    description: "Enterprise-grade machine learning orchestration platform for automated data pipeline management and model monitoring in real-time environments.",
    status: "active",
    tags: ["machine-learning", "enterprise", "data-pipeline"],
    techStack: ["Python", "TensorFlow", "Kubernetes"],
    members: [
      { id: "u1", name: "Alex Chen", avatar: "https://i.pravatar.cc/150?u=u1" },
      { id: "u2", name: "Sarah Miller", avatar: "https://i.pravatar.cc/150?u=u2" },
      { id: "u3", name: "Hassan Ray", avatar: "https://i.pravatar.cc/150?u=u3" }
    ],
    deadline: "2026-06-15T00:00:00.000Z",
  },
  {
    _id: "static-2",
    name: "E-Commerce Redesign",
    description: "Complete visual and UX overhaul of the main customer facing mobile application with a focus on quick-checkout and personalized product discovery.",
    status: "active",
    tags: ["ux", "mobile", "e-commerce"],
    techStack: ["React Native", "Node.js", "Stripe"],
    members: [
      { id: "u4", name: "Liu Wei", avatar: "https://i.pravatar.cc/150?u=u4" },
      { id: "u2", name: "Sarah Miller", avatar: "https://i.pravatar.cc/150?u=u2" }
    ],
    deadline: "2026-08-01T00:00:00.000Z",
  },
  {
    _id: "static-3",
    name: "FinTech Mobile App",
    description: "Building the core banking infrastructure for a new digital-first financial service providing global currency exchange and wealth management.",
    status: "completed",
    tags: ["fintech", "banking", "mobile"],
    techStack: ["React", "Go", "PostgreSQL"],
    members: [
      { id: "u5", name: "James Bond", avatar: "https://i.pravatar.cc/150?u=u5" },
      { id: "u6", name: "Emma Watson", avatar: "https://i.pravatar.cc/150?u=u6" },
      { id: "u7", name: "Chris Evans", avatar: "https://i.pravatar.cc/150?u=u7" }
    ],
    deadline: "2026-03-20T00:00:00.000Z",
  },
  {
    _id: "static-4",
    name: "Cloud Dashboard 2.0",
    description: "Next generation cloud monitoring tools with predictive scaling recommendations and multi-cloud cost optimization dashboards.",
    status: "draft",
    tags: ["infrastructure", "monitoring", "cloud"],
    techStack: ["Vue.js", "AWS", "Terraform"],
    members: [
      { id: "u8", name: "Robert Downey", avatar: "https://i.pravatar.cc/150?u=u8" }
    ],
    deadline: "2026-12-10T00:00:00.000Z",
  }
];

export const dashboardStats = {
  totalProjects: 4,
  activeProjects: 2,
  completedProjects: 1,
  draftProjects: 1,
};
