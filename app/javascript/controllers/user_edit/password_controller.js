import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["newPassword"];
  connect() {}

  setNewPassword(e) {
    if (e.target.value.length >= 6) {
      this.newPasswordTargets.forEach((target) => {
        target.disabled = false;
        target.classList.remove("cursor-not-allowed", "bg-project-gray-light");
      });
    } else {
      this.newPasswordTargets.forEach((target) => {
        target.disabled = true;
        target.classList.add("cursor-not-allowed", "bg-project-gray-light");
      });
    }
  }
}
