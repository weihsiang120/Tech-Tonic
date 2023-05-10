import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  connect() {
    if (Number(this.element.textContent) === 0) {
      this.element.classList.add("hidden");
    }
  }
  updateCount() {
    this.element.textContent = Number(this.element.textContent) - 1;
    if (Number(this.element.textContent) === 0) {
      this.element.classList.add("hidden");
    }
  }
}
