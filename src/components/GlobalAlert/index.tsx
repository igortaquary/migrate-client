type AlertTypes = "danger" | "success";

const icons: Record<AlertTypes, string> = {
  danger: '<i class="bi bi-x-circle"></i>',
  success: '<i class="bi bi-check-circle"></i>',
};

const showNotification = (type: AlertTypes, message: string) => {
  const alert = document.createElement("div");
  alert.setAttribute("class", `alert alert-${type}`);
  alert.setAttribute("role", "alert");
  alert.style.position = "fixed";
  alert.style.bottom = "20px";
  alert.style.left = "20px";
  alert.style.zIndex = "10";
  alert.innerHTML = icons[type] + " " + (message || "");
  document.body.appendChild(alert);

  setTimeout(() => {
    document.body.removeChild(alert);
  }, 5000);
};

export default showNotification;
