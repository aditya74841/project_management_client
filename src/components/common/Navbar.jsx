
"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@/utils/showMessage";
import {
  userLogin,
  userProfile,
  clearMessages,
} from "@/redux/slices/authSlice";
import { useState, useEffect } from "react";
import LoginSheet from "../home/LoginSheet";
import RegisterSheet from "../home/RegisterSheet";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, loading, error, message } = useSelector(
    (state) => state.auth
  );

  const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  // Handle success messages
  useEffect(() => {
    if (message && !loading) {
      showMessage(message, "success");
      dispatch(clearMessages());
    }
  }, [message, loading, dispatch]);

  // Handle error messages
  useEffect(() => {
    if (error && !loading) {
      showMessage(error, "error");
      dispatch(clearMessages());
    }
  }, [error, loading, dispatch]);

  // Auto-close drawers when login succeeds
  useEffect(() => {
    if (isLoggedIn && (isLoginDrawerOpen || isRegisterOpen)) {
      setLoginDrawerOpen(false);
      setIsRegisterOpen(false);
    }
  }, [isLoggedIn, isLoginDrawerOpen, isRegisterOpen]);

  const handleLogin = async (data) => {
    try {
      const result = await dispatch(
        userLogin({
          email: data.emailOrPhone,
          password: data.password,
        })
      ).unwrap();

      await dispatch(userProfile());
      return result;
    } catch (err) {
      throw err;
    }
  };

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md"
          : "bg-white/80 dark:bg-gray-900/80 shadow-sm"
      } backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Audit Pro
            </h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/docs"
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setLoginDrawerOpen(true)}
                  className="px-6 py-2 text-slate-700 dark:text-slate-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </>
            ) : (
              <Link
                href="/dashboard/projects"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-green-600 to-green-700 px-8 py-2.5 text-white font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Dashboard
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 text-slate-700 dark:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-slate-700 dark:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                onClick={closeMobileMenu}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-4 py-2"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                onClick={closeMobileMenu}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-4 py-2"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                onClick={closeMobileMenu}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-4 py-2"
              >
                FAQ
              </Link>
              <Link
                href="/docs"
                onClick={closeMobileMenu}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors px-4 py-2"
              >
                Docs
              </Link>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3 px-4">
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        setLoginDrawerOpen(true);
                        closeMobileMenu();
                      }}
                      className="w-full px-6 py-3 text-slate-700 dark:text-slate-300 font-semibold border-2 border-slate-300 dark:border-slate-600 rounded-full hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setIsRegisterOpen(true);
                        closeMobileMenu();
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full shadow-lg hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    Dashboard
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Sheets */}
      <LoginSheet
        isOpen={isLoginDrawerOpen}
        onOpenChange={setLoginDrawerOpen}
        onLogin={handleLogin}
        isLoading={loading}
      />
      <RegisterSheet
        isOpen={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
        onRegister={async (data) => {
          console.log("Register data:", data);
        }}
        onGoogleLogin={async () => {
          window.location.href = "/api/auth/google";
        }}
        onGithubLogin={async () => {
          window.location.href = "/api/auth/github";
        }}
      />
    </nav>
  );
}
