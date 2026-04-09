"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, HelpCircle, ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { addQuestion, removeQuestion, updateQuestion } from "../../../../../redux/slices/projectDiarySlice";

const QuestionManager = ({ diaryId, questions = [] }) => {
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newQuestion, setNewQuestion] = useState({ name: "", answer: "" });
    const [expanded, setExpanded] = useState({});

    const handleSubmit = async () => {
        if (!newQuestion.name.trim()) return;

        if (editingId) {
            await dispatch(updateQuestion({
                diaryId,
                questionId: editingId,
                name: newQuestion.name.trim(),
                answer: newQuestion.answer.trim(),
            }));
        } else {
            await dispatch(addQuestion({
                diaryId,
                name: newQuestion.name.trim(),
                answer: newQuestion.answer.trim(),
            }));
        }

        handleCancel();
    };

    const handleEdit = (q) => {
        setNewQuestion({ name: q.name, answer: q.answer || "" });
        setEditingId(q._id);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setNewQuestion({ name: "", answer: "" });
        setEditingId(null);
        setIsAdding(false);
    };

    const handleRemove = async (questionId) => {
        await dispatch(removeQuestion({ diaryId, questionId }));
    };

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-blue-500" />
                        Questions ({questions.length})
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAdding(!isAdding)}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Add Form */}
                {isAdding && (
                    <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                        <Input
                            placeholder="What's your question?"
                            value={newQuestion.name}
                            onChange={(e) => setNewQuestion((p) => ({ ...p, name: e.target.value }))}
                        />
                        <Textarea
                            placeholder="Answer (optional)"
                            value={newQuestion.answer}
                            onChange={(e) => setNewQuestion((p) => ({ ...p, answer: e.target.value }))}
                            className="min-h-[80px]"
                            rows={2}
                        />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleSubmit} disabled={!newQuestion.name.trim()}>
                                {editingId ? "Update Question" : "Add Question"}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {/* Questions List */}
                {questions.length === 0 && !isAdding ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No questions yet. Add questions to clarify project scope.
                    </p>
                ) : (
                    questions.map((q) => (
                        <div
                            key={q._id}
                            className="group p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <button
                                        onClick={() => toggleExpand(q._id)}
                                        className="flex items-center gap-2 text-left font-medium text-sm w-full"
                                    >
                                        {expanded[q._id] ? (
                                            <ChevronUp className="h-4 w-4 shrink-0" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 shrink-0" />
                                        )}
                                        {q.name}
                                    </button>
                                    {expanded[q._id] && q.answer && (
                                        <p className="mt-2 text-sm text-muted-foreground ml-6">
                                            {q.answer}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleEdit(q)}
                                    >
                                        <Pencil className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleRemove(q._id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
};

export default QuestionManager;
