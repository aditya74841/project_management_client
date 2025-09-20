// app/dashboard/companies/page.js (Server Component)
import { Suspense } from 'react';
import CompanyPageClient from '../../../components/dashboard/companies/components/CompanyPageClient';
import LoadingState from '@/components/dashboard/LoadingState';
// import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Server-side data fetching (optional)
async function getInitialCompanies() {
  // This would run on the server
  try {
    // You could fetch initial data here if needed
    // const response = await fetch(`${process.env.SERVER_URL}/api/companies`, {
    //   headers: { 'Authorization': `Bearer ${serverToken}` }
    // });
    // return response.json();
    return null; // Let client handle data fetching
  } catch (error) {
    console.error('Server-side company fetch error:', error);
    return null;
  }
}

export default async function CompaniesPage() {
  const initialData = await getInitialCompanies();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
        <p className="text-gray-600 mt-2">Manage your companies and their information</p>
      </div>
      
      <Suspense fallback={<LoadingState />}>
        <CompanyPageClient initialData={initialData} />
      </Suspense>
    </div>
  );
}

// Generate metadata for SEO
export const metadata = {
  title: 'Companies | Audit Pro',
  description: 'Manage your companies and their information',
};



// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { DataTableDemo } from "@/components/Table/DataTable";

// import {
//   createCompany,
//   getAllCompanies,
//   updateCompany,
//   deleteCompany,
//   clearMessages,
// } from "../../../redux/slices/companySlice";
// import { validateCompanyForm, validateField } from "@/lib/validations/companyValidation";

// const CompanyPage = () => {
//   const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Form fields
//   const [companyName, setCompanyName] = useState("");
//   const [companyEmail, setCompanyEmail] = useState("");
//   const [companyDomain, setCompanyDomain] = useState("");
//   const [editingCompanyId, setEditingCompanyId] = useState(null);
  
//   // Validation states
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isFormValid, setIsFormValid] = useState(false);

//   const dispatch = useDispatch();
//   const { 
//     companies, 
//     loading, 
//     creating, 
//     updating, 
//     deleting, 
//     error, 
//     message 
//   } = useSelector((state) => state.company);

//   // Fetch all companies on component mount
//   useEffect(() => {
//     dispatch(getAllCompanies());
//   }, [dispatch]);

//   // Handle success/error messages
//   useEffect(() => {
//     if (message) {
//       Swal.fire("Success", message, "success");
//       dispatch(clearMessages());
//     }
//     if (error) {
//       Swal.fire("Error", error, "error");
//       dispatch(clearMessages());
//     }
//   }, [message, error, dispatch]);

//   // Validate form whenever fields change
//   useEffect(() => {
//     const formData = {
//       name: companyName,
//       email: companyEmail,
//       domain: companyDomain,
//     };

//     const validation = validateCompanyForm(formData);
//     setErrors(validation.errors);
//     setIsFormValid(validation.isValid);
//   }, [companyName, companyEmail, companyDomain]);

//   // Handle field changes with real-time validation
//   const handleFieldChange = (fieldName, value) => {
//     // Update the field value
//     switch (fieldName) {
//       case 'name':
//         setCompanyName(value);
//         break;
//       case 'email':
//         setCompanyEmail(value);
//         break;
//       case 'domain':
//         setCompanyDomain(value);
//         break;
//     }

//     // Mark field as touched
//     setTouched(prev => ({ ...prev, [fieldName]: true }));

//     // Real-time validation
//     const fieldError = validateField(fieldName, value, {
//       name: companyName,
//       email: companyEmail,
//       domain: companyDomain,
//     });

//     setErrors(prev => ({
//       ...prev,
//       [fieldName]: fieldError
//     }));
//   };

//   const handleFieldBlur = (fieldName) => {
//     setTouched(prev => ({ ...prev, [fieldName]: true }));
//   };

//   const handleCreateOrUpdateCompany = async () => {
//     // Mark all fields as touched
//     setTouched({
//       name: true,
//       email: true,
//       domain: true,
//     });

//     // Final validation
//     const formData = {
//       name: companyName,
//       email: companyEmail,
//       domain: companyDomain,
//     };

//     const validation = validateCompanyForm(formData);
//     setErrors(validation.errors);

