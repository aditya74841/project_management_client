"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Form Input Component
const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};

// Form Select Component
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 dark:text-white"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 dark:text-white resize-none"
      />
    </div>
  );
};

// Submit Button Component
const SubmitButton = ({ isLoading, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// Alert Component
const Alert = ({ type, message, onClose }) => {
  const alertClasses = {
    success:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
    error:
      "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
  };

  return (
    <div className={`border rounded-lg p-4 ${alertClasses[type]}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-current hover:opacity-70 transition-opacity ml-4"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Request a Demo
      </h1>

      {/* Container for home and paragraph */}
      <div className="relative flex items-center justify-center">
        {/* Home button aligned left */}
        <a href="/" className="absolute left-0 text-blue-600 hover:underline">
          Home
        </a>

        {/* Centered paragraph */}
        <p className="text-xl text-gray-600 dark:text-gray-300">
          See how Audit Pro streamlines your auditing process
        </p>
      </div>
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: "🔍",
      title: "Advanced Analytics",
      description: "Comprehensive audit insights",
    },
    {
      icon: "⚡",
      title: "Process Automation",
      description: "Streamline repetitive tasks",
    },
    {
      icon: "📊",
      title: "Real-time Reporting",
      description: "Live dashboard updates",
    },
    {
      icon: "🔒",
      title: "Security Focused",
      description: "Enterprise-grade protection",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/20"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{feature.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Form Component
const RequestDemoForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    companySize: "",
    auditNeeds: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const companySizeOptions = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "200+", label: "200+ employees" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setAlert({ type: "error", message: "Please enter your full name" });
      return false;
    }
    if (!formData.email.trim()) {
      setAlert({ type: "error", message: "Please enter your email address" });
      return false;
    }
    if (!formData.companyName.trim()) {
      setAlert({ type: "error", message: "Please enter your company name" });
      return false;
    }
    if (!formData.companySize) {
      setAlert({ type: "error", message: "Please select your company size" });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlert({
        type: "error",
        message: "Please enter a valid email address",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setAlert(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.SERVER_URL}/demoRequest/create`,
        formData
      );

      setAlert({
        type: "success",
        message:
          "Demo request submitted successfully! We'll contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        companyName: "",
        companySize: "",
        auditNeeds: "",
      });

      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("The Error is:", error);
      setAlert({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Features */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Audit Pro?
            </h2>
            <FeaturesSection />

            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What's Included in the Demo?
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Live product walkthrough</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Custom use case discussion</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Q&A with our experts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Pricing and implementation details</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />

                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <FormInput
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Enter company name"
                />

                <FormSelect
                  label="Company Size"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  options={companySizeOptions}
                  required
                />
              </div>

              <FormTextarea
                label="Audit Needs (Optional)"
                name="auditNeeds"
                value={formData.auditNeeds}
                onChange={handleChange}
                placeholder="Tell us about your auditing needs (e.g., compliance, automation, risk assessment)"
                rows={4}
              />

              {alert && (
                <Alert
                  type={alert.type}
                  message={alert.message}
                  onClose={closeAlert}
                />
              )}

              <SubmitButton isLoading={isLoading} onClick={handleSubmit}>
                Request Demo
              </SubmitButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            By submitting this form, you agree to our{" "}
            <button className="text-blue-600 hover:underline dark:text-blue-400">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-blue-600 hover:underline dark:text-blue-400">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestDemoForm;
