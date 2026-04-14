"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "../ui-core";
import { useUiStore } from "@/store/uiStore";

/**
 * Zen Prism Final CTA
 * Optimized for high conversion with global UI triggering.
 */
export default function FinalCTASection() {
  const ui = useUiStore();

  return (
    <section className="py-32 relative overflow-hidden">
      {/* High-Contrast Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-900 to-slate-950" />
      
      {/* Decorative Assets */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Join the elite builders
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]"
          >
            Ready to ship <br />
            <span className="text-primary">faster than ever?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Don't let scattered tools slow down your momentum. Embed your workflow, 
            focus your energy, and launch your vision today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button
              variant="primary"
              size="lg"
              className="h-16 px-12 text-lg font-black group"
              onClick={ui.openRegister}
            >
              Start Free Now
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-16 px-12 text-lg font-bold text-white hover:bg-white/5"
            >
              Contact Sales
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 pt-12"
          >
            {[
              "No credit card required",
              "Unlimited free tier",
              "Secure data encryption"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
