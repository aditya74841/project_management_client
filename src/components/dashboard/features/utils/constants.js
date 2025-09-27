export const PRIORITY_OPTIONS = [
    { value: "low", label: "Low", color: "green", border: "border-l-green-500" },
    { value: "medium", label: "Medium", color: "yellow", border: "border-l-yellow-500" },
    { value: "high", label: "High", color: "orange", border: "border-l-orange-500" },
    { value: "urgent", label: "Urgent", color: "red", border: "border-l-red-500" },
  ];
  
  export const STATUS_OPTIONS = [
    { value: "pending", label: "Pending", color: "gray" },
    { value: "working", label: "Working", color: "blue" },
    { value: "blocked", label: "Blocked", color: "red" },
    { value: "completed", label: "Completed", color: "green" },
  ];
  
  export const KANBAN_COLUMNS = [
    { id: "pending", title: "To Do", color: "bg-gray-100" },
    { id: "working", title: "In Progress", color: "bg-blue-100" },
    { id: "blocked", title: "Blocked", color: "bg-red-100" },
    { id: "completed", title: "Completed", color: "bg-green-100" },
  ];
  