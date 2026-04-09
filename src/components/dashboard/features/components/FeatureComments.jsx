import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Send, 
  Trash2, 
  User,
  Loader2,
  MessageSquare,
  Edit2,
  X,
  Check
} from "lucide-react";
import { 
  addFeatureComment, 
  deleteFeatureComment,
  updateFeatureComment
} from "@/redux/slices/featureSlice";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

const FeatureComments = ({ featureId, comments = [] }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await dispatch(addFeatureComment({ 
        featureId, 
        text: newComment.trim() 
      })).unwrap();
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    
    setLoadingId(commentId);
    try {
      await dispatch(deleteFeatureComment({ featureId, commentId })).unwrap();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const startEditing = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleUpdate = async (commentId) => {
    if (!editText.trim()) return;
    
    setLoadingId(commentId);
    try {
      await dispatch(updateFeatureComment({ 
        featureId, 
        commentId, 
        text: editText.trim() 
      })).unwrap();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update comment:", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 py-4 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Discussion
        </h4>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MessageSquare className="w-3 h-3" />
          {comments.length} Comments
        </div>
      </div>

      {/* Comment List */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 min-h-[300px] max-h-[500px] custom-scrollbar">
        {[...comments].reverse().map((comment) => {
          const isOwnComment = comment.createdBy?._id === profile?._id || comment.createdBy === profile?._id;
          const isEditing = editingId === comment._id;
          
          // Fallback UI for creator info
          const creator = typeof comment.createdBy === 'object' ? comment.createdBy : (isOwnComment ? profile : null);
          const name = creator?.name || "User";
          const initial = name.charAt(0);

          return (
            <div 
              key={comment._id}
              className={`flex gap-3 ${isOwnComment ? "flex-row-reverse" : ""}`}
            >
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-transform hover:scale-110 ${
                  isOwnComment 
                    ? "bg-blue-600 text-white border-blue-100 shadow-sm" 
                    : "bg-white text-blue-600 border-blue-50"
                }`}>
                  {initial || <User className="w-4 h-4" />}
                </div>
              </div>

              <div className={`flex flex-col max-w-[85%] ${isOwnComment ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 mb-1 px-1">
                  {!isOwnComment && (
                    <span className="text-xs font-semibold text-gray-700">
                      {name}
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400">
                    {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : "just now"}
                  </span>
                </div>

                <div className={`relative group p-3 rounded-2xl text-sm shadow-sm transition-all ${
                  isOwnComment 
                    ? "bg-blue-600 text-white rounded-tr-none hover:bg-blue-700" 
                    : "bg-white border border-gray-100 text-gray-700 rounded-tl-none hover:border-blue-200"
                }`}>
                  {isEditing ? (
                    <div className="space-y-2 min-w-[200px]">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-blue-700 text-white text-sm rounded-lg p-2 outline-none border border-blue-400 focus:border-white transition-colors resize-none"
                        rows="3"
                        autoFocus
                      />
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={cancelEditing}
                          className="p-1 hover:bg-blue-500 rounded transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUpdate(comment._id)}
                          disabled={loadingId === comment._id}
                          className="p-1 hover:bg-blue-500 rounded transition-colors"
                          title="Save Changes"
                        >
                          {loadingId === comment._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="whitespace-pre-wrap leading-relaxed">{comment.text}</p>
                      
                      {isOwnComment && (
                        <div className="absolute -left-12 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <button 
                            onClick={() => startEditing(comment)}
                            className="p-1.5 text-gray-400 hover:text-blue-500 bg-white rounded-full shadow-sm border border-gray-50 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(comment._id)}
                            disabled={loadingId === comment._id}
                            className="p-1.5 text-gray-400 hover:text-red-500 bg-white rounded-full shadow-sm border border-gray-50 transition-colors"
                            title="Delete"
                          >
                            {loadingId === comment._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {comments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <MessageSquare className="w-8 h-8 text-blue-200" />
            </div>
            <p className="text-sm font-medium text-gray-500">No discussion yet</p>
            <p className="text-xs text-gray-400 mt-1">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleAddComment} className="mt-4">
        <div className="relative group">
          <textarea 
            rows="2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full text-sm bg-white border border-gray-200 rounded-2xl pl-4 pr-14 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-lg shadow-gray-100/50 resize-none border-b-4 border-b-blue-500/20"
            disabled={isSubmitting}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment(e);
              }
            }}
          />
          <button 
            type="submit" 
            disabled={isSubmitting || !newComment.trim()}
            className="absolute right-3 bottom-4 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all shadow-lg shadow-blue-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5 translate-x-0.5 -translate-y-0.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeatureComments;
