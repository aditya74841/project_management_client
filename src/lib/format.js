import { format } from "date-fns";

/**
 * Global Formatting Utilities
 * Standardizes how data is presented to the user across the app.
 */

// 1. Date Formatting
export const formatDate = (date, pattern = "MMM dd, yyyy") => {
  if (!date) return "N/A";
  try {
    return format(new Date(date), pattern);
  } catch (err) {
    return "Invalid Date";
  }
};

// 2. Relative Time (e.g., "2 hours ago")
export const formatTimeAgo = (date) => {
  if (!date) return "";
  try {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return formatDate(date);
  } catch (err) {
    return "";
  }
};

// 3. Number/Currency
export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

// 4. Text Utilities
export const truncate = (text, length = 100) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

// 5. String to Initials
export const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
