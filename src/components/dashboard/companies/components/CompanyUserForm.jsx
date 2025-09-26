import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { createUserBySuperAdmin } from "@/redux/slices/userClientSlice";
import {
  fetchCompanyUsers,
  selectCompanyUsers,
  selectCompanyUsersLoading,
  selectCompanyUsersError,
} from "@/redux/slices/companySlice";

const RegisterForm = ({ companyId }) => {
  const dispatch = useDispatch();
  const companyUsers = useSelector(selectCompanyUsers);
  const companyUsersLoading = useSelector(selectCompanyUsersLoading);
  const companyUsersError = useSelector(selectCompanyUsersError);

  // We track the last added user for feedback
  const [lastAddedUserId, setLastAddedUserId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (companyId) dispatch(fetchCompanyUsers(companyId));
  }, [dispatch, companyId]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validate fields
  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "Invalid email format";
    if (!data.password.trim()) errs.password = "Password is required";
    else if (data.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...formData, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  // On submit, register user and refresh users list
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await dispatch(
        createUserBySuperAdmin({ ...formData, companyId, role: "ADMIN" })
      ).unwrap();
      setFormData({ name: "", email: "", password: "" });
      setTouched({});
      setShowSuccess(true);
      setLastAddedUserId(response?.user?._id);
      // Re-fetch users so the new user appears instantly
      dispatch(fetchCompanyUsers(companyId));
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      setErrors({ api: error.message || "Registration failed" });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold">Register New Admin</h2>
          <p className="text-gray-500 text-sm">Add a new company admin user</p>
        </div>
        <FormField
          id="name"
          name="name"
          label="Full Name"
          required
          value={formData.name}
          error={touched.name ? errors.name : null}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter full name"
        />
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          value={formData.email}
          error={touched.email ? errors.email : null}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email address"
        />
        <div className="relative">
          <FormField
            id="password"
            name="password"
            label="Password"
            type={showPwd ? "text" : "password"}
            required
            value={formData.password}
            error={touched.password ? errors.password : null}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3 top-9 text-gray-400 focus:outline-none"
            tabIndex={-1}
          >
            {showPwd ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.api && (
          <div className="text-red-500 text-sm">{errors.api}</div>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        {showSuccess && (
          <div className="flex items-center justify-center gap-2 text-green-600 mt-2 text-sm">
            <CheckCircle className="w-5 h-5" />
            User created successfully!
          </div>
        )}
      </form>

      <div>
        <h3 className="font-semibold text-lg mb-3 text-gray-700">
          Current Company Users
        </h3>
        {companyUsersLoading ? (
          <div className="text-blue-500 text-sm">Loading users...</div>
        ) : companyUsersError ? (
          <div className="text-red-500 text-sm">{companyUsersError}</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {companyUsers.length > 0 ? (
              companyUsers.map((user) => (
                <li
                  key={user._id}
                  className={`py-2 px-2 flex items-center ${
                    lastAddedUserId === user._id ? "bg-green-50 font-bold rounded" : ""
                  }`}
                >
                  <span>{user.name}</span>
                  {lastAddedUserId === user._id && (
                    <CheckCircle className="w-4 h-4 ml-2 text-green-600" />
                  )}
                </li>
              ))
            ) : (
              <li className="py-2 text-gray-400">No users in company.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;




// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import FormField from "./FormField";
// import { createUserBySuperAdmin } from "@/redux/slices/userClientSlice";
// import {
//   fetchCompanyUsers,
//   selectCompanyUsers,
//   selectCompanyUsersLoading,
//   selectCompanyUsersError,
// } from "@/redux/slices/companySlice";

// const RegisterForm = ({ companyId }) => {
//   const dispatch = useDispatch();
//   const companyUsers = useSelector(selectCompanyUsers);
//   const companyUsersLoading = useSelector(selectCompanyUsersLoading);
//   const companyUsersError = useSelector(selectCompanyUsersError);

//   useEffect(() => {
//     if (companyId) dispatch(fetchCompanyUsers(companyId));
//   }, [dispatch, companyId]);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [touched, setTouched] = useState({});
//   const [errors, setErrors] = useState({});
//   const [showPwd, setShowPwd] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const validate = (data) => {
//     const errs = {};
//     if (!data.name.trim()) errs.name = "Name is required";
//     if (!data.email.trim()) errs.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
//       errs.email = "Invalid email format";
//     if (!data.password.trim()) errs.password = "Password is required";
//     else if (data.password.length < 6)
//       errs.password = "Password must be at least 6 characters";
//     return errs;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     setErrors(validate({ ...formData, [name]: value }));
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     setErrors(validate(formData));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate(formData);
//     setErrors(validationErrors);
//     setTouched({ name: true, email: true, password: true });
//     if (Object.keys(validationErrors).length > 0) return;

//     setLoading(true);
//     try {
//       await dispatch(
//         createUserBySuperAdmin({ ...formData, companyId, role: "ADMIN" })
//       ).unwrap();
      
//       // if (onRegisterSuccess) onRegisterSuccess();
//       setFormData({ name: "", email: "", password: "" });
//       setTouched({});
//     } catch (error) {
//       setErrors({ api: error.message || "Registration failed" });
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-6">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <h2 className="text-2xl font-bold text-center">Register Admin</h2>
//         <FormField
//           id="name"
//           name="name"
//           label="Full Name"
//           required
//           value={formData.name}
//           error={touched.name ? errors.name : null}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           placeholder="Enter your full name"
//         />
//         <FormField
//           id="email"
//           name="email"
//           label="Email"
//           type="email"
//           required
//           value={formData.email}
//           error={touched.email ? errors.email : null}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           placeholder="Enter your email"
//         />
//         <div className="relative">
//           <FormField
//             id="password"
//             name="password"
//             label="Password"
//             type={showPwd ? "text" : "password"}
//             required
//             value={formData.password}
//             error={touched.password ? errors.password : null}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             placeholder="Enter password"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPwd((v) => !v)}
//             className="absolute right-3 top-9 text-gray-400 focus:outline-none"
//             tabIndex={-1}
//           >
//             {showPwd ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//         </div>
//         {errors.api && (
//           <div className="text-red-500 text-sm">{errors.api}</div>
//         )}
//         <Button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           {loading ? "Registering..." : "Register"}
//         </Button>
//       </form>
//       <div>
//         <h3 className="font-semibold text-lg mb-2 text-gray-600">Company Users</h3>
//         {companyUsersLoading ? (
//           <div className="text-blue-500 text-sm">Loading users...</div>
//         ) : companyUsersError ? (
//           <div className="text-red-500 text-sm">{companyUsersError}</div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {companyUsers.length > 0 ? (
//               companyUsers.map((user) => (
//                 <li key={user._id} className="py-2">{user.name}</li>
//               ))
//             ) : (
//               <li className="py-2 text-gray-400">No users in company.</li>
//             )}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;


