"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "@/utils/showMessage";
import {
  userLogin,
  userProfile,
  clearMessages,
  validateAuthOnStart,
} from "@/redux/slices/authSlice";
import { useState, useEffect } from "react";
import LoginSheet from "../home/LoginSheet";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, loading, error, message } = useSelector(
    (state) => state.auth
  );

  // console.log("The is Logged In is",isLoggedIn)

  useEffect(() => {
    dispatch(userProfile());
  }, []);

  const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);

  // Handle success/error messages
  useEffect(() => {
    if (message && !loading) {
      showMessage(message, "success");
      dispatch(clearMessages());
      // dispatch(validateAuthOnStart());
    }
  }, [message, loading, dispatch]);

  useEffect(() => {
    if (error && !loading) {
      // dispatch(userProfile());

      showMessage(error, "error");
      dispatch(clearMessages());
    }
  }, [error, loading, dispatch]);

  // Auto-close drawer when login succeeds
  useEffect(() => {
    // const fetchProfile = async()=>{
    //   await dispatch(userProfile());
    // }

    // fetchProfile()
    if (isLoggedIn && isLoginDrawerOpen) {
      setLoginDrawerOpen(false);
    }
  }, [isLoggedIn, isLoginDrawerOpen]);

  const handleLogin = async (data) => {
    try {
      const result = await dispatch(
        userLogin({
          email: data.emailOrPhone,
          password: data.password,
        })
      ).unwrap();

      // Fetch user profile after successful login
      await dispatch(userProfile());

      return result;
    } catch (err) {
      // Error is handled by useEffect above
      throw err;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-slate-200/50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Audit Pro
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <LoginSheet
              isOpen={isLoginDrawerOpen}
              onOpenChange={setLoginDrawerOpen}
              onLogin={handleLogin}
              isLoading={loading}
            />
          ) : (
            <Link
              href="/dashboard"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-green-600 to-green-700 px-8 py-3 text-white font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
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
      </div>
    </nav>
  );
}

// "use client";

// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { showMessage } from "@/utils/showMessage";
// import { userLogin, userProfile } from "@/redux/slices/authSlice";
// import { useState } from "react";
// import LoginSheet from "../home/LoginSheet";
// import SignupSheet from "../home/SignupSheet";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const { isLoggedIn } = useSelector((state) => state.auth);

//   const [isLoginDrawerOpen, setLoginDrawerOpen] = useState(false);
//   const [isSignUpDrawerOpen, setSignUpDrawerOpen] = useState(false);

//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");

//   // const handleLogin = (e) => {
//   //   e.preventDefault();
//   //   if (!(email || phone) || !password) {
//   //     showMessage("Provide both email/phone and password", "error");
//   //     return;
//   //   }
//   //   dispatch(
//   //     userLogin({ email: email || phone, password }, (err) => {
//   //       if (err) {
//   //         console.log("The error is ",err)
//   //         showMessage(err.response?.data?.message || err.message, "error");
//   //       } else {
//   //         console.log("User loged In successfull");
//   //         showMessage("Login successful!");
//   //         setLoginDrawerOpen(false);
//   //         setEmail("");
//   //         setPhone("");
//   //         setPassword("");
//   //         dispatch(userProfile(() => {}));
//   //       }
//   //     })
//   //   );
//   // };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!(email || phone) || !password) {
//       showMessage("Provide both email/phone and password", "error");
//       return;
//     }

//     try {
//       // Dispatch and unwrap the result
//       const result = await dispatch(userLogin({
//         email: email || phone,
//         password
//       })).unwrap();

//       console.log("User logged in successfully", result);
//       showMessage("Login successful!");
//       setLoginDrawerOpen(false);
//       setEmail("");
//       setPhone("");
//       setPassword("");

//       // Fetch user profile
//       dispatch(userProfile());

//     } catch (err) {
//       console.log("The error is", err);
//       showMessage(err || "Login failed", "error");
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     if (!signupEmail || !signupPassword) {
//       showMessage("Provide email and password", "error");
//       return;
//     }
//     showMessage("Signup coming soon!", "info");
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (/^\d+$/.test(value)) {
//       setPhone(value);
//       setEmail("");
//     } else if (emailRegex.test(value)) {
//       setEmail(value);
//       setPhone("");
//     } else {
//       setEmail(value);
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         <h1 className="text-xl font-bold">Audit Pro</h1>
//         <div className="flex gap-3">
//           {/* {!isLoggedIn ? ( */}
//           <>
//             <LoginSheet
//               isOpen={isLoginDrawerOpen}
//               onOpenChange={setLoginDrawerOpen}
//               email={email}
//               setEmail={setEmail}
//               password={password}
//               setPassword={setPassword}
//               handleInputChange={handleInputChange}
//               handleLogin={handleLogin}
//             />
//             {/* <SignupSheet
//                 isOpen={isSignUpDrawerOpen}
//                 onOpenChange={setSignUpDrawerOpen}
//                 signupEmail={signupEmail}
//                 setSignupEmail={setSignupEmail}
//                 signupPassword={signupPassword}
//                 setSignupPassword={setSignupPassword}
//                 handleSignup={handleSignup}
//               /> */}
//           </>
//           {/* // ) : (
//           //   <Link
//           //     href="/dashboard"
//           //     className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-blue-700"
//           //   >
//           //     Dashboard
//           //   </Link>
//           // )} */}
//         </div>
//       </div>
//     </nav>
//   );
// }