//     if (!validation.isValid) {
//       Swal.fire({
//         title: "Validation Error",
//         text: "Please fix the errors in the form before submitting",
//         icon: "error",
//       });
//       return;
//     }

//     try {
//       const companyData = {
//         name: companyName.trim(),
//         email: companyEmail.trim(),
//         domain: companyDomain.trim() || null,
//       };

//       if (isEditing && editingCompanyId) {
//         await dispatch(updateCompany({ 
//           companyId: editingCompanyId, 
//           ...companyData 
//         })).unwrap();
//       } else {
//         await dispatch(createCompany(companyData)).unwrap();
//       }

//       // Reset form and close drawer
//       resetForm();
//       setNewItemDrawerOpen(false);
      
//     } catch (err) {
//       console.error("Company operation error:", err);
//     }
//   };

//   const handleEditCompany = (company) => {
//     setCompanyName(company.name || "");
//     setCompanyEmail(company.email || "");
//     setCompanyDomain(company.domain || "");
//     setEditingCompanyId(company._id);
//     setIsEditing(true);
    
//     // Reset validation states
//     setErrors({});
//     setTouched({});
    
//     setNewItemDrawerOpen(true);
//   };

//   const handleDeleteCompany = async (companyId) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will delete the company permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await dispatch(deleteCompany(companyId)).unwrap();
//       } catch (err) {
//         console.error("Delete company error:", err);
//       }
//     }
//   };

//   const resetForm = () => {
//     setCompanyName("");
//     setCompanyEmail("");
//     setCompanyDomain("");
//     setIsEditing(false);
//     setEditingCompanyId(null);
//     setErrors({});
//     setTouched({});
//     setIsFormValid(false);
//   };

//   const handleAddNewCompany = () => {
//     resetForm();
//     setNewItemDrawerOpen(true);
//   };

//   // Helper function to get field error display
//   const getFieldError = (fieldName) => {
//     return touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
//   };

//   const getFieldClassName = (fieldName, baseClassName) => {
//     if (touched[fieldName] && errors[fieldName]) {
//       return `${baseClassName} border-red-500 focus-visible:ring-red-500`;
//     }
//     if (touched[fieldName] && !errors[fieldName]) {
//       return `${baseClassName} border-green-500 focus-visible:ring-green-500`;
//     }
//     return `${baseClassName} focus-visible:ring-2 focus-visible:ring-blue-500`;
//   };

//   return (
//     <div className="w-full my-4 px-8 py-3">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Companies</h1>

//         <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
//           <SheetTrigger asChild>
//             <Button
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
//               onClick={handleAddNewCompany}
//             >
//               + Add Company
//             </Button>
//           </SheetTrigger>

//           <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl">
//             <SheetHeader className="px-6 pt-6">
//               <SheetTitle className="text-2xl font-semibold text-gray-800">
//                 {isEditing ? "Edit Company" : "Add New Company"}
//               </SheetTitle>
//               <SheetDescription className="text-gray-500">
//                 {isEditing 
//                   ? "Update company information below" 
//                   : "Fill in the details to create a new company"
//                 }
//               </SheetDescription>
//             </SheetHeader>

