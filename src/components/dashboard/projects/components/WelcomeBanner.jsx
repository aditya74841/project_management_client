"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, X, Rocket } from "lucide-react";

const WelcomeBanner = ({ onCreateProject }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [userName, setUserName] = useState("there");

  useEffect(() => {
    // Get user name from localStorage or Redux
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  if (!showBanner) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-xl mb-8 p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.6))]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-4 right-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-4 left-20 w-20 h-20 bg-indigo-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Close Button */}
      <button
        onClick={() => setShowBanner(false)}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span className="text-sm font-semibold text-blue-100 uppercase tracking-wide">
              Welcome Back
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Hey {userName}! 👋
          </h2>
          <p className="text-blue-100 text-lg">
            Ready to manage your projects? Start by creating your first project or explore existing ones.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onCreateProject}
            className="group bg-white text-blue-700 hover:bg-blue-50 px-6 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Rocket className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />
            Create Project
          </Button>
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-6 py-6 text-lg font-semibold rounded-xl transition-all duration-200"
          >
            View Docs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
