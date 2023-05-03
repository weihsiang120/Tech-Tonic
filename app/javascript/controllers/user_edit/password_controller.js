import { Controller } from "@hotwired/stimulus";
import { post } from "@rails/request.js";

export default class extends Controller {
  static targets = ["newPassword", "newPasswordConfirmation", "oldPassword"];
  connect() {}

  setNewPassword() {
    if (this.newPasswordTarget.value.length >= 6) {
      this.newPasswordConfirmationTarget.disabled = false;
      this.newPasswordConfirmationTarget.classList.remove(
        "cursor-not-allowed",
        "bg-project-gray-light"
      );
      if (
        this.newPasswordTarget.value == this.newPasswordConfirmationTarget.value
      ) {
        const enablePasswordChecked = new CustomEvent(
          "enable-password-checked"
        );
        document.dispatchEvent(enablePasswordChecked);
      } else {
        const disablePasswordChecked = new CustomEvent(
          "disable-password-checked"
        );
        document.dispatchEvent(disablePasswordChecked);
      }
    } else if (this.newPasswordTarget.value === "") {
      this.newPasswordConfirmationTarget.disabled = true;
      this.newPasswordConfirmationTarget.classList.add(
        "cursor-not-allowed",
        "bg-project-gray-light"
      );
      this.newPasswordConfirmationTarget.value = "";
      const enablePasswordChecked = new CustomEvent("enable-password-checked");
      document.dispatchEvent(enablePasswordChecked);
    } else {
      this.newPasswordConfirmationTarget.disabled = true;
      this.newPasswordConfirmationTarget.classList.add(
        "cursor-not-allowed",
        "bg-project-gray-light"
      );
      this.newPasswordConfirmationTarget.value = "";
      const disablePasswordChecked = new CustomEvent(
        "disable-password-checked"
      );
      document.dispatchEvent(disablePasswordChecked);
    }
  }

  checkPassword(event, delay = 750) {
    clearTimeout(this.passwordDebounceTimer);
    this.passwordDebounceTimer = setTimeout(async () => {
      const password = event.target.value;
      const response = await post("/users/check_password", {
        body: JSON.stringify({
          password,
        }),
      });
      const responseJson = await response.response.json();
      if (responseJson.passwordChecked) {
        this.newPasswordTarget.disabled = false;
        this.newPasswordTarget.classList.remove(
          "cursor-not-allowed",
          "bg-project-gray-light"
        );
        const enablePasswordChecked = new CustomEvent(
          "enable-password-checked"
        );
        document.dispatchEvent(enablePasswordChecked);
      } else {
        this.newPasswordTarget.disabled = true;
        this.newPasswordTarget.classList.add(
          "cursor-not-allowed",
          "bg-project-gray-light"
        );
        this.newPasswordConfirmationTarget.disabled = true;
        this.newPasswordConfirmationTarget.classList.add(
          "cursor-not-allowed",
          "bg-project-gray-light"
        );
        const disablePasswordChecked = new CustomEvent(
          "disable-password-checked"
        );
        document.dispatchEvent(disablePasswordChecked);
        this.newPasswordTarget.value = "";
        this.newPasswordConfirmationTarget.value = "";
      }
    }, delay);
  }
}