//             <div className="px-6 py-4 space-y-6">
//               {/* Company Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-gray-700 font-medium">
//                   Company Name <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="name"
//                     value={companyName}
//                     onChange={(e) => handleFieldChange('name', e.target.value)}
//                     onBlur={() => handleFieldBlur('name')}
//                     placeholder="Enter company name"
//                     className={getFieldClassName('name', 'pr-10')}
//                   />
//                   {touched.name && (
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {errors.name ? (
//                         <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {getFieldError('name') && (
//                   <p className="text-red-500 text-sm flex items-center gap-2">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {getFieldError('name')}
//                   </p>
//                 )}
//               </div>

//               {/* Company Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-gray-700 font-medium">
//                   Company Email <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="email"
//                     type="email"
//                     value={companyEmail}
//                     onChange={(e) => handleFieldChange('email', e.target.value)}
//                     onBlur={() => handleFieldBlur('email')}
//                     placeholder="Enter company email"
//                     className={getFieldClassName('email', 'pr-10')}
//                   />
//                   {touched.email && (
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {errors.email ? (
//                         <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {getFieldError('email') && (
//                   <p className="text-red-500 text-sm flex items-center gap-2">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {getFieldError('email')}
//                   </p>
//                 )}
//               </div>

//               {/* Company Domain */}
//               <div className="space-y-2">
//                 <Label htmlFor="domain" className="text-gray-700 font-medium">
//                   Company Domain (Optional)
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="domain"
//                     value={companyDomain}
//                     onChange={(e) => handleFieldChange('domain', e.target.value)}
//                     onBlur={() => handleFieldBlur('domain')}
//                     placeholder="Enter company domain (e.g., company.com)"
//                     className={getFieldClassName('domain', 'pr-10')}
//                   />
//                   {touched.domain && companyDomain && (
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {errors.domain ? (
//                         <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {getFieldError('domain') && (
//                   <p className="text-red-500 text-sm flex items-center gap-2">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                     {getFieldError('domain')}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <SheetFooter className="px-6 pb-6">
//               <div className="flex gap-3 w-full">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setNewItemDrawerOpen(false)}
//                   className="flex-1"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={handleCreateOrUpdateCompany}
//                   disabled={creating || updating || !isFormValid}
//                   className={`flex-1 ${
//                     isFormValid 
//                       ? 'bg-blue-600 hover:bg-blue-700' 
//                       : 'bg-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   {creating || updating ? (
//                     <div className="flex items-center gap-2">
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       {isEditing ? "Updating..." : "Creating..."}
//                     </div>
//                   ) : (
//                     isEditing ? "Update Company" : "Create Company"
//                   )}
//                 </Button>
//               </div>
//             </SheetFooter>
//           </SheetContent>
//         </Sheet>
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="flex justify-center items-center py-8">
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//             <span className="text-gray-600">Loading companies...</span>
//           </div>
//         </div>
//       )}

//       {/* Companies Table */}
//       {!loading && (
//         <div className="bg-white rounded-lg shadow">
//           <DataTableDemo
//             data={companies || []}
//             onEdit={handleEditCompany}
//             onDelete={handleDeleteCompany}
//           />
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && (!companies || companies.length === 0) && (
//         <div className="text-center py-8">
//           <p className="text-gray-500 text-lg">No companies found</p>
//           <p className="text-gray-400">Create your first company to get started</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyPage;



// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { DataTableDemo } from "@/components/Table/DataTable";

// import {
//   createCompany,
//   getAllCompanies,
//   updateCompany,
//   deleteCompany,
//   // clearMessages,
// } from "../../../redux/slices/companySlice";

// const CompanyPage = () => {
//   const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [companyName, setCompanyName] = useState("");
//   const [companyEmail, setCompanyEmail] = useState("");
//   const [companyDomain, setCompanyDomain] = useState("");
//   const [editingCompanyId, setEditingCompanyId] = useState(null);

//   const dispatch = useDispatch();
//   const { 
//     companies, 
//     loading, 
//     creating, 
//     updating, 
//     deleting, 
//     error, 
//     message 
//   } = useSelector((state) => state.company);

//   // Fetch all companies on component mount
//   useEffect(() => {
//     dispatch(getAllCompanies());
//   }, [dispatch]);

//   // Handle success/error messages
//   useEffect(() => {
//     if (message) {
//       Swal.fire("Success", message, "success");
//       // dispatch(clearMessages());
//     }
//     if (error) {
//       Swal.fire("Error", error, "error");
//       // dispatch(clearMessages());
//     }
//   }, [message, error, dispatch]);

//   const handleCreateOrUpdateCompany = async () => {
//     if (!companyName.trim()) {
//       return Swal.fire("Error", "Company name is required", "error");
//     }
//     if (!companyEmail.trim()) {
//       return Swal.fire("Error", "Company email is required", "error");
//     }

//     try {
//       const companyData = {
//         name: companyName,
//         email: companyEmail,
//         domain: companyDomain || null,
//       };

//       if (isEditing && editingCompanyId) {
//         await dispatch(updateCompany({ 
//           companyId: editingCompanyId, 
//           ...companyData 
//         })).unwrap();
//       } else {
//         await dispatch(createCompany(companyData)).unwrap();
//       }

//       // Reset form and close drawer
//       resetForm();
//       setNewItemDrawerOpen(false);
      
//     } catch (err) {
//       console.error("Company operation error:", err);
//       // Error is handled by useEffect above
//     }
//   };

//   const handleEditCompany = (company) => {
//     setCompanyName(company.name || "");
//     setCompanyEmail(company.email || "");
//     setCompanyDomain(company.domain || "");
//     setEditingCompanyId(company._id);
//     setIsEditing(true);
//     setNewItemDrawerOpen(true);
//   };

//   const handleDeleteCompany = async (companyId) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will delete the company permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await dispatch(deleteCompany(companyId)).unwrap();
//       } catch (err) {
//         console.error("Delete company error:", err);
//         // Error is handled by useEffect above
//       }
//     }
//   };

//   const resetForm = () => {
//     setCompanyName("");
//     setCompanyEmail("");
//     setCompanyDomain("");
//     setIsEditing(false);
//     setEditingCompanyId(null);
//   };

//   const handleAddNewCompany = () => {
//     resetForm();
//     setNewItemDrawerOpen(true);
//   };

//   return (
//     <div className="w-full my-4 px-8 py-3">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Companies</h1>

//         <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
//           <SheetTrigger asChild>
//             <Button
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
//               onClick={handleAddNewCompany}
//             >
//               + Add Company
//             </Button>
//           </SheetTrigger>

//           <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl">
//             <SheetHeader className="px-6 pt-6">
//               <SheetTitle className="text-2xl font-semibold text-gray-800">
//                 {isEditing ? "Edit Company" : "Add New Company"}
//               </SheetTitle>
//               <SheetDescription className="text-gray-500">
//                 {isEditing 
//                   ? "Update company information below" 
//                   : "Fill in the details to create a new company"
//                 }
//               </SheetDescription>
//             </SheetHeader>

//             <div className="px-6 py-4 space-y-6">
//               {/* Company Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-gray-700 font-medium">
//                   Company Name <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="name"
//                   value={companyName}
//                   onChange={(e) => setCompanyName(e.target.value)}
//                   placeholder="Enter company name"
//                   className="focus-visible:ring-2 focus-visible:ring-blue-500"
//                 />
//               </div>

//               {/* Company Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-gray-700 font-medium">
//                   Company Email <span className="text-red-500">*</span>
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={companyEmail}
//                   onChange={(e) => setCompanyEmail(e.target.value)}
//                   placeholder="Enter company email"
//                   className="focus-visible:ring-2 focus-visible:ring-blue-500"
//                 />
//               </div>

//               {/* Company Domain */}
//               <div className="space-y-2">
//                 <Label htmlFor="domain" className="text-gray-700 font-medium">
//                   Company Domain (Optional)
//                 </Label>
//                 <Input
//                   id="domain"
//                   value={companyDomain}
//                   onChange={(e) => setCompanyDomain(e.target.value)}
//                   placeholder="Enter company domain (e.g., company.com)"
//                   className="focus-visible:ring-2 focus-visible:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <SheetFooter className="px-6 pb-6">
//               <div className="flex gap-3 w-full">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setNewItemDrawerOpen(false)}
//                   className="flex-1"
//                 >
//                   Cancel
//                 </Button>
//                 <SheetClose asChild>
//                   <Button
//                     type="button"
//                     onClick={handleCreateOrUpdateCompany}
//                     disabled={creating || updating}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700"
//                   >
//                     {creating || updating ? (
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         {isEditing ? "Updating..." : "Creating..."}
//                       </div>
//                     ) : (
//                       isEditing ? "Update Company" : "Create Company"
//                     )}
//                   </Button>
//                 </SheetClose>
//               </div>
//             </SheetFooter>
//           </SheetContent>
//         </Sheet>
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="flex justify-center items-center py-8">
//           <div className="flex items-center gap-3">
//             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//             <span className="text-gray-600">Loading companies...</span>
//           </div>
//         </div>
//       )}

//       {/* Companies Table */}
//       {!loading && (
//         <div className="bg-white rounded-lg shadow">
//           <DataTableDemo
//             data={companies || []}
//             onEdit={handleEditCompany}
//             onDelete={handleDeleteCompany}
//           />
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && (!companies || companies.length === 0) && (
//         <div className="text-center py-8">
//           <p className="text-gray-500 text-lg">No companies found</p>
//           <p className="text-gray-400">Create your first company to get started</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyPage;




