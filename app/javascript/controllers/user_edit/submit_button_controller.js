import { Controller } from "@hotwired/stimulus";
import { post } from "@rails/request.js";

export default class extends Controller {
  checker(e) {
    switch (e.type) {
      case "disable-email-checked":
        this.element.classList.remove("email-checked");
        break;
      case "enable-email-checked":
        this.element.classList.add("email-checked");
        break;
      case "disable-password-checked":
        this.element.classList.remove("password-checked");
        break;
      case "enable-password-checked":
        this.element.classList.add("password-checked");
        break;
    }

    if (
      this.element.classList.contains("email-checked") &&
      this.element.classList.contains("password-checked")
    ) {
      this.element.disabled = false;
      this.element.classList.remove("bg-gray-400", "cursor-not-allowed");
      this.element.classList.add(
        "bg-blue-400",
        "hover-bg-blue-500",
        "cursor-pointer"
      );
    } else {
      this.element.disabled = true;
      this.element.classList.add("bg-gray-400", "cursor-not-allowed");
      this.element.classList.remove(
        "bg-blue-400",
        "hover-bg-blue-500",
        "cursor-pointer"
      );
    }
  }
}
