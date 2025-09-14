"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { userProfile, updateAvatar } from "@/components/HomePage/store"; // Add updateAvatar
import toast from "react-hot-toast";
import { userProfile } from "@/redux/slices/authSlice";
// import { uploadAvatar, userProfile } from "@/components/HomePage/store";

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { profile, isLoggedIn } = useSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    console.log("Selected file:", file);
  
    const formData = new FormData();
    formData.append("avatar", file);
  
    try {
      setUploading(true);
      // const res = await dispatch(uploadAvatar(formData));
      console.log("Upload successful:", res);
  
      await dispatch(userProfile()); // Refresh profile
      toast.success("Avatar updated!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload avatar.");
    } finally {
      setUploading(false);
    }
  };
  

  if (!profile) {
    return <div className="p-4 text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="flex flex-col items-center relative">
        <img
          src={profile.avatar?.url || "https://via.placeholder.com/200x200.png"}
          alt="Avatar"
          className="w-32 h-32 rounded-full shadow mb-4 object-cover cursor-pointer"
          onClick={handleAvatarClick}
        />
        {uploading && (
          <div className="absolute top-12 text-xs bg-white px-2 py-1 rounded shadow text-gray-700">
            Uploading...
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
        <p className="text-gray-500">{profile.email}</p>
        <span className="mt-2 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          Role: {profile.role}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Phone Number:</span>
          <span>{profile.phoneNumber || "Not provided"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Login Type:</span>
          <span>{profile.loginType}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Email Verified:</span>
          <span className={profile.isEmailVerified ? "text-green-600" : "text-red-600"}>
            {profile.isEmailVerified ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Store Name:</span>
          <span>{profile.storeName || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Joined On:</span>
          <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;












// "use client";
// import { userProfile } from "@/components/HomePage/store";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(userProfile());
//   }, [dispatch]);

//   if (!profile) {
//     return <div className="p-4 text-center text-gray-500">Loading profile...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
//       <div className="flex flex-col items-center">
//         <img
//           src={profile.avatar?.url || "https://via.placeholder.com/200x200.png"}
//           alt="Avatar"
//           className="w-32 h-32 rounded-full shadow mb-4 object-cover"
//         />
//         <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
//         <p className="text-gray-500">{profile.email}</p>
//         <span className="mt-2 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
//           Role: {profile.role}
//         </span>
//       </div>

//       <div className="mt-6 space-y-4">
//         <div className="flex justify-between border-b pb-2">
//           <span className="font-medium text-gray-600">Phone Number:</span>
//           <span>{profile.phoneNumber || "Not provided"}</span>
//         </div>
//         <div className="flex justify-between border-b pb-2">
//           <span className="font-medium text-gray-600">Login Type:</span>
//           <span>{profile.loginType}</span>
//         </div>
//         <div className="flex justify-between border-b pb-2">
//           <span className="font-medium text-gray-600">Email Verified:</span>
//           <span className={profile.isEmailVerified ? "text-green-600" : "text-red-600"}>
//             {profile.isEmailVerified ? "Yes" : "No"}
//           </span>
//         </div>
//         <div className="flex justify-between border-b pb-2">
//           <span className="font-medium text-gray-600">Store Name:</span>
//           <span>{profile.storeName || "N/A"}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium text-gray-600">Joined On:</span>
//           <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
