"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Plus, Sparkles } from "lucide-react";

const ProjectDiaryEmptyState = ({ onAddDiary }) => {
    return (
        <Card className="border-dashed bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-6 rounded-2xl bg-cyan-50 p-4">
                    <BookOpen className="h-12 w-12 text-cyan-700" />
                </div>

                <h3 className="text-xl font-semibold mb-2">No Project Diaries Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                    Start capturing your project ideas, track features, and document your development journey.
                </p>

                <Button onClick={onAddDiary} size="lg" className="gap-2 bg-cyan-600 text-white hover:bg-cyan-700">
                    <Plus className="h-4 w-4" />
                    Create Your First Diary
                </Button>

                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    <span>Track ideas, features, questions, and more</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectDiaryEmptyState;
