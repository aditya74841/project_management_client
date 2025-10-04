import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Edit, Trash2, Eye, EyeOff, Calendar, ArrowRight, MoreVertical, Copy,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig = {
  completed: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
  },
  archived: {
    bg: "bg-gray-100 dark:bg-gray-900/30",
    text: "text-gray-800 dark:text-gray-300",
    border: "border-gray-200 dark:border-gray-800",
  },
  draft: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-300",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  active: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
};

const BASE_URL = "https://project-management-client-amber.vercel.app"; // Replace with your deployment URL

const ProjectGrid = ({ projects, onEdit, onDelete, onToggle, loading }) => {
  const router = useRouter();

  // Copy to clipboard utility
  const handleCopyUrl = (projectId) => {
    const embedUrl = `${BASE_URL}/features?projectId=${projectId}`;
    const iframeCode = `<iframe src="${embedUrl}" width="100%" height="600" frameBorder="0"></iframe>`;
    navigator.clipboard.writeText(iframeCode)
      .then(() => {
        // You can use your toast/message util here
        alert("Embed code copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy. Try again!");
      });
  };

  const handleProjectClick = (projectId) => {
    router.push(`/dashboard/features?projectId=${projectId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const status = statusConfig[project.status] || statusConfig.active;

        return (
          <div
            key={project._id}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative p-6">
              {/* Header with status and menu */}
              <div className="flex items-start justify-between mb-4">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.text} border ${status.border}`}>
                  {project.status}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onEdit(project)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggle(project._id)}>
                      {project.isShown ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Hide Project
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Show Project
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(project._id)}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Project Name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
                {project.description || "No description provided"}
              </p>

              {/* Deadline */}
              {project.deadline && (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              )}

              {/* View Features Button */}
              <Button
                onClick={() => handleProjectClick(project._id)}
                className="w-full mb-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                View Features
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Copy URL as iframe embed */}
              <Button
                onClick={() => handleCopyUrl(project._id)}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Copy Embed Code
                <Copy className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
              </Button>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Use this code to embed your features view anywhere!
              </div>
            </div>

            {/* Visibility Indicator */}
            {!project.isShown && (
              <div className="absolute top-2 left-2">
                <div className="p-1.5 bg-gray-900/80 rounded-full">
                  <EyeOff className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectGrid;





// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   EyeOff,
//   Calendar,
//   ArrowRight,
//   MoreVertical,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const statusConfig = {
//   completed: {
//     bg: "bg-green-100 dark:bg-green-900/30",
//     text: "text-green-800 dark:text-green-300",
//     border: "border-green-200 dark:border-green-800",
//   },
//   archived: {
//     bg: "bg-gray-100 dark:bg-gray-900/30",
//     text: "text-gray-800 dark:text-gray-300",
//     border: "border-gray-200 dark:border-gray-800",
//   },
//   draft: {
//     bg: "bg-yellow-100 dark:bg-yellow-900/30",
//     text: "text-yellow-800 dark:text-yellow-300",
//     border: "border-yellow-200 dark:border-yellow-800",
//   },
//   active: {
//     bg: "bg-blue-100 dark:bg-blue-900/30",
//     text: "text-blue-800 dark:text-blue-300",
//     border: "border-blue-200 dark:border-blue-800",
//   },
// };

// const ProjectGrid = ({ projects, onEdit, onDelete, onToggle, loading }) => {
//   const router = useRouter();

//   const handleProjectClick = (projectId) => {
//     router.push(`/dashboard/features?projectId=${projectId}`);
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {projects.map((project) => {
//         const status = statusConfig[project.status] || statusConfig.active;
        
//         return (
//           <div
//             key={project._id}
//             className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
//           >
//             {/* Gradient overlay on hover */}
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//             {/* Card Content */}
//             <div className="relative p-6">
//               {/* Header with status and menu */}
//               <div className="flex items-start justify-between mb-4">
//                 <span
//                   className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.text} border ${status.border}`}
//                 >
//                   {project.status}
//                 </span>

//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <MoreVertical className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-48">
//                     <DropdownMenuItem onClick={() => onEdit(project)}>
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit Project
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => onToggle(project._id)}>
//                       {project.isShown ? (
//                         <>
//                           <EyeOff className="w-4 h-4 mr-2" />
//                           Hide Project
//                         </>
//                       ) : (
//                         <>
//                           <Eye className="w-4 h-4 mr-2" />
//                           Show Project
//                         </>
//                       )}
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       onClick={() => onDelete(project._id)}
//                       className="text-red-600 dark:text-red-400"
//                     >
//                       <Trash2 className="w-4 h-4 mr-2" />
//                       Delete Project
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>

//               {/* Project Name */}
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                 {project.name}
//               </h3>

//               {/* Description */}
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
//                 {project.description || "No description provided"}
//               </p>

//               {/* Deadline */}
//               {project.deadline && (
//                 <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
//                   <Calendar className="w-4 h-4" />
//                   <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
//                 </div>
//               )}

//               {/* View Features Button */}
//               <Button
//                 onClick={() => handleProjectClick(project._id)}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
//               >
//                 View Features
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button
//                 onClick={() => handleProjectClick(project._id)}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
//               >
//                 Copy Url
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </div>

//             {/* Visibility Indicator */}
//             {!project.isShown && (
//               <div className="absolute top-2 left-2">
//                 <div className="p-1.5 bg-gray-900/80 rounded-full">
//                   <EyeOff className="w-3 h-3 text-white" />
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProjectGrid;
