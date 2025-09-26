
// app/dashboard/companies/components/CompanyForm.jsx


// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import FormField from "./FormField";

// const CompanyForm = ({
//   formData,
//   errors,
//   touched,
//   isValid,
//   isSubmitting,
//   isEditing,
//   onChange,
//   onBlur,
//   onSubmit,
//   onCancel,
// }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const statusOptions = [
//     { value: "active", label: "Active", color: "text-green-600" },
//     { value: "inactive", label: "Inactive", color: "text-gray-600" },
//     { value: "suspended", label: "Suspended", color: "text-red-600" },
//   ];

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <FormField
//         id="name"
//         name="name"
//         label="Company Name"
//         type="text"
//         required
//         value={formData.name}
//         error={touched.name ? errors.name : null}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder="Enter company name"
//       />

//       <FormField
//         id="email"
//         name="email"
//         label="Company Email"
//         type="email"
//         required
//         value={formData.email}
//         error={touched.email ? errors.email : null}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder="Enter company email"
//       />

//       <FormField
//         id="domain"
//         name="domain"
//         label="Company Domain"
//         type="text"
//         value={formData.domain}
//         error={touched.domain ? errors.domain : null}
//         onChange={onChange}
//         onBlur={onBlur}
//         placeholder="Enter company domain (e.g., company.com)"
//         helpText="Optional field"
//       />

//       {/* Status Dropdown */}
//       {isEditing && (
//         <div className="space-y-2">
//           <Label htmlFor="status" className="text-gray-700 font-medium">
//             Status
//           </Label>
//           <div className="relative">
//             <select
//               id="status"
//               name="status"
//               value={formData.status || "active"}
//               onChange={onChange}
//               onBlur={onBlur}
//               className="w-full px-3 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
//             >
//               {statusOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             {/* Custom Dropdown Arrow */}
//             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//               <svg
//                 className="w-5 h-5 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Status indicator */}
//           <div className="flex items-center gap-2 text-sm">
//             <div
//               className={`w-2 h-2 rounded-full ${
//                 formData.status === "active"
//                   ? "bg-green-500"
//                   : formData.status === "suspended"
//                   ? "bg-red-500"
//                   : "bg-gray-400"
//               }`}
//             ></div>
//             <span className="text-gray-600">
//               Current status:{" "}
//               <span
//                 className={
//                   formData.status === "active"
//                     ? "text-green-600 font-medium"
//                     : formData.status === "suspended"
//                     ? "text-red-600 font-medium"
//                     : "text-gray-600 font-medium"
//                 }
//               >
//                 {
//                   statusOptions.find(
//                     (opt) => opt.value === (formData.status || "active")
//                   )?.label
//                 }
//               </span>
//             </span>
//           </div>
//         </div>
//       )}

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
//           disabled={!isValid || isSubmitting}
//           className={`flex-1 ${
//             isValid
//               ? "bg-blue-600 hover:bg-blue-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           {isSubmitting ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               {isEditing ? "Updating..." : "Creating..."}
//             </div>
//           ) : isEditing ? (
//             "Update Company"
//           ) : (
//             "Create Company"
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default CompanyForm;


import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "./FormField";

const statusOptions = [
  { value: "active", label: "Active", color: "text-green-600" },
  { value: "inactive", label: "Inactive", color: "text-gray-600" },
  { value: "suspended", label: "Suspended", color: "text-red-600" },
];

const CompanyForm = ({
  formData,
  errors,
  touched,
  isValid,
  isSubmitting,
  isEditing,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-md mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Company" : "Register New Company"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isEditing
              ? "Update company details"
              : "Add a new company to the platform"}
          </p>
        </div>

        <FormField
          id="name"
          name="name"
          label="Company Name"
          type="text"
          required
          value={formData.name}
          error={touched.name ? errors.name : null}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter company name"
        />

        <FormField
          id="email"
          name="email"
          label="Company Email"
          type="email"
          required
          value={formData.email}
          error={touched.email ? errors.email : null}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter company email"
        />

        <FormField
          id="domain"
          name="domain"
          label="Company Domain"
          type="text"
          value={formData.domain}
          error={touched.domain ? errors.domain : null}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter company domain (e.g., company.com)"
          helpText="Optional field"
        />

        {/* Status Dropdown */}
        {isEditing && (
          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-700 font-medium">
              Status
            </Label>
            <div className="relative">
              <select
                id="status"
                name="status"
                value={formData.status || "active"}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full px-3 py-2 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {/* Status indicator */}
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  formData.status === "active"
                    ? "bg-green-500"
                    : formData.status === "suspended"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              ></div>
              <span className="text-gray-600">
                Current status:{" "}
                <span
                  className={
                    formData.status === "active"
                      ? "text-green-600 font-medium"
                      : formData.status === "suspended"
                      ? "text-red-600 font-medium"
                      : "text-gray-600 font-medium"
                  }
                >
                  {
                    statusOptions.find(
                      (opt) => opt.value === (formData.status || "active")
                    )?.label
                  }
                </span>
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`flex-1 ${
              isValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </div>
            ) : isEditing ? (
              "Update Company"
            ) : (
              "Create Company"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
