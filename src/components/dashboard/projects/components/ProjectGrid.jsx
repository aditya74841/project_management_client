"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  MoreVertical,
  Users,
  Clock,
  Layers,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  active: {
    gradient: "from-emerald-400 to-cyan-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  completed: {
    gradient: "from-blue-500 to-indigo-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  draft: {
    gradient: "from-amber-400 to-orange-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  archived: {
    gradient: "from-slate-400 to-slate-600",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },
};

const statusLabels = ["draft", "active", "completed", "archived"];

/* ─── Avatar Initial ─── */
const MemberInitial = ({ name, index }) => {
  const colors = [
    "bg-indigo-100 text-indigo-700",
    "bg-rose-100 text-rose-700",
    "bg-cyan-100 text-cyan-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
  ];
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <div
      title={name}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold transition-all hover:scale-110 hover:ring-2 hover:ring-indigo-200 ${colors[index % colors.length]}`}
    >
      {initials}
    </div>
  );
};

/* ─── Date formatter ─── */
const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/* ═══════════════════════════════════════════════════
   CARD VIEW
   ═══════════════════════════════════════════════════ */
const ProjectCard = ({ project, onEdit, onDelete, onToggle, onChangeStatus }) => {
  const router = useRouter();
  const initials = project.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const cfg = statusConfig[project.status] || statusConfig.active;
  const memberCount = project.members?.length || 0;
  const featureCount = project.features?.length || 0;

  return (
    <div
      className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Top Section */}
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cfg.gradient} text-xl font-bold text-white shadow-lg shadow-black/5`}
          >
            {initials}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-lg hover:bg-slate-100"
              >
                <MoreVertical size={20} className="text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 rounded-xl p-2"
            >
              <DropdownMenuItem
                onClick={() => onEdit(project)}
                className="rounded-xl p-3"
              >
                <Edit3 className="mr-3 h-4 w-4" /> Edit Details
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onToggle(project._id)}
                className="rounded-xl p-3"
              >
                {project.isShown ? (
                  <EyeOff className="mr-3 h-4 w-4" />
                ) : (
                  <Eye className="mr-3 h-4 w-4" />
                )}
                {project.isShown ? "Hide Project" : "Show Project"}
              </DropdownMenuItem>

              {/* Status Sub-menu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-xl p-3">
                  <Activity className="mr-3 h-4 w-4" /> Change Status
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="rounded-xl p-1">
                  {statusLabels.map((s) => (
                    <DropdownMenuItem
                      key={s}
                      onClick={() => onChangeStatus(project._id, s)}
                      className={`rounded-lg p-2 capitalize ${project.status === s ? "font-bold text-cyan-700" : ""
                        }`}
                    >
                      <div className={`mr-2 h-2 w-2 rounded-full ${statusConfig[s].dot}`} />
                      {s}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(project._id)}
                className="rounded-xl p-3 text-red-600 focus:bg-red-50 focus:text-red-700"
              >
                <Trash2 className="mr-3 h-4 w-4" /> Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${cfg.badge}`}
            >
              <div className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {project.status}
            </span>
            {project.isShown && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                <Eye size={10} /> visible
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-800">
            {project.name}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
            {project.description || "No description added yet."}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
        <div className="mt-6 space-y-5">
        {/* Meta info */}
        <div className="flex items-center gap-5 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Users size={13} /> {memberCount} member{memberCount !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Layers size={13} /> {featureCount} feature{featureCount !== 1 ? "s" : ""}
          </span>
          {project.deadline && (
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {formatDate(project.deadline)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* Member Avatars */}
          <div className="flex -space-x-3 overflow-hidden">
            {(project.members || []).slice(0, 4).map((member, i) => {
              const memberName =
                typeof member === "object"
                  ? member.name || member.userId?.name || "User"
                  : "User";
              return <MemberInitial key={i} name={memberName} index={i} />;
            })}
            {memberCount > 4 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-50 text-[10px] font-bold text-slate-400">
                +{memberCount - 4}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.push(`/dashboard/features?projectId=${project._id}&addNew=true`)}
              className="h-10 rounded-lg border border-cyan-200 bg-cyan-50 px-4 text-xs font-semibold text-cyan-700 hover:bg-cyan-100"
            >
              Add Feature
            </Button>
            <Button
              onClick={() => router.push(`/dashboard/project-diary/${project._id}`)}
              className="h-10 rounded-lg bg-cyan-600 px-4 text-xs font-semibold text-white hover:bg-cyan-700"
            >
              Manage Diary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   LIST VIEW
   ═══════════════════════════════════════════════════ */
const ProjectListRow = ({ project, onEdit, onDelete, onToggle, onChangeStatus }) => {
  const router = useRouter();
  const initials = project.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const cfg = statusConfig[project.status] || statusConfig.active;
  const memberCount = project.members?.length || 0;

  return (
    <div className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-5">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cfg.gradient} text-sm font-bold text-white`}
        >
          {initials}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{project.name}</h4>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${cfg.badge}`}
            >
              <div className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {project.status}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} /> {memberCount}
            </span>
            {project.deadline && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {formatDate(project.deadline)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-slate-100"
            >
              <MoreVertical size={18} className="text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5 shadow-xl">
            <DropdownMenuItem onClick={() => onEdit(project)} className="rounded-lg p-2.5">
              <Edit3 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggle(project._id)} className="rounded-lg p-2.5">
              {project.isShown ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {project.isShown ? "Hide" : "Show"}
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded-lg p-2.5">
                <Activity className="mr-2 h-4 w-4" /> Status
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="rounded-xl p-1">
                {statusLabels.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => onChangeStatus(project._id, s)}
                  className={`rounded-lg p-2 capitalize ${project.status === s ? "font-bold text-cyan-700" : ""
                    }`}
                  >
                    <div className={`mr-2 h-2 w-2 rounded-full ${statusConfig[s].dot}`} />
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(project._id)}
              className="rounded-lg p-2.5 text-red-600 focus:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/dashboard/projects/${project._id}`)}
          className="rounded-full text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN GRID COMPONENT
   ═══════════════════════════════════════════════════ */
const ProjectGrid = ({ projects, viewType, onEdit, onDelete, onToggle, onChangeStatus }) => {
  if (viewType === "list") {
    return (
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectListRow
            key={project._id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
            onChangeStatus={onChangeStatus}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
