import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["a"];

  async deleteNotification(event) {
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
  }
}
