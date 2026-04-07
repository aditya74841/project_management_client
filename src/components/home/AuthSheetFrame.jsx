"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const panelVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function AuthSheetFrame({
  eyebrow,
  title,
  description,
  badgeIcon: BadgeIcon = Sparkles,
  sideTone = "signin",
  highlights = [],
  footer,
  children,
}) {
  const tones = {
    signin: {
      shell:
        "bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_32%),linear-gradient(180deg,_#f7fbff_0%,_#eef6ff_42%,_#ffffff_100%)]",
      side:
        "bg-[linear-gradient(160deg,_#0f172a_0%,_#0f3b5f_38%,_#155e75_100%)]",
      accent: "from-sky-400 via-cyan-300 to-emerald-200",
      chip: "bg-white/12 text-sky-100 border-white/15",
      badge:
        "bg-white/12 text-white shadow-[0_14px_40px_rgba(10,20,40,0.28)] ring-1 ring-white/20",
    },
    signup: {
      shell:
        "bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_30%),linear-gradient(180deg,_#fff9ec_0%,_#fff4da_38%,_#ffffff_100%)]",
      side:
        "bg-[linear-gradient(160deg,_#1f2937_0%,_#92400e_42%,_#b45309_100%)]",
      accent: "from-amber-200 via-orange-100 to-white",
      chip: "bg-white/12 text-amber-50 border-white/15",
      badge:
        "bg-white/12 text-white shadow-[0_14px_40px_rgba(80,40,0,0.24)] ring-1 ring-white/20",
    },
  };

  const theme = tones[sideTone] || tones.signin;

  return (
    <div
      className={`relative h-full overflow-hidden ${theme.shell} lg:grid lg:grid-cols-[0.88fr_1.12fr]`}
    >
      <div className="relative hidden overflow-hidden lg:flex">
        <div className={`absolute inset-0 ${theme.side}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.16),_transparent_22%),radial-gradient(circle_at_78%_28%,_rgba(255,255,255,0.12),_transparent_18%),radial-gradient(circle_at_50%_100%,_rgba(255,255,255,0.14),_transparent_26%)]" />
        <div className="absolute -left-14 top-14 h-44 w-44 rounded-full border border-white/10 bg-white/10 blur-3xl" />
        <div className="absolute right-[-4.5rem] bottom-10 h-52 w-52 rounded-full border border-white/10 bg-white/10 blur-3xl" />

        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex h-full flex-col justify-between p-10 text-white"
        >
          <motion.div variants={itemVariants} className="max-w-xs space-y-5">
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] ${theme.chip}`}>
              <ShieldCheck className="h-4 w-4" />
              Secure Access
            </div>

            <div className="space-y-4">
              <h3 className="text-4xl font-semibold leading-tight">
                {sideTone === "signup"
                  ? "Build your workspace with a calmer first step."
                  : "Return to your projects without friction."}
              </h3>
              <p className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-sm font-medium text-transparent`}>
                {sideTone === "signup"
                  ? "Create an account, organize your team, and start shipping in one place."
                  : "Access features, updates, and team activity from the same command center."}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-md"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-6 text-slate-100/92">{highlight}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full flex-col px-5 py-6 sm:px-7 lg:px-8"
      >
        <motion.div variants={itemVariants} className="mb-6 flex items-start justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 shadow-sm backdrop-blur">
              <BadgeIcon className="h-4 w-4 text-slate-700" />
              {eyebrow}
            </div>

            <div className="space-y-2">
              <h2 className="max-w-md text-3xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
                {title}
              </h2>
              <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
                {description}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex-1 rounded-[28px] border border-white/70 bg-white/86 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.09)] backdrop-blur-xl sm:p-5"
        >
          {children}
        </motion.div>

        {footer ? (
          <motion.div variants={itemVariants} className="pt-4 text-center">
            {footer}
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}
