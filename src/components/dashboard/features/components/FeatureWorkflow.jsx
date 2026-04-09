import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  Plus, 
  Trash2, 
  GripVertical,
  Loader2,
  ArrowDown,
  Edit2,
  X,
  Check
} from "lucide-react";
import { 
  addFeatureWorkflow, 
  deleteFeatureWorkflow,
  updateFeatureWorkflow
} from "@/redux/slices/featureSlice";
import { Button } from "@/components/ui/button";

const FeatureWorkflow = ({ featureId, workFlow = [] }) => {
  const [newStep, setNewStep] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  
  const dispatch = useDispatch();

  const handleAddStep = async (e) => {
    e.preventDefault();
    if (!newStep.trim()) return;

    setIsAdding(true);
    try {
      await dispatch(addFeatureWorkflow({ 
        featureId, 
        flow: newStep.trim() 
      })).unwrap();
      setNewStep("");
    } catch (err) {
      console.error("Failed to add workflow step:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (workflowId) => {
    if (!window.confirm("Remove this step from the workflow?")) return;
    
    setLoadingId(workflowId);
    try {
      await dispatch(deleteFeatureWorkflow({ featureId, workflowId })).unwrap();
    } catch (err) {
      console.error("Failed to delete workflow step:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const startEditing = (step) => {
    setEditingId(step._id);
    setEditText(step.flow);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleUpdate = async (workflowId) => {
    if (!editText.trim()) return;
    
    setLoadingId(workflowId);
    try {
      await dispatch(updateFeatureWorkflow({ 
        featureId, 
        workflowId, 
        flow: editText.trim() 
      })).unwrap();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update workflow step:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Development Workflow
        </h4>
        <span className="text-xs text-gray-400">
          {workFlow.length} Steps
        </span>
      </div>

      {/* Workflow Steps */}
      <div className="relative space-y-4 pr-2">
        {workFlow.map((step, index) => {
          const isEditing = editingId === step._id;
          
          return (
            <React.Fragment key={step._id}>
              <div 
                className={`group relative flex items-start gap-4 p-4 rounded-xl shadow-sm transition-all border ${
                  isEditing ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/10' : 'bg-white border-gray-100 hover:shadow-md hover:border-blue-100'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-colors ${
                    isEditing ? 'bg-blue-600 text-white border-blue-400' : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full text-sm font-medium text-gray-800 leading-relaxed bg-white border border-blue-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                      autoFocus
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800 leading-relaxed">
                      {step.flow}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={() => handleUpdate(step._id)}
                        disabled={loadingId === step._id}
                        className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-all"
                        title="Save"
                      >
                        {loadingId === step._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={cancelEditing}
                        className="p-1.5 text-gray-400 hover:bg-gray-200 rounded-lg transition-all"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEditing(step)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-blue-500 bg-gray-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(step._id)}
                        disabled={loadingId === step._id}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        {loadingId === step._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Visual connector */}
              {index < workFlow.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-gray-200" />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {workFlow.length === 0 && !isAdding && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm">
            No workflow defined. Outline the implementation steps!
          </div>
        )}
      </div>

      {/* Add Form */}
      <form onSubmit={handleAddStep} className="mt-8">
        <div className="relative group">
          <textarea 
            rows="2"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Define next workflow step..."
            className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 pb-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            disabled={isAdding}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
             <Button 
              type="submit" 
              disabled={isAdding || !newStep.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4"
            >
              {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Step"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeatureWorkflow;
