import { Controller } from "@hotwired/stimulus";
import { post } from "@rails/request.js";

export default class extends Controller {
  static targets = [
    "newPassword",
    "newPasswordConfirmation",
    "oldPassword",
    "submitButton",
  ];
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
        this.submitButtonTarget.disabled = false;
        this.submitButtonTarget.classList.remove(
          "bg-gray-400",
          "cursor-not-allowed"
        );
        this.submitButtonTarget.classList.add(
          "bg-blue-400",
          "hover-bg-blue-500",
          "cursor-pointer"
        );
      } else {
        this.submitButtonTarget.disabled = true;
        this.submitButtonTarget.classList.add(
          "bg-gray-400",
          "cursor-not-allowed"
        );
        this.submitButtonTarget.classList.remove(
          "bg-blue-400",
          "hover-bg-blue-500",
          "cursor-pointer"
        );
      }
    } else if (this.newPasswordTarget.value === "") {
      this.newPasswordConfirmationTarget.disabled = true;
      this.newPasswordConfirmationTarget.classList.add(
        "cursor-not-allowed",
        "bg-project-gray-light"
      );
      this.newPasswordConfirmationTarget.value = "";
      this.submitButtonTarget.disabled = false;
      this.submitButtonTarget.classList.remove(
        "bg-gray-400",
        "cursor-not-allowed"
      );
      this.submitButtonTarget.classList.add(
        "bg-blue-400",
        "hover-bg-blue-500",
        "cursor-pointer"
      );
    } else {
      this.newPasswordConfirmationTarget.disabled = true;
      this.newPasswordConfirmationTarget.classList.add(
        "cursor-not-allowed",
        "bg-project-gray-light"
      );
      this.newPasswordConfirmationTarget.value = "";
      this.submitButtonTarget.disabled = true;
      this.submitButtonTarget.classList.add(
        "bg-gray-400",
        "cursor-not-allowed"
      );
      this.submitButtonTarget.classList.remove(
        "bg-blue-400",
        "cursor-pointer",
        "hover:bg-blue-500"
      );
    }
  }

  checkPassword(event, delay = 750) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
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
        this.submitButtonTarget.disabled = false;
        this.submitButtonTarget.classList.remove(
          "bg-gray-400",
          "cursor-not-allowed"
        );
        this.submitButtonTarget.classList.add(
          "bg-blue-400",
          "cursor-pointer",
          "hover:bg-blue-500"
        );
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
        this.submitButtonTarget.disabled = true;
        this.submitButtonTarget.classList.add(
          "bg-gray-400",
          "cursor-not-allowed"
        );
        this.submitButtonTarget.classList.remove(
          "bg-blue-400",
          "cursor-pointer",
          "hover:bg-blue-500"
        );
        this.newPasswordTarget.value = "";
        this.newPasswordConfirmationTarget.value = "";
      }
    }, delay);
  }
}
