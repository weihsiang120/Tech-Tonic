import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["select", "arrow", "menu", "selected"];
  connect() {
    this.selectedTarget.innerText = "English";
  }

  clicked() {
    this.selectTarget.classList.toggle("dropdown-select-clicked");
    this.arrowTarget.classList.toggle("dropdown-arrow-rotate");
    this.menuTarget.classList.toggle("dropdown-menu-open");
  }
  change(e) {
    this.selectedTarget.innerText = e.target.textContent.replace(/\s+/g, "");
    this.selectTarget.classList.remove("dropdown-select-clicked");
    this.arrowTarget.classList.remove("dropdown-arrow-rotate");
    this.menuTarget.classList.remove("dropdown-menu-open");
    this.menuTarget.querySelectorAll("li").forEach((li) => {
      li.classList.remove("dropdown-active");
    });
    e.target.classList.add("dropdown-active");
  }
}
