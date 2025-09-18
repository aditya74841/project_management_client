// app/dashboard/users/page.js
import { Suspense } from 'react';
import UserPageClient from '../../../components/dashboard/users/componenets/UserPageClient';
import LoadingState from '@/components/dashboard/companies/components/LoadingState'; // same spinner

async function getInitialUsers() {
  try {
    return null;                   // let the client fetch
  } catch (err) {
    console.error('Server-side user fetch error:', err);
    return null;
  }
}

export default async function UsersPage() {
  const initialData = await getInitialUsers();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">Manage company users and their roles</p>
      </div>

      <Suspense fallback={<LoadingState />}>
        <UserPageClient initialData={initialData} />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: 'Users | Audit Pro',
  description: 'Manage company users and their roles',
};



// "use client";

// // pages/UserManagement.jsx
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createUser,
//   getUsers,
//   changeUserRole,
//   clearMessages,
//   clearError,
//   resetUserClientState,
//   selectUsers,
//   selectCompanyInfo,
//   selectOwnerInfo,
//   selectUserStats,
//   selectUserContext,
//   selectUserClientLoading,
//   selectUserClientCreating,
//   selectUserClientUpdating,
//   selectUserClientError,
//   selectUserClientMessage,
// } from "../../../redux/slices/userClientSlice";

// const UserManagement = () => {
//   const dispatch = useDispatch();

//   // Selectors
//   const users = useSelector(selectUsers);
//   const company = useSelector(selectCompanyInfo);
//   const owner = useSelector(selectOwnerInfo);
//   const stats = useSelector(selectUserStats);
//   const context = useSelector(selectUserContext);
//   const loading = useSelector(selectUserClientLoading);
//   const creating = useSelector(selectUserClientCreating);
//   const updating = useSelector(selectUserClientUpdating);
//   const error = useSelector(selectUserClientError);
//   const message = useSelector(selectUserClientMessage);
//   const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   // Local state for forms
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [createFormData, setCreateFormData] = useState({
//     name: "",
//     email: "",
//     username: "",
//     role: "USER",
//     password: "",
//     companyId: profile.companyId,
//   });
//   const [roleChangeModal, setRoleChangeModal] = useState({
//     show: false,
//     userId: null,
//     currentRole: "",
//     newRole: "",
//   });

//   // Fetch users on component mount
//   useEffect(() => {
//     dispatch(getUsers());

//     // Cleanup on unmount
//     return () => {
//       dispatch(resetUserClientState());
//     };
//   }, [dispatch]);

//   // Clear messages after 5 seconds
//   useEffect(() => {
//     if (message || error) {
//       const timer = setTimeout(() => {
//         dispatch(clearMessages());
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message, error, dispatch]);

//   // Handle create user form submission
//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(createUser(createFormData)).unwrap();
//       setCreateFormData({
//         name: "",
//         email: "",
//         username: "",
//         role: "USER",
//         password: "",
//       });
//       setShowCreateForm(false);
//       // Refresh users list
//       dispatch(getUsers());
//     } catch (err) {
//       console.error("Failed to create user:", err);
//     }
//   };

//   // Handle role change
//   const handleRoleChange = async () => {
//     try {
//       await dispatch(
//         changeUserRole({
//           userId: roleChangeModal.userId,
//           role: roleChangeModal.newRole,
//         })
//       ).unwrap();
//       setRoleChangeModal({
//         show: false,
//         userId: null,
//         currentRole: "",
//         newRole: "",
//       });
//       // Refresh users list
//       dispatch(getUsers());
//     } catch (err) {
//       console.error("Failed to change user role:", err);
//     }
//   };

//   // Open role change modal
//   const openRoleChangeModal = (user) => {
//     setRoleChangeModal({
//       show: true,
//       userId: user._id,
//       currentRole: user.role,
//       newRole: user.role,
//     });
//   };

//   // Get role color
//   const getRoleColor = (role) => {
//     switch (role) {
//       case "SUPERADMIN":
//         return "bg-red-100 text-red-800";
//       case "ADMIN":
//         return "bg-blue-100 text-blue-800";
//       case "USER":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "suspended":
//         return "bg-red-100 text-red-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (loading && !users.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 User Management
//               </h1>
//               {company && (
//                 <p className="text-gray-600 mt-1">
//                   Managing users for{" "}
//                   <span className="font-semibold">{company.name}</span>
//                 </p>
//               )}
//             </div>
//             <button
//               onClick={() => setShowCreateForm(!showCreateForm)}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
//               disabled={creating}
//             >
//               {creating ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//               ) : (
//                 <svg
//                   className="w-5 h-5 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   />
//                 </svg>
//               )}
//               Create User
//             </button>
//           </div>

