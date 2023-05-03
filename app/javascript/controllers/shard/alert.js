import Swal from "sweetalert2";

export function successToast(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      // 進度條
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
}

export function noticeToast(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      // 進度條
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "warning",
    title: message,
  });
}
