// // Get the directory name of the current module

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["localhost"], // ✅ cleaned up
//   },
//   env: {
//     MASTER_SERVER_URL: "http://localhost:8080/api/v1/master",
//     USER_SERVER_URL: "http://localhost:8080/api/v1/users",
//     COMPANY_SERVER_URL: "http://localhost:8080/api/v1",
//     NEXT_PUBLIC_COMPANY_SERVER_URL: "http://localhost:8080/api/v1",
//     NEXT_PUBLIC_SERVER_URL: "http://localhost:8080/api/v1",
//     SERVER_URL: "http://localhost:8080/api/v1",
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "project-management-server-zn4l.onrender.com"], // Add Render domain if serving images
  },
  env: {
    MASTER_SERVER_URL: "https://project-management-server-zn4l.onrender.com/api/v1/master",
    USER_SERVER_URL: "https://project-management-server-zn4l.onrender.com/api/v1/users",
    COMPANY_SERVER_URL: "https://project-management-server-zn4l.onrender.com/api/v1",
    NEXT_PUBLIC_COMPANY_SERVER_URL: "https://project-management-server-zn4l.onrender.com/api/v1",
    NEXT_PUBLIC_SERVER_URL: "https://project-management-server-zn4l.onrender.com/api/v1",
    SERVER_URL: "https://project-management-server-zn4l.onrender.com/api/v1",
  },
};

export default nextConfig;
