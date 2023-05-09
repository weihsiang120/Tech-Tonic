import { Controller } from "@hotwired/stimulus";
import { successToast } from "../shard/alert.js";

export default class extends Controller {
  connect() {
    console.log("Hi");
  }

  clicked(event, delay = 180) {
    event.preventDefault();
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
      const userId = event.target.dataset.userId;
      const response = await fetch(`/users/${userId}/follow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        body: JSON.stringify({
          id: userId,
        }),
      });
      const responseJson = await response.json();
      if (responseJson.followed == true) {
        successToast(`已追蹤${event.target.dataset.username}`);
        this.element.textContent = "取消追蹤";
        this.element.classList.remove(
          "bg-project-blue-main",
          "hover:bg-project-blue-dark"
        );
        this.element.classList.add(
          "bg-project-gray-light",
          "hover:bg-project-gray-dark"
        );
        const updateNumber = new CustomEvent("update-number", {
          detail: {
            followed: true,
          },
        });
        document.dispatchEvent(updateNumber);
      } else {
        successToast(`已取消追蹤${event.target.dataset.username}`);
        this.element.textContent = "追蹤";
        this.element.classList.remove(
          "bg-project-gray-light",
          "hover:bg-project-gray-dark"
        );
        this.element.classList.add(
          "bg-project-blue-main",
          "hover:bg-project-blue-dark"
        );
        const updateNumber = new CustomEvent("update-number", {
          detail: {
            followed: false,
          },
        });
        document.dispatchEvent(updateNumber);
      }
    }, delay);
  }
}
