
import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { PRIORITY_OPTIONS } from '../utils/constants';

const FeatureCard = ({ feature, onEdit, onDelete, onView, loading }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const priorityInfo = PRIORITY_OPTIONS.find(p => p.value === feature.priority);
  const isOverdue = new Date(feature.deadline) < new Date() && feature.status !== 'completed';
  
  return (
    <div 
      className={`bg-white rounded-lg border-l-4 ${priorityInfo?.border} shadow-sm p-4 mb-3 hover:shadow-md transition-all cursor-pointer group`}
      onClick={() => onView(feature)}
    >
      {/* Header with title and menu */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-sm leading-tight flex-1 pr-2">
          {feature.title}
        </h4>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-6 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <div className="py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(feature);
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="w-3 h-3 mr-2" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(feature._id);
                    setShowDropdown(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                  disabled={loading}
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deadline */}
      <div className="flex justify-end">
        <span className={`text-xs px-2 py-1 rounded ${
          isOverdue 
            ? 'bg-red-100 text-red-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {feature.deadline ? new Date(feature.deadline).toLocaleDateString() : 'No deadline'}
        </span>
      </div>
    </div>
  );
};

export default FeatureCard;


// import React from "react";
// import { MoreHorizontal, Edit, Trash2, CheckCircle, Circle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const priorityColors = {
//   low: "bg-green-100 text-green-800",
//   medium: "bg-yellow-100 text-yellow-800",
//   high: "bg-orange-100 text-orange-800",
//   urgent: "bg-red-100 text-red-800",
// };

// const statusColors = {
//   pending: "bg-gray-100 text-gray-800",
//   working: "bg-blue-100 text-blue-800",
//   completed: "bg-green-100 text-green-800",
//   blocked: "bg-red-100 text-red-800",
// };

// const FeatureCard = ({ feature, onEdit, onDelete, onToggleCompletion, loading }) => {
//   return (
//     <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start mb-3">
//         <h3 className="font-semibold text-lg truncate">{feature.title}</h3>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="sm">
//               <MoreHorizontal className="w-4 h-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => onEdit(feature)}>
//               <Edit className="w-4 h-4 mr-2" />
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem 
//               onClick={() => onToggleCompletion(feature._id)}
//               className="text-blue-600"
//             >
//               {feature.isCompleted ? (
//                 <Circle className="w-4 h-4 mr-2" />
//               ) : (
//                 <CheckCircle className="w-4 h-4 mr-2" />
//               )}
//               {feature.isCompleted ? "Mark Incomplete" : "Mark Complete"}
//             </DropdownMenuItem>
//             <DropdownMenuItem 
//               onClick={() => onDelete(feature._id)}
//               className="text-red-600"
//               disabled={loading}
//             >
//               <Trash2 className="w-4 h-4 mr-2" />
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <p className="text-gray-600 text-sm mb-4 line-clamp-3">{feature.description}</p>

//       <div className="flex justify-between items-center">
//         <div className="flex gap-2">
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[feature.priority]}`}>
//             {feature.priority}
//           </span>
//           <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[feature.status]}`}>
//             {feature.status}
//           </span>
//         </div>
//         {feature.isCompleted && (
//           <CheckCircle className="w-5 h-5 text-green-600" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeatureCard;
