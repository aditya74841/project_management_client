// // app/dashboard/companies/hooks/useCompanyForm.js
// import { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import {
//   createCompany,
//   updateCompany,
// } from "../../../../redux/slices/companySlice";
// import {
//   validateCompanyForm,
//   validateField,
// } from "@/lib/validations/companyValidation";

// export const useCompanyForm = () => {
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     domain: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const validateForm = useCallback(() => {
//     const validation = validateCompanyForm(formData);
//     setErrors(validation.errors);
//     return validation.isValid;
//   }, [formData]);

//   const handleChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;

//       setFormData((prev) => ({ ...prev, [name]: value }));

//       // Real-time validation
//       const fieldError = validateField(name, value, formData);
//       setErrors((prev) => ({ ...prev, [name]: fieldError }));
//     },
//     [formData]
//   );

//   const handleBlur = useCallback((e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//   }, []);

//   const handleSubmit = useCallback(
//     async (data, editingId = null) => {
//       // Mark all fields as touched
//       setTouched({ name: true, email: true, domain: true });

//       if (!validateForm()) {
//         return false;
//       }

//       try {
//         const companyData = {
//           name: data.name.trim(),
//           email: data.email.trim(),
//           domain: data.domain?.trim() || null,
//         };

//         if (editingId) {
//           await dispatch(
//             updateCompany({
//               companyId: editingId,
//               ...companyData,
//             })
//           ).unwrap();
//         } else {
//           await dispatch(createCompany(companyData)).unwrap();
//         }

//         return true;
//       } catch (error) {
//         console.error("Form submission error:", error);
//         return false;
//       }
//     },
//     [dispatch, validateForm]
//   );

//   const resetForm = useCallback(() => {
//     setFormData({ name: "", email: "", domain: "" });
//     setErrors({});
//     setTouched({});
//   }, []);

//   const validation = validateCompanyForm(formData);

//   return {
//     formData,
//     setFormData,
//     errors,
//     touched,
//     isValid: validation.isValid,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     resetForm,
//   };
// };


// app/dashboard/companies/hooks/useCompanyForm.js
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  createCompany,
  updateCompany,
} from "../../../../redux/slices/companySlice";
import {
  validateCompanyForm,
  validateField,
} from "@/lib/validations/companyValidation";
export const useCompanyForm = () => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: '',
    status: 'active', // Add default status
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = useCallback(() => {
    const validation = validateCompanyForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation (skip validation for status as it's always valid)
    if (name !== 'status') {
      const fieldError = validateField(name, value, formData);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  }, [formData]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(async (data, editingId = null) => {
    // Mark all fields as touched
    setTouched({ name: true, email: true, domain: true, status: true });
    
    if (!validateForm()) {
      return false;
    }

    try {
      const companyData = {
        name: data.name.trim(),
        email: data.email.trim(),
        domain: data.domain?.trim() || null,
        status: data.status || 'active', // Include status
      };

      if (editingId) {
        await dispatch(updateCompany({ 
          companyId: editingId, 
          ...companyData 
        })).unwrap();
      } else {
        await dispatch(createCompany(companyData)).unwrap();
      }

      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    }
  }, [dispatch, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', domain: '', status: 'active' });
    setErrors({});
    setTouched({});
  }, []);

  const validation = validateCompanyForm(formData);

  return {
    formData,
    setFormData,
    errors,
    touched,
    isValid: validation.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};
