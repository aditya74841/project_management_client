"use client";

import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "../ui/sidebar";
import { handleLogout, userProfile } from "../HomePage/store";
import { useEffect } from "react";
import { showMessage } from "@/app/utils/showMessage";

export default function TopNavbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile, isLoggedIn } = useSelector((state) => state.auth);

  const onLogout = async () => {
    try {
      const result = await dispatch(handleLogout()).unwrap();
      router.push("/")
      // dispatch(userProfile())
    } catch (error) {}
  };

  // useEffect(() => {
  //   dispatch(
  //     userProfile((error) => {
  //       if (error && error.response?.status !== 401) {
  //         showMessage(error.response?.data?.message || error.message, "error");
  //       }
  //     })
  //   );
  // }, [dispatch]);

  return (
    <header className="w-full h-16 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl border-b border-white/10 flex items-center justify-between px-6 z-10 backdrop-blur-sm">
      {/* Left: App/Section Name */}
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
          <SidebarTrigger className="text-blue-300 hover:text-blue-200" />
        </div>
        <div className="text-lg font-bold text-white">
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Dashboard
          </span>
        </div>
      </div>

      {/* Right: Profile + Notifications */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative group p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 transform">
          <Bell className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/50">
            <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-ping"></span>
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>

        {/* Profile Avatar with Dropdown */}
        <div className="relative group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-white/20 backdrop-blur-sm">
            <span className="text-sm">
              {profile?.name?.charAt(0)?.toUpperCase() || "A"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-12 w-48 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
            <div className="p-2">
              {/* User Info Section */}
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="text-sm font-medium text-white">{profile?.name}</p>
                <p className="text-xs text-blue-300/80">{profile?.email}</p>
              </div>

              {/* Menu Items */}
              <a
                href="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2 text-sm text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group/item"
              >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                Profile
              </a>

              {/* <a 
                href="/dashboard/settings" 
                className="flex items-center gap-3 px-3 py-2 text-sm text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group/item"
              >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                Settings
              </a> */}

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-1"></div>

              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-all duration-200 group/item"
              >
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                Logout
              </button>
            </div>

            {/* Dropdown Arrow */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-800 border-l border-t border-white/10 transform rotate-45"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
