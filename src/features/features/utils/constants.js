/**
 * Feature Module Constants (Zen Prism Edition)
 * Standardized registry for phases, priorities, and board configurations.
 */

export const PRIORITY_OPTIONS = [
    { value: "low", label: "Standard Utility", color: "emerald", slug: "standard" },
    { value: "medium", label: "Strategic Priority", color: "amber", slug: "strategic" },
    { value: "high", label: "Critical Milestone", color: "orange", slug: "critical" },
    { value: "urgent", label: "Mission Critical", color: "rose", slug: "urgent" },
];

export const STATUS_OPTIONS = [
    { value: "pending", label: "Registry Pending", color: "slate" },
    { value: "working", label: "Actively Executing", color: "indigo" },
    { value: "blocked", label: "Execution Blocked", color: "rose" },
    { value: "completed", label: "Finalized / Done", color: "emerald" },
];

export const KANBAN_COLUMNS = [
    { id: "pending", title: "Waitlist", color: "bg-slate-50", text: "text-slate-400", border: "border-slate-100", dot: "bg-slate-300" },
    { id: "working", title: "Execution", color: "bg-indigo-50/10", text: "text-indigo-600", border: "border-indigo-100", dot: "bg-indigo-500" },
    { id: "blocked", title: "Blockers", color: "bg-rose-50/10", text: "text-rose-600", border: "border-rose-100", dot: "bg-rose-500" },
    { id: "completed", title: "Production", color: "bg-emerald-50/10", text: "text-emerald-600", border: "border-emerald-100", dot: "bg-emerald-500" },
];
