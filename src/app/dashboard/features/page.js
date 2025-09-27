
import { Suspense } from 'react';
// import FeaturePageClient from './components/FeaturePageClient';
import LoadingState from '@/components/dashboard/LoadingState';
import FeaturePageClient from '@/components/dashboard/features/components/FeaturePageClient';

async function getInitialFeatures() {
  try {
    return null; // Let client handle data fetching
  } catch (error) {
    console.error('Server-side features fetch error:', error);
    return null;
  }
}

export default async function FeaturesPage() {
  const initialData = await getInitialFeatures();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Feature Management</h1>
        <p className="text-gray-600 mt-2">Manage your project features and track progress</p>
      </div>
      
      <Suspense fallback={<LoadingState />}>
        <FeaturePageClient initialData={initialData} />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: 'Features | Your App',
  description: 'Manage your project features and track progress',
};

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page

// "use client";

// import React, { useState } from "react";
// import { 
//   Plus, 
//   MoreHorizontal, 
//   Edit, 
//   Trash2,
//   X,
//   Calendar,
//   Flag
// } from "lucide-react";

// // Mock data
// const DEMO_PROJECTS = [
//   { _id: "1", name: "E-Commerce Platform" },
//   { _id: "2", name: "Mobile App" },
//   { _id: "3", name: "Admin Dashboard" },
// ];

// const DEMO_FEATURES = [
//   {
//     _id: "f1",
//     title: "User Authentication System",
//     description: "Implement login and registration functionality with JWT tokens and email verification",
//     priority: "high",
//     status: "working",
//     deadline: "2024-01-15",
//     tags: ["auth", "security"],
//   },
//   {
//     _id: "f2",
//     title: "Shopping Cart Functionality",
//     description: "Add to cart, remove items, update quantities",
//     priority: "medium",
//     status: "pending",
//     deadline: "2024-01-20",
//     tags: ["cart", "frontend"],
//   },
//   {
//     _id: "f3",
//     title: "Payment Gateway Integration",
//     description: "Integration with Stripe for secure payments",
//     priority: "urgent",
//     status: "blocked",
//     deadline: "2024-01-10",
//     tags: ["payment", "stripe"],
//   },
// ];

// const COLUMNS = [
//   { id: "pending", title: "To Do", color: "bg-gray-100" },
//   { id: "working", title: "In Progress", color: "bg-blue-100" },
//   { id: "blocked", title: "Blocked", color: "bg-red-100" },
//   { id: "completed", title: "Completed", color: "bg-green-100" },
// ];

// const priorityOptions = [
//   { value: "low", label: "Low", color: "green" },
//   { value: "medium", label: "Medium", color: "yellow" },
//   { value: "high", label: "High", color: "orange" },
//   { value: "urgent", label: "Urgent", color: "red" },
// ];

// const statusOptions = [
//   { value: "pending", label: "Pending" },
//   { value: "working", label: "Working" },
//   { value: "blocked", label: "Blocked" },
//   { value: "completed", label: "Completed" },
// ];

// const priorityBorders = {
//   low: "border-l-green-500",
//   medium: "border-l-yellow-500", 
//   high: "border-l-orange-500",
//   urgent: "border-l-red-500",
// };

// // Mock FormField component
// const FormField = ({ id, name, label, type = "text", required, value, error, onChange, onBlur, placeholder, helpText }) => (
//   <div className="space-y-2">
//     <label htmlFor={id} className="block text-sm font-medium text-gray-700">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     {type === "textarea" ? (
//       <textarea
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder={placeholder}
//         rows={3}
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     ) : (
//       <input
//         id={id}
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder={placeholder}
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     )}
//     {error && <div className="text-red-500 text-sm">{error}</div>}
//     {helpText && <div className="text-gray-500 text-sm">{helpText}</div>}
//   </div>
// );

// // Mock Button component
// const Button = ({ children, variant = "default", type = "button", disabled, className = "", onClick, ...props }) => (
//   <button
//     type={type}
//     onClick={onClick}
//     disabled={disabled}
//     className={`
//       inline-flex items-center justify-center rounded-md font-medium transition-colors
//       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
//       disabled:pointer-events-none disabled:opacity-50 px-4 py-2
//       ${variant === "outline" ? "border border-gray-300 bg-white hover:bg-gray-50" : ""}
//       ${variant === "default" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
//       ${className}
//     `}
//     {...props}
//   >
//     {children}
//   </button>
// );

