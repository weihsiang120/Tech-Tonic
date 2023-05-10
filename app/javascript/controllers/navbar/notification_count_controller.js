import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  connect() {
    setTimeout(() => {
      if (Number(this.element.textContent) >= 1) {
        this.element.classList.remove("hidden");
      } else {
        const notificationList = document.querySelector("#notification-list");
        if (notificationList.childElementCount === 0) {
          const noNotificationLi = document.createElement("li");
          const noNotificationMessage = document.createElement("h2");
          noNotificationMessage.textContent = "沒有新通知了～";
          noNotificationMessage.classList.add(
            "mt-4",
            "inline-block",
            "px-4",
            "py-2",
            "rounded-md",
            "hover:shadow-md"
          );
          noNotificationLi.appendChild(noNotificationMessage);
          notificationList.appendChild(noNotificationLi);
        }
      }
    });
  }
  updateCount() {
    this.element.textContent = Number(this.element.textContent) - 1;
    if (Number(this.element.textContent) === 0) {
      this.element.classList.add("hidden");
    }
  }
}
