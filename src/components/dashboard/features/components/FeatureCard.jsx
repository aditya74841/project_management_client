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
      onClick={() => onView(feature)} // Click card to view
    >
      {/* Header with title and menu */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-sm leading-tight flex-1 pr-2">
          {feature.title}
        </h4>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking menu
              setShowDropdown(!showDropdown);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-opacity"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-6 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <div className="py-1">
                {/* EDIT BUTTON - This is the key part */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onEdit(feature); // Call edit function with feature data
                    setShowDropdown(false); // Close dropdown
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="w-3 h-3 mr-2" />
                  Edit
                </button>
                
                {/* DELETE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onDelete(feature._id); // Call delete function
                    setShowDropdown(false); // Close dropdown
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




// import React, { useState } from 'react';
// import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
// import { PRIORITY_OPTIONS } from '../utils/constants';

// const FeatureCard = ({ feature, onEdit, onDelete, onView, loading }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const priorityInfo = PRIORITY_OPTIONS.find(p => p.value === feature.priority);
//   const isOverdue = new Date(feature.deadline) < new Date() && feature.status !== 'completed';
  
//   return (
//     <div 
//       className={`bg-white rounded-lg border-l-4 ${priorityInfo?.border} shadow-sm p-4 mb-3 hover:shadow-md transition-all cursor-pointer group`}
//       onClick={() => onView(feature)}
//     >
//       {/* Header with title and menu */}
//       <div className="flex items-start justify-between mb-3">
//         <h4 className="font-medium text-sm leading-tight flex-1 pr-2">
//           {feature.title}
//         </h4>
//         <div className="relative">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowDropdown(!showDropdown);
//             }}
//             className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-opacity"
//           >
//             <MoreHorizontal className="w-4 h-4" />
//           </button>
          
//           {showDropdown && (
//             <div className="absolute right-0 top-6 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
//               <div className="py-1">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onEdit(feature);
//                     setShowDropdown(false);
//                   }}
//                   className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   <Edit className="w-3 h-3 mr-2" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDelete(feature._id);
//                     setShowDropdown(false);
//                   }}
//                   className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
//                   disabled={loading}
//                 >
//                   <Trash2 className="w-3 h-3 mr-2" />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Deadline */}
//       <div className="flex justify-end">
//         <span className={`text-xs px-2 py-1 rounded ${
//           isOverdue 
//             ? 'bg-red-100 text-red-700' 
//             : 'bg-gray-100 text-gray-600'
//         }`}>
//           {feature.deadline ? new Date(feature.deadline).toLocaleDateString() : 'No deadline'}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default FeatureCard;

