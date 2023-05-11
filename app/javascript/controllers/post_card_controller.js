import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  connect() {
    setTimeout(() => {
      console.log(this.element);
      console.log("connected");
      const evenCards = this.element.querySelectorAll(
        ".post-card:nth-child(even)"
      );
      evenCards.forEach((card) => {
        const firstElement = card.querySelector(".part:first-child");
        const secondElement = card.querySelector(".part:last-child");
        secondElement.classList.remove("ml-auto");
        firstElement.classList.add("ml-4");
        card.insertBefore(secondElement, firstElement);
      });
    });
  }
}
