"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Plus, Sparkles } from "lucide-react";

const EmptyState = ({ onAddProject }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-12">
      {/* Icon */}
      <div className="relative mx-auto w-24 h-24 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-10 animate-pulse"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center">
          <FolderOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        No Projects Yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        Start your journey by creating your first project. Track progress, manage features, and stay organized.
      </p>

      {/* CTA Button */}
      <Button
        onClick={onAddProject}
        className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
        Create Your First Project
        <Plus className="w-5 h-5 ml-2" />
      </Button>

      {/* Helper text */}
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
        It only takes a minute to get started
      </p>
    </div>
  </div>
);

export default EmptyState;
