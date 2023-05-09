import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  updateNumber(e) {
    if (e.detail.followed) {
      this.element.textContent = Number(this.element.textContent) + 1;
    } else {
      this.element.textContent = Number(this.element.textContent) - 1;
    }
  }
}
