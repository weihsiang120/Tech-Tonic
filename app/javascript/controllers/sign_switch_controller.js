import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["switch", "title", "links"];

  connect() {
    console.log("Hi");
  }

  clicked() {
    this.switchTarget.classList.toggle("switched");

    const toggleTitle = () => {
      if (this.switchTarget.classList.contains("switched")) {
        this.titleTargets.forEach((element) => {
          element.textContent = "Sign up";
        });
      } else {
        this.titleTargets.forEach((element) => {
          element.textContent = "Login";
        });
      }
    };

    const toggleLinksVisibility = () => {
      this.linksTargets.forEach((element) => {
        element.classList.toggle("hidden");
      });
    };

    toggleTitle();
    toggleLinksVisibility();
    console.log(this.titleTargets);
    console.log("switched");
  }
}
