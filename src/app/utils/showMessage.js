import Swal from "sweetalert2";
import { toast } from "sonner";

/**
 * Standard Toast Notification using Sonner
 * @param {string} msg
 * @param {string} type - success | error | warning | info
 */
export const showMessage = (msg = "", type = "success") => {
  if (!msg) return;

  switch (type) {
    case "success":
      toast.success(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "warning":
      toast.warning(msg);
      break;
    case "info":
      toast.info(msg);
      break;
    default:
      toast(msg);
  }
};

/**
 * Permanent Message Modal using SweetAlert2
 * @param {string} msg
 * @param {string} type - success | error | warning | info
 */
export const showPermanentMessage = (msg = "", type = "success") => {
  Swal.fire({
    icon: type,
    title: msg,
    confirmButtonColor: "#0f172a", // slate-950
  });
};