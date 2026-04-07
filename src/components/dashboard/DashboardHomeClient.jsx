"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  FolderKanban,
  Layers3,
  PlusCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getProjects,
  selectProjects,
  selectProjectLoading,
} from "@/redux/slices/projectSlice";

const quickLinks = [
  {
    title: "Projects",
    description: "Create a project shell fast, then enrich it later.",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Features",
    description: "Move directly into delivery work and feature tracking.",
    href: "/dashboard/features",
    icon: Layers3,
  },
  {
    title: "Team",
    description: "Review users and company access when you need it.",
    href: "/dashboard/users",
    icon: Users,
  },
];

export default function DashboardHomeClient() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const loading = useSelector(selectProjectLoading);
  const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjects());
    }
  }, [dispatch, projects.length]);

  const draftProjects = projects.filter((project) => project.status === "draft");
  const visibleProjects = projects.filter((project) => project.isShown);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.15),_transparent_24%),linear-gradient(135deg,_#0f172a_0%,_#134e4a_44%,_#ecfeff_100%)] p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.15),_transparent_18%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.1),_transparent_20%)]" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Dashboard Home
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight">
                Welcome back{profile?.name ? `, ${profile.name}` : ""}.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-100/86 sm:text-base">
                Land here first, get your bearings, then move into projects or features.
                The project area is now built for quick setup first and deeper detail later.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/projects">
              <Button className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-100">
                <PlusCircle className="mr-2 h-4 w-4" />
                Start A Project
              </Button>
            </Link>
            <Link href="/dashboard/features">
              <Button
                variant="outline"
                className="h-12 rounded-full border-white/25 bg-white/8 px-6 text-sm font-semibold text-white hover:bg-white/14"
              >
                Open Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total projects</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">
            {loading && !projects.length ? "..." : projects.length}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Your active workspace containers.
          </p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-amber-700">Draft projects</p>
          <p className="mt-3 text-4xl font-semibold text-amber-950">
            {loading && !projects.length ? "..." : draftProjects.length}
          </p>
          <p className="mt-2 text-sm text-amber-800/80">
            These still need details, deadlines, or status cleanup.
          </p>
        </div>
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-emerald-700">Visible projects</p>
          <p className="mt-3 text-4xl font-semibold text-emerald-950">
            {loading && !projects.length ? "..." : visibleProjects.length}
          </p>
          <p className="mt-2 text-sm text-emerald-800/80">
            Projects currently exposed for downstream usage and embeds.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl"
            >
              <div className="flex h-full flex-col justify-between gap-10">
                <div className="space-y-4">
                  <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {link.title}
                    </h2>
                    <p className="text-sm leading-6 text-slate-600">
                      {link.description}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center text-sm font-semibold text-slate-900">
                  Open section
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
