import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const FormField = ({
  id,
  name,
  label,
  type = 'text',
  required = false,
  value,
  error,
  onChange,
  onBlur,
  placeholder,
  helpText
}) => {
  const hasError = !!error;
  const hasValue = !!value;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 pr-10 ${
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : hasValue
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 pr-10 ${
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : hasValue
                ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
        )}
        
        {(hasError || hasValue) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-gray-500 text-sm">{helpText}</p>
      )}
    </div>
  );
};

export default FormField;



// // app/dashboard/companies/components/FormField.jsx
// import React from 'react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { AlertCircle, CheckCircle } from 'lucide-react';

// const FormField = ({
//   id,
//   name,
//   label,
//   type = 'text',
//   required = false,
//   value,
//   error,
//   onChange,
//   onBlur,
//   placeholder,
//   helpText
// }) => {
//   const hasError = !!error;
//   const hasValue = !!value;

//   return (
//     <div className="space-y-2">
//       <Label htmlFor={id} className="text-gray-700 font-medium">
//         {label} {required && <span className="text-red-500">*</span>}
//       </Label>
      
//       <div className="relative">
//         <Input
//           id={id}
//           name={name}
//           type={type}
//           value={value}
//           onChange={onChange}
//           onBlur={onBlur}
//           placeholder={placeholder}
//           className={`pr-10 ${
//             hasError
//               ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
//               : hasValue
//               ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
//               : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
//           }`}
//         />
        
//         {(hasError || hasValue) && (
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             {hasError ? (
//               <AlertCircle className="w-5 h-5 text-red-500" />
//             ) : (
//               <CheckCircle className="w-5 h-5 text-green-500" />
//             )}
//           </div>
//         )}
//       </div>
      
//       {error && (
//         <p className="text-red-500 text-sm flex items-center gap-2">
//           <AlertCircle className="w-4 h-4" />
//           {error}
//         </p>
//       )}
      
//       {helpText && !error && (
//         <p className="text-gray-500 text-sm">{helpText}</p>
//       )}
//     </div>
//   );
// };

// export default FormField;
