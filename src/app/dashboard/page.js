import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page

// "use client"

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { getStoresBasedOnCompany } from "./stores/store";
// import { fetchStaff } from "./staff/store";
// import { motion } from "framer-motion";
// import { Folder,  Store, Users } from "lucide-react";
// import { fetchAuditQuestions } from "./audits/store";
// import Link from "next/link";
// import { userProfile } from "@/redux/slices/authSlice";

// // Animation variants for cards and buttons
// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] },
//   }),
// };

// const buttonVariants = {
//   hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" },
//   tap: { scale: 0.95 },
// };

// export default function DashboardHome() {
//   const dispatch = useDispatch();
//   const { stores, totalStores } = useSelector((state) => state.store);
//   const { totalUsers } = useSelector((state) => state.staff);
//   const { profile } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(true); // Loading state for async data
//   const { totalAudits } = useSelector((state) => state.audit);
//   useEffect(() => {
//     dispatch(
//       userProfile((error) => {
//         if (error && error.response?.status !== 401) {
//           toast.error(error.response?.data?.message || error.message);
//         }
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     const companyIdToFetch = profile?.companyId || null;
//     if (companyIdToFetch) {
//       setLoading(true);
//       Promise.all([
//         dispatch(getStoresBasedOnCompany(companyIdToFetch)),
//         dispatch(fetchStaff(companyIdToFetch)),
//         dispatch(fetchAuditQuestions()),
//       ]).finally(() => setLoading(false));
//     }
//   }, [dispatch, profile]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-indigo-900 py-12 px-4">
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
//             Welcome, {profile?.name || "User"}!
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
//             Your hub for managing projects, stores, and team members.
//           </p>
//         </motion.div>

//         {/* Quick Insights */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <motion.div
//             custom={0}
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors"
//           >
//             <Folder className="w-10 h-10 text-blue-600 dark:text-blue-400" />
//             <div>
//               <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                 {loading ? "..." : totalAudits || 0}
//               </span>
//               <p className="text-gray-700 dark:text-gray-300">Audit question</p>
//             </div>
//           </motion.div>
//           <motion.div
//             custom={1}
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors"
//           >
//             <Store className="w-10 h-10 text-green-600 dark:text-green-400" />
//             <div>
//               <span className="text-2xl font-bold text-green-600 dark:text-green-400">
//                 {loading ? "..." : totalStores || 0}
//               </span>
//               <p className="text-gray-700 dark:text-gray-300">Total Stores</p>
//             </div>
//           </motion.div>
//           <motion.div
//             custom={2}
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors"
//           >
//             <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
//             <div>
//               <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//                 {loading ? "..." : totalUsers || 0}
//               </span>
//               <p className="text-gray-700 dark:text-gray-300">Team Members</p>
//             </div>
//           </motion.div>
//         </div>

//         {/* How to Use */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
//         >
//           <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//             Getting Started
//           </h2>
//           <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
//             {[
//               "Create a user account to get started.",
//               "Set up your store to organize audit data.",
//               "Create audit questions tailored to your needs.",
//               "Submit responses to the audit questions.",
//               "View and analyze audit responses in your dashboard.",
//             ].map((item, index) => (
//               <li key={index} className="flex items-start">
//                 <span className="font-semibold text-blue-600 dark:text-blue-400 mr-2">
//                   {index + 1}.
//                 </span>
//                 <span>{item}</span>
//               </li>
//             ))}
//           </ol>
//         </motion.div>

//         {/* Actions */}
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
//             aria-label="Create new project"
//           >
//             <Folder className="w-5 h-5" />
//             <Link href="/audita=s">Create New Project</Link>
//           </motion.button>
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
//             aria-label="Review tasks"
//           >
//             <Store className="w-5 h-5" />
//             <Link href="/responses">Review Tasks</Link>
//           </motion.button>
//           <motion.button
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//             className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
//             aria-label="Invite team member"
//           >
//             <Users className="w-5 h-5" />
//             <Link href="/users">Invite Team Member</Link>
           
//           </motion.button>
//         </div>
//       </div>
//       {/* Background Decoration */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-0 left-0 h-1/2 w-1/2 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 dark:from-blue-900/20 dark:to-indigo-900/20 blur-3xl" />
//       </div>
//     </div>
//   );
// }
