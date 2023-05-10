import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["a"];

  async deleteNotification(event) {
    event.stopPropagation();
    const notificationId = this.aTarget.dataset.notificationId;
    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    this.element.remove();
    const response = await fetch(`/notifications/${notificationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
    });
    const responseJson = await response.json();
    if (responseJson.deleted) {
      const updateCount = new CustomEvent("update-count");
      document.dispatchEvent(updateCount);
    }
    if (responseJson?.notification?.message) {
      console.log(responseJson.notification);
      const li = document.createElement("li");
      li.classList.add("relative");
      li.dataset.controller = "navbar--notification";

      const link = document.createElement("a");
      link.href = responseJson.notification.url;
      link.textContent = responseJson.notification.message;
      link.title = responseJson.notification.message;
      link.dataset.notificationId = responseJson.notification.id;
      link.setAttribute("data-navbar--notification-target", "a");
      link.classList.add(
        "mt-4",
        "inline-block",
        "px-4",
        "py-2",
        "rounded-md",
        "hover:shadow-md"
      );
      console.log(link);

      const closeButton = document.createElement("button");
      closeButton.classList.add(
        "absolute",
        "right-0",
        "px-2",
        "py-0",
        "bg-red-200",
        "rounded-full",
        "top-6",
        "text-project-white"
      );
      closeButton.dataset.action =
        "click->navbar--notification#deleteNotification";
      closeButton.textContent = "x";

      li.appendChild(link);
      li.appendChild(closeButton);
      console.log(li);
      document.querySelector("#notification-list").appendChild(li);
    }
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
}
