import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["switch", "form", "title", "input", "links"];

  clicked() {
    this.switchTarget.classList.toggle("switched");

    const toggleTitle = () => {
      if (this.switchTarget.classList.contains("switched")) {
        this.titleTargets.forEach((element) => {
          element.textContent = "Sign up";
        });
      } else {
        this.titleTargets.forEach((element) => {
          element.textContent = "Log in";
        });
      }
    };

    const toggleLinksVisibility = () => {
      this.linksTargets.forEach((element) => {
        element.classList.toggle("hidden");
      });
    };

    const toggleForm = () => {
      console.log(this.formTarget);
      // this.formTarget.action
    };

    toggleTitle();
    toggleLinksVisibility();
    toggleForm();
  }
}
