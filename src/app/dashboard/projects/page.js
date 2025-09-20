import LoadingState from "@/components/dashboard/LoadingState";
import ProjectPageClient from "@/components/dashboard/projects/components/ProjectPageClient";
import { Suspense } from "react";

// optional – keep client-side fetch
const getInitialProjects = async () => null;

export default async function ProjectsPage() {
  const initialData = await getInitialProjects();
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <p className="text-gray-600 mt-2">
          Manage projects, members, features and visibility
        </p>
      </div>

      <Suspense fallback={<LoadingState />}>
        <ProjectPageClient initialData={initialData} />
      </Suspense>
    </div>
  );
}

export const metadata = {
  title: "Projects | Audit Pro",
  description: "Manage company projects and their members",
};

// import React from 'react'

// const page = () => {
//   return (
//     <div className='bg-black'>THis is tge page</div>
//   )
// }

// export default page