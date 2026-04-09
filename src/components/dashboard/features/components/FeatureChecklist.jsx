import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle,
  Loader2,
  Edit2,
  X,
  Check
} from "lucide-react";
import { 
  createFeatureQuestion, 
  toggleQuestionCompletion, 
  deleteFeatureQuestion,
  updateFeatureQuestion
} from "@/redux/slices/featureSlice";
import { Button } from "@/components/ui/button";

const FeatureChecklist = ({ featureId, questions = [] }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  
  const dispatch = useDispatch();

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setIsAdding(true);
    try {
      await dispatch(createFeatureQuestion({ 
        featureId, 
        name: newQuestion.trim() 
      })).unwrap();
      setNewQuestion("");
    } catch (err) {
      console.error("Failed to add question:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggle = async (questionId) => {
    setLoadingId(questionId);
    try {
      await dispatch(toggleQuestionCompletion({ featureId, questionId })).unwrap();
    } catch (err) {
      console.error("Failed to toggle question:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    setLoadingId(questionId);
    try {
      await dispatch(deleteFeatureQuestion({ featureId, questionId })).unwrap();
    } catch (err) {
      console.error("Failed to delete question:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const startEditing = (question) => {
    setEditingId(question._id);
    setEditText(question.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleUpdate = async (questionId) => {
    if (!editText.trim()) return;
    
    setLoadingId(questionId);
    try {
      await dispatch(updateFeatureQuestion({ 
        featureId, 
        questionId, 
        name: editText.trim() 
      })).unwrap();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update question:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const completedCount = questions.filter(q => q.isCompleted).length;
  const progress = questions.length > 0 ? Math.round((completedCount / questions.length) * 100) : 0;

  return (
    <div className="space-y-4 py-4">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Task Checklist
        </h4>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {completedCount}/{questions.length} Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
        <div 
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {questions.map((question) => {
          const isEditing = editingId === question._id;
          
          return (
            <div 
              key={question._id}
              className={`group flex items-center justify-between p-3 rounded-lg transition-all border ${
                isEditing ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 hover:bg-white border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {!isEditing && (
                  <button 
                    onClick={() => handleToggle(question._id)}
                    disabled={loadingId === question._id}
                    className={`transition-colors flex-shrink-0 ${question.isCompleted ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'}`}
                  >
                    {loadingId === question._id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : question.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                )}
                
                {isEditing ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 bg-white border border-blue-300 rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUpdate(question._id);
                      if (e.key === 'Escape') cancelEditing();
                    }}
                  />
                ) : (
                  <span className={`text-sm ${question.isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {question.name}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => handleUpdate(question._id)}
                      disabled={loadingId === question._id}
                      className="p-1 text-green-600 hover:bg-green-100 rounded transition-all"
                    >
                      {loadingId === question._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={cancelEditing}
                      className="p-1 text-gray-400 hover:bg-gray-200 rounded transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => startEditing(question)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-500 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(question._id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {questions.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-400 text-sm italic">
            No tasks added yet. Start by adding one below!
          </div>
        )}
      </div>

      {/* Add Form */}
      <form onSubmit={handleAddQuestion} className="mt-4 flex gap-2">
        <input 
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          disabled={isAdding}
        />
        <Button 
          type="submit" 
          disabled={isAdding || !newQuestion.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  );
};

export default FeatureChecklist;
