/** Shared status display configuration for the projects feature */

export const statusConfig = {
  active: {
    label: "Active",
    badge: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  completed: {
    label: "Done",
    badge: "text-blue-600 bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-500",
  },
  draft: {
    label: "Draft",
    badge: "text-amber-600 bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-500",
  },
  archived: {
    label: "Archived",
    badge: "text-muted-foreground bg-muted border-border",
    dot: "bg-muted-foreground",
  },
};

export const statusLabels = ["draft", "active", "completed", "archived"];

export const formatDate = (date) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