// // Feature Form Component
// const FeatureForm = ({ formData, setFormData, onSubmit, onCancel, isEditing, isSubmitting }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTagsChange = (e) => {
//     const value = e.target.value;
//     const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
//     setFormData(prev => ({ ...prev, tags }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="text-center mb-4">
//         <h3 className="text-lg font-semibold">
//           {isEditing ? "Edit Feature" : "Create New Feature"}
//         </h3>
//         <p className="text-sm text-gray-600">
//           {isEditing ? "Update feature details" : "Add a new feature to your project"}
//         </p>
//       </div>

//       <FormField
//         id="title"
//         name="title"
//         label="Feature Title"
//         required
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Enter feature title"
//       />

//       <FormField
//         id="description"
//         name="description"
//         label="Description"
//         type="textarea"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Describe what this feature does..."
//       />

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Priority <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {priorityOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {statusOptions.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <FormField
//         id="deadline"
//         name="deadline"
//         label="Deadline"
//         type="date"
//         value={formData.deadline}
//         onChange={handleChange}
//       />

//       <FormField
//         id="tags"
//         name="tags"
//         label="Tags"
//         value={formData.tags.join(', ')}
//         onChange={handleTagsChange}
//         placeholder="Enter tags separated by commas"
//         helpText="e.g., frontend, auth, api"
//       />

//       <div className="flex gap-3 pt-4">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onCancel}
//           className="flex-1"
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           disabled={isSubmitting}
//           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           {isSubmitting ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               {isEditing ? "Updating..." : "Creating..."}
//             </div>
//           ) : (
//             isEditing ? "Update Feature" : "Create Feature"
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// };

// // Feature Details Tab
// const FeatureDetails = ({ feature }) => {
//   if (!feature) return <div className="text-gray-500">Select a feature to view details</div>;

//   return (
//     <div className="space-y-4">
//       <div>
//         <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
//         <p className="text-gray-600">{feature.description}</p>
//       </div>
      
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <span className="block text-sm font-medium text-gray-700">Priority</span>
//           <span className={`inline-block px-2 py-1 rounded text-sm font-medium bg-${priorityOptions.find(p => p.value === feature.priority)?.color}-100 text-${priorityOptions.find(p => p.value === feature.priority)?.color}-800`}>
//             {feature.priority}
//           </span>
//         </div>
//         <div>
//           <span className="block text-sm font-medium text-gray-700">Status</span>
//           <span className="text-sm">{feature.status}</span>
//         </div>
//       </div>

//       <div>
//         <span className="block text-sm font-medium text-gray-700">Deadline</span>
//         <div className="flex items-center gap-2 text-sm">
//           <Calendar className="w-4 h-4" />
//           {new Date(feature.deadline).toLocaleDateString()}
//         </div>
//       </div>

//       {feature.tags && feature.tags.length > 0 && (
//         <div>
//           <span className="block text-sm font-medium text-gray-700 mb-2">Tags</span>
//           <div className="flex flex-wrap gap-1">
//             {feature.tags.map((tag, index) => (
//               <span 
//                 key={index}
//                 className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Feature Sheet with Tabs
// const FeatureSheet = ({ isOpen, onClose, feature, onSubmit, isEditing }) => {
//   const [activeTab, setActiveTab] = useState("form");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     title: feature?.title || "",
//     description: feature?.description || "",
//     priority: feature?.priority || "medium",
//     status: feature?.status || "pending",
//     deadline: feature?.deadline || "",
//     tags: feature?.tags || [],
//   });

//   React.useEffect(() => {
//     if (feature) {
//       setFormData({
//         title: feature.title || "",
//         description: feature.description || "",
//         priority: feature.priority || "medium",
//         status: feature.status || "pending",
//         deadline: feature.deadline || "",
//         tags: feature.tags || [],
//       });
//       setActiveTab("details");
//     } else {
//       setActiveTab("form");
//     }
//   }, [feature]);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
//     onSubmit(formData);
//     setIsSubmitting(false);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
//       <div className="bg-white h-full w-full max-w-xl shadow-xl">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <div>
//             <h2 className="text-xl font-semibold">
//               {isEditing ? "Edit Feature" : "New Feature"}
//             </h2>
//             <p className="text-sm text-gray-600">
//               {isEditing ? "Update feature details" : "Create a new feature for your project"}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="px-6 pt-4">
//           <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
//             <button
//               onClick={() => setActiveTab("form")}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                 activeTab === "form"
//                   ? "bg-white text-gray-900 shadow-sm"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               {isEditing ? "Edit" : "Create"}
//             </button>
//             {feature && (
//               <button
//                 onClick={() => setActiveTab("details")}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                   activeTab === "details"
//                     ? "bg-white text-gray-900 shadow-sm"
//                     : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 Details
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 140px)" }}>
//           {activeTab === "form" && (
//             <FeatureForm
//               formData={formData}
//               setFormData={setFormData}
//               onSubmit={handleSubmit}
//               onCancel={onClose}
//               isEditing={isEditing}
//               isSubmitting={isSubmitting}
//             />
//           )}
          
//           {activeTab === "details" && (
//             <FeatureDetails feature={feature} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Simplified Feature Card
// const FeatureCard = ({ feature, onEdit, onDelete, onView }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const isOverdue = new Date(feature.deadline) < new Date() && feature.status !== 'completed';
  
//   return (
//     <div 
//       className={`bg-white rounded-lg border-l-4 ${priorityBorders[feature.priority]} shadow-sm p-4 mb-3 hover:shadow-md transition-all cursor-pointer group`}
//       onClick={() => onView(feature)}
//     >
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
//                 >
//                   <Trash2 className="w-3 h-3 mr-2" />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <span className={`text-xs px-2 py-1 rounded ${
//           isOverdue 
//             ? 'bg-red-100 text-red-700' 
//             : 'bg-gray-100 text-gray-600'
//         }`}>
//           {new Date(feature.deadline).toLocaleDateString()}
//         </span>
//       </div>
//     </div>
//   );
// };

// // Kanban Column
// const KanbanColumn = ({ column, features, onEdit, onDelete, onAddFeature, onView }) => {
//   return (
//     <div className="flex-1 bg-gray-50 rounded-lg p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <h3 className="font-medium text-gray-900">{column.title}</h3>
//           <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
//             {features.length}
//           </span>
//         </div>
        
//         {column.id === 'pending' && (
//           <button
//             onClick={onAddFeature}
//             className="p-1 text-gray-400 hover:text-gray-600 hover:bg-white rounded"
//             title="Add Feature"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       <div className="space-y-2 min-h-[400px]">
//         {features.map((feature) => (
//           <FeatureCard
//             key={feature._id}
//             feature={feature}
//             onEdit={onEdit}
//             onDelete={onDelete}
//             onView={onView}
//           />
//         ))}
        
//         {features.length === 0 && (
//           <div className="text-center text-gray-400 text-sm py-8">
//             {column.id === 'pending' ? 'Add your first feature' : `No ${column.title.toLowerCase()} features`}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Priority Legend
// const PriorityLegend = () => (
//   <div className="flex items-center gap-4 text-sm">
//     <span className="text-gray-600">Priority:</span>
//     <div className="flex items-center gap-1">
//       <div className="w-4 h-3 border-l-4 border-l-green-500 bg-white"></div>
//       <span>Low</span>
//     </div>
//     <div className="flex items-center gap-1">
//       <div className="w-4 h-3 border-l-4 border-l-yellow-500 bg-white"></div>
//       <span>Medium</span>
//     </div>
//     <div className="flex items-center gap-1">
//       <div className="w-4 h-3 border-l-4 border-l-orange-500 bg-white"></div>
//       <span>High</span>
//     </div>
//     <div className="flex items-center gap-1">
//       <div className="w-4 h-3 border-l-4 border-l-red-500 bg-white"></div>
//       <span>Urgent</span>
//     </div>
//   </div>
// );

// // Main Kanban Board
// const KanbanWithSheet = () => {
//   const [selectedProjectId, setSelectedProjectId] = useState("1");
//   const [features, setFeatures] = useState(DEMO_FEATURES);
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [editingFeature, setEditingFeature] = useState(null);

//   const filteredFeatures = features.filter(
//     feature => selectedProjectId === "1"
//   );

//   const featuresByStatus = COLUMNS.map(column => ({
//     ...column,
//     features: filteredFeatures.filter(feature => feature.status === column.id)
//   }));

//   const handleProjectChange = (e) => {
//     setSelectedProjectId(e.target.value);
//   };

//   const handleAddFeature = () => {
//     setEditingFeature(null);
//     setSheetOpen(true);
//   };

//   const handleEditFeature = (feature) => {
//     setEditingFeature(feature);
//     setSheetOpen(true);
//   };

//   const handleViewFeature = (feature) => {
//     setEditingFeature(feature);
//     setSheetOpen(true);
//   };

//   const handleDeleteFeature = (featureId) => {
//     if (confirm("Are you sure you want to delete this feature?")) {
//       setFeatures(prev => prev.filter(f => f._id !== featureId));
//     }
//   };

//   const handleSubmitFeature = (formData) => {
//     if (editingFeature) {
//       // Update existing feature
//       setFeatures(prev => prev.map(f => 
//         f._id === editingFeature._id ? { ...f, ...formData } : f
//       ));
//     } else {
//       // Add new feature
//       const newFeature = {
//         _id: `f${Date.now()}`,
//         ...formData,
//       };
//       setFeatures(prev => [...prev, newFeature]);
//     }
//   };

//   const selectedProject = DEMO_PROJECTS.find(p => p._id === selectedProjectId);
//   const totalFeatures = filteredFeatures.length;
//   const completedFeatures = filteredFeatures.filter(f => f.status === 'completed').length;
//   const progress = totalFeatures > 0 ? Math.round((completedFeatures / totalFeatures) * 100) : 0;

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="border-b bg-white sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <h1 className="text-2xl font-bold text-gray-900">Features Board</h1>
              
//               <select
//                 value={selectedProjectId}
//                 onChange={handleProjectChange}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               >
//                 <option value="">Select a project</option>
//                 {DEMO_PROJECTS.map((project) => (
//                   <option key={project._id} value={project._id}>
//                     {project.name}
//                   </option>
//                 ))}
//               </select>

//               <PriorityLegend />
//             </div>

//             <button
//               onClick={handleAddFeature}
//               disabled={!selectedProjectId}
//               className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//             >
//               <Plus className="w-4 h-4" />
//               Add Feature
//             </button>
//           </div>

//           {selectedProject && (
//             <div className="mt-4 flex items-center gap-6">
//               <div className="flex-1">
//                 <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
//                   <span>{selectedProject.name}</span>
//                   <span>{completedFeatures} of {totalFeatures} completed</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-green-500 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${progress}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-green-600">{progress}%</div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Kanban Board */}
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         {selectedProjectId ? (
//           <div className="flex gap-6 overflow-x-auto pb-4">
//             {featuresByStatus.map((column) => (
//               <div key={column.id} className="min-w-[280px]">
//                 <KanbanColumn
//                   column={column}
//                   features={column.features}
//                   onEdit={handleEditFeature}
//                   onDelete={handleDeleteFeature}
//                   onAddFeature={handleAddFeature}
//                   onView={handleViewFeature}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Select a project</h3>
//               <p className="text-gray-600">Choose a project from the dropdown to view its features on the board.</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Feature Sheet */}
//       <FeatureSheet
//         isOpen={sheetOpen}
//         onClose={() => {
//           setSheetOpen(false);
//           setEditingFeature(null);
//         }}
//         feature={editingFeature}
//         onSubmit={handleSubmitFeature}
//         isEditing={!!editingFeature}
//       />
//     </div>
//   );
// };

// export default KanbanWithSheet;


// "use client";

// import React, { useState } from "react";
// import { 
//   Plus, 
//   MoreHorizontal, 
//   Edit, 
//   Trash2, 
//   CheckCircle, 
//   Circle 
// } from "lucide-react";

// // Mock data
// const DEMO_PROJECTS = [
//   { _id: "1", name: "E-Commerce Platform" },
//   { _id: "2", name: "Mobile App" },
//   { _id: "3", name: "Admin Dashboard" },
// ];

// const DEMO_FEATURES = [
//   {
//     _id: "f1",
//     title: "User Authentication",
//     description: "Implement login and registration functionality with JWT tokens and email verification",
//     priority: "high",
//     status: "working",
//     isCompleted: false,
//     projectId: { _id: "1", name: "E-Commerce Platform" },
//     tags: ["auth", "security"],
//   },
//   {
//     _id: "f2",
//     title: "Shopping Cart",
//     description: "Add to cart, remove items, update quantities, and persist cart state",
//     priority: "medium",
//     status: "pending",
//     isCompleted: false,
//     projectId: { _id: "1", name: "E-Commerce Platform" },
//     tags: ["cart", "frontend"],
//   },
//   {
//     _id: "f3",
//     title: "Payment Gateway",
//     description: "Integration with Stripe for secure payment processing",
//     priority: "urgent",
//     status: "blocked",
//     isCompleted: false,
//     projectId: { _id: "1", name: "E-Commerce Platform" },
//     tags: ["payment", "stripe"],
//   },
//   {
//     _id: "f4",
//     title: "Product Search",
//     description: "Implement search functionality with filters and sorting options",
//     priority: "medium",
//     status: "completed",
//     isCompleted: true,
//     projectId: { _id: "1", name: "E-Commerce Platform" },
//     tags: ["search", "filters"],
//   },
//   {
//     _id: "f5",
//     title: "Order History",
//     description: "Display user's previous orders with detailed information",
//     priority: "low",
//     status: "pending",
//     isCompleted: false,
//     projectId: { _id: "1", name: "E-Commerce Platform" },
//     tags: ["orders", "history"],
//   },
//   {
//     _id: "f6",
//     title: "Admin Analytics",
//     description: "Create dashboard with sales analytics and user metrics",
//     priority: "medium",
//     status: "working",
//     isCompleted: false,
//     projectId: { _id: "1", name: "E-Commerce Platform" },
//     tags: ["analytics", "admin"],
//   },
// ];

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

// // Mock Button component
// const Button = ({ children, variant = "default", size = "default", disabled, className = "", onClick, ...props }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`
//       inline-flex items-center justify-center rounded-md font-medium transition-colors
//       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
//       disabled:pointer-events-none disabled:opacity-50
//       ${variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : ""}
//       ${variant === "outline" ? "border border-input bg-background hover:bg-accent" : ""}
//       ${variant === "default" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
//       ${size === "sm" ? "h-8 px-3 text-xs" : ""}
//       ${size === "default" ? "h-10 px-4 py-2" : ""}
//       ${className}
//     `}
//     {...props}
//   >
//     {children}
//   </button>
// );

// // Feature Card Component
// const FeatureCard = ({ feature, onEdit, onDelete, onToggleCompletion, loading }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start mb-3">
//         <h3 className="font-semibold text-lg truncate pr-2">{feature.title}</h3>
//         <div className="relative">
//           <Button 
//             variant="ghost" 
//             size="sm"
//             onClick={() => setShowDropdown(!showDropdown)}
//           >
//             <MoreHorizontal className="w-4 h-4" />
//           </Button>
          
//           {showDropdown && (
//             <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//               <div className="py-1">
//                 <button
//                   onClick={() => {
//                     onEdit(feature);
//                     setShowDropdown(false);
//                   }}
//                   className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   <Edit className="w-4 h-4 mr-2" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => {
//                     onToggleCompletion(feature._id);
//                     setShowDropdown(false);
//                   }}
//                   className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
//                 >
//                   {feature.isCompleted ? (
//                     <Circle className="w-4 h-4 mr-2" />
//                   ) : (
//                     <CheckCircle className="w-4 h-4 mr-2" />
//                   )}
//                   {feature.isCompleted ? "Mark Incomplete" : "Mark Complete"}
//                 </button>
//                 <button
//                   onClick={() => {
//                     onDelete(feature._id);
//                     setShowDropdown(false);
//                   }}
//                   className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                   disabled={loading}
//                 >
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
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

//       {/* Tags */}
//       {feature.tags && feature.tags.length > 0 && (
//         <div className="flex gap-1 mt-2 flex-wrap">
//           {feature.tags.map((tag, index) => (
//             <span 
//               key={index}
//               className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Features Page
// const FeaturesPageDemo = () => {
//   const [selectedProjectId, setSelectedProjectId] = useState("1");
//   const [features, setFeatures] = useState(DEMO_FEATURES);

//   const filteredFeatures = features.filter(
//     feature => feature.projectId._id === selectedProjectId
//   );

//   const handleProjectChange = (e) => {
//     setSelectedProjectId(e.target.value);
//   };

//   const handleAddFeature = () => {
//     alert("Add Feature clicked!");
//   };

//   const handleEditFeature = (feature) => {
//     alert(`Edit Feature: ${feature.title}`);
//   };

//   const handleDeleteFeature = (featureId) => {
//     if (confirm("Are you sure you want to delete this feature?")) {
//       setFeatures(prev => prev.filter(f => f._id !== featureId));
//     }
//   };

//   const handleToggleCompletion = (featureId) => {
//     setFeatures(prev => prev.map(f => 
//       f._id === featureId 
//         ? { 
//             ...f, 
//             isCompleted: !f.isCompleted,
//             status: !f.isCompleted ? "completed" : "pending"
//           }
//         : f
//     ));
//   };

//   const selectedProject = DEMO_PROJECTS.find(p => p._id === selectedProjectId);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header with Project Selector */}
//         <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
//           <div className="flex items-center gap-4">
//             <h1 className="text-3xl font-bold text-gray-900">Features</h1>
//             <select
//               value={selectedProjectId}
//               onChange={handleProjectChange}
//               className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[200px]"
//             >
//               <option value="">Select a project</option>
//               {DEMO_PROJECTS.map((project) => (
//                 <option key={project._id} value={project._id}>
//                   {project.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <Button
//             onClick={handleAddFeature}
//             disabled={!selectedProjectId}
//             className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2"
//           >
//             <Plus className="w-4 h-4" />
//             Add Feature
//           </Button>
//         </div>

//         {/* Project Info */}
//         {selectedProject && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <h2 className="text-lg font-semibold text-blue-900">
//               {selectedProject.name}
//             </h2>
//             <p className="text-blue-700 text-sm">
//               Showing {filteredFeatures.length} features for this project
//             </p>
//           </div>
//         )}

//         {/* Features Grid */}
//         {selectedProjectId ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredFeatures.map((feature) => (
//               <FeatureCard
//                 key={feature._id}
//                 feature={feature}
//                 onEdit={handleEditFeature}
//                 onDelete={handleDeleteFeature}
//                 onToggleCompletion={handleToggleCompletion}
//                 loading={false}
//               />
//             ))}
//             {filteredFeatures.length === 0 && (
//               <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
//                 <div className="space-y-2">
//                   <h3 className="text-lg font-medium">No features found</h3>
//                   <p>No features found for this project. Create your first feature!</p>
//                   <Button onClick={handleAddFeature} className="mt-4">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Feature
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center py-12 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
//             <div className="space-y-2">
//               <h3 className="text-lg font-medium">Select a project</h3>
//               <p>Please select a project from the dropdown to view features.</p>
//             </div>
//           </div>
//         )}

//         {/* Stats */}
//         {selectedProjectId && filteredFeatures.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="bg-white p-4 rounded-lg border text-center">
//               <div className="text-2xl font-bold text-gray-900">
//                 {filteredFeatures.length}
//               </div>
//               <div className="text-sm text-gray-600">Total Features</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg border text-center">
//               <div className="text-2xl font-bold text-green-600">
//                 {filteredFeatures.filter(f => f.isCompleted).length}
//               </div>
//               <div className="text-sm text-gray-600">Completed</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg border text-center">
//               <div className="text-2xl font-bold text-blue-600">
//                 {filteredFeatures.filter(f => f.status === 'working').length}
//               </div>
//               <div className="text-sm text-gray-600">In Progress</div>
//             </div>
//             <div className="bg-white p-4 rounded-lg border text-center">
//               <div className="text-2xl font-bold text-red-600">
//                 {filteredFeatures.filter(f => f.status === 'blocked').length}
//               </div>
//               <div className="text-sm text-gray-600">Blocked</div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeaturesPageDemo;
