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
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-50 p-2">
            <Zap className="w-6 h-6 text-cyan-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Features</h2>
            <p className="text-sm text-gray-600">Select a project and manage feature work without extra visual noise.</p>
          </div>
        </div>
        
        <Button
          onClick={onAddFeature}
          disabled={!selectedProjectId}
          className="bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 disabled:bg-slate-300"
        >
          <Plus className="w-4 h-4" />
          Add Feature
        </Button>
      </div>

      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
        <select
          value={selectedProjectId}
          onChange={(e) => onProjectChange(e.target.value)}
          disabled={loading}
          className="min-w-[240px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-600"
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
            <span className="ml-2 text-slate-400">selected</span>
          </div>
        )}
      </div>

      {selectedProjectId && (
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
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
    </div>
  );
};

export default FeatureHeader;
