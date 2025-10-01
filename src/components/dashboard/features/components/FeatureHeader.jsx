// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Plus, Zap } from 'lucide-react';

// const FeatureHeader = ({ projects, selectedProjectId, onProjectChange, onAddFeature }) => {
//   const selectedProject = projects?.find(p => p._id === selectedProjectId);
//   const totalFeatures = selectedProject?.features?.length || 0;

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-purple-100 rounded-lg">
//             <Zap className="w-6 h-6 text-purple-600" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Features</h2>
//             <p className="text-gray-600">Track and manage your project features</p>
//           </div>
//         </div>
        
//         <Button
//           onClick={onAddFeature}
//           disabled={!selectedProjectId}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Add Feature
//         </Button>
//       </div>

//       {/* Project Selector */}
//       <div className="flex items-center gap-4">
//         <select
//           value={selectedProjectId}
//           onChange={(e) => onProjectChange(e.target.value)}
//           className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px]"
//         >
//           <option value="">Select a project</option>
//           {projects?.map((project) => (
//             <option key={project._id} value={project._id}>
//               {project.name}
//             </option>
//           ))}
//         </select>

//         {selectedProject && (
//           <div className="text-sm text-gray-600">
//             <span className="font-medium">{selectedProject.name}</span>
//             {totalFeatures > 0 && (
//               <span className="ml-2">• {totalFeatures} features</span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Priority Legend */}
//       {selectedProjectId && (
//         <div className="flex items-center gap-4 text-sm bg-gray-50 p-3 rounded-lg">
//           <span className="text-gray-600 font-medium">Priority:</span>
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-3 border-l-4 border-l-green-500 bg-white"></div>
//             <span>Low</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-3 border-l-4 border-l-yellow-500 bg-white"></div>
//             <span>Medium</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-3 border-l-4 border-l-orange-500 bg-white"></div>
//             <span>High</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-3 border-l-4 border-l-red-500 bg-white"></div>
//             <span>Urgent</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeatureHeader;



import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Zap } from 'lucide-react';

const FeatureHeader = ({ 
  projects, 
  selectedProjectId, 
  onProjectChange, 
  onAddFeature, 
  loading 
}) => {
  const selectedProject = projects?.find(p => p._id === selectedProjectId);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Features</h2>
            <p className="text-gray-600">Track and manage your project features</p>
          </div>
        </div>
        
        <Button
          onClick={onAddFeature}
          disabled={!selectedProjectId}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Feature
        </Button>
      </div>

      {/* Project Selector */}
      {/* <div className="flex items-center gap-4">
        <select
          value={selectedProjectId}
          onChange={(e) => onProjectChange(e.target.value)}
          disabled={loading}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px] disabled:bg-gray-100"
        >
          <option value="">
            {loading ? "Loading projects..." : "Select a project"}
          </option>
          {projects?.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        {selectedProject && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">{selectedProject.name}</span>
            <span className="ml-2">selected</span>
          </div>
        )}
      </div> */}

      {/* Priority Legend */}
      {selectedProjectId && (
        <div className="flex items-center gap-4 text-sm bg-gray-50 p-3 rounded-lg">
          <span className="text-gray-600 font-medium">Priority:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border-l-4 border-l-green-500 bg-white"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border-l-4 border-l-yellow-500 bg-white"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border-l-4 border-l-orange-500 bg-white"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border-l-4 border-l-red-500 bg-white"></div>
            <span>Urgent</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureHeader;