//           {/* Company Info */}
//           {company && (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
//               <div>
//                 <p className="text-sm text-gray-500">Company</p>
//                 <p className="font-semibold">{company.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-semibold">{company.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Domain</p>
//                 <p className="font-semibold">{company.domain}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Status</p>
//                 <span
//                   className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                     company.status
//                   )}`}
//                 >
//                   {company.status}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Statistics */}
//         {stats && (
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-blue-100 text-blue-600">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500">Total Users</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.totalUsers}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-green-100 text-green-600">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500">Admins</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.adminCount}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-purple-100 text-purple-600">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500">Regular Users</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.userCount}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500">Unverified</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.unverifiedUsers}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex items-center">
//                 <div className="p-3 rounded-full bg-green-100 text-green-600">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-500">Verified</p>
//                   <p className="text-2xl font-bold text-gray-900">
//                     {stats.verifiedUsers}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Messages */}
//         {(message || error) && (
//           <div
//             className={`p-4 rounded-lg mb-6 ${
//               error
//                 ? "bg-red-100 border border-red-400 text-red-700"
//                 : "bg-green-100 border border-green-400 text-green-700"
//             }`}
//           >
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 {error ? (
//                   <svg
//                     className="h-5 w-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="h-5 w-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 )}
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm font-medium">{error || message}</p>
//               </div>
//               <div className="ml-auto pl-3">
//                 <div className="-mx-1.5 -my-1.5">
//                   <button
//                     onClick={() => dispatch(clearMessages())}
//                     className="inline-flex rounded-md p-1.5 hover:bg-opacity-20 focus:outline-none"
//                   >
//                     <svg
//                       className="h-5 w-5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Create User Form */}
//         {showCreateForm && (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Create New User</h2>
//             <form
//               onSubmit={handleCreateUser}
//               className="grid grid-cols-1 md:grid-cols-2 gap-4"
//             >
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={createFormData.name}
//                   onChange={(e) =>
//                     setCreateFormData({
//                       ...createFormData,
//                       name: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter full name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={createFormData.email}
//                   onChange={(e) =>
//                     setCreateFormData({
//                       ...createFormData,
//                       email: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter email address"
//                 />
//               </div>
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                 <input
//                   type="text"
//                   required
//                   value={createFormData.username}
//                   onChange={(e) => setCreateFormData({ ...createFormData, username: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter username"
//                 />
//               </div> */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   required
//                   value={createFormData.password}
//                   onChange={(e) =>
//                     setCreateFormData({
//                       ...createFormData,
//                       password: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter password"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Role
//                 </label>
//                 <select
//                   value={createFormData.role}
//                   onChange={(e) =>
//                     setCreateFormData({
//                       ...createFormData,
//                       role: e.target.value,
//                     })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="USER">User</option>
//                   <option value="ADMIN">Admin</option>
//                 </select>
//               </div>
//               <div className="flex items-end space-x-3">
//                 <button
//                   type="submit"
//                   disabled={creating}
//                   className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-md flex items-center"
//                 >
//                   {creating && (
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   )}
//                   Create User
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateForm(false)}
//                   className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Users Table */}
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-semibold">Users ({users.length})</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Verification
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {users.map((user) => (
//                   <tr
//                     key={user._id}
//                     className={user.isCurrentUser ? "bg-blue-50" : ""}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
//                             <span className="text-sm font-medium text-gray-700">
//                               {user.name.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="flex items-center">
//                             <div className="text-sm font-medium text-gray-900">
//                               {user.name}
//                             </div>
//                             {user.isCurrentUser && (
//                               <span className="ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                 You
//                               </span>
//                             )}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {user.email}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             @{user.username}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
//                           user.role
//                         )}`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
//                           user.isEmailVerified
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {user.isEmailVerified ? "Verified" : "Unverified"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       {!user.isCurrentUser && user.role !== "SUPERADMIN" && (
//                         <button
//                           onClick={() => openRoleChangeModal(user)}
//                           disabled={updating}
//                           className="text-blue-600 hover:text-blue-900 disabled:text-blue-300"
//                         >
//                           Change Role
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Role Change Modal */}
//         {roleChangeModal.show && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//             <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//               <div className="mt-3">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">
//                   Change User Role
//                 </h3>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Current Role:{" "}
//                     <span className="font-semibold">
//                       {roleChangeModal.currentRole}
//                     </span>
//                   </label>
//                   <select
//                     value={roleChangeModal.newRole}
//                     onChange={(e) =>
//                       setRoleChangeModal({
//                         ...roleChangeModal,
//                         newRole: e.target.value,
//                       })
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="USER">User</option>
//                     <option value="ADMIN">Admin</option>
//                   </select>
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     onClick={() =>
//                       setRoleChangeModal({
//                         show: false,
//                         userId: null,
//                         currentRole: "",
//                         newRole: "",
//                       })
//                     }
//                     className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
//                     disabled={updating}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleRoleChange}
//                     disabled={
//                       updating ||
//                       roleChangeModal.newRole === roleChangeModal.currentRole
//                     }
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md flex items-center"
//                   >
//                     {updating && (
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     )}
//                     Update Role
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;
