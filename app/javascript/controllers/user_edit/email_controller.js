import { Controller } from "@hotwired/stimulus";
import { post } from "@rails/request.js";
export default class extends Controller {
  connect() {
    const enableEmailChecked = new CustomEvent("enable-email-checked");
    document.dispatchEvent(enableEmailChecked);
  }

  searchEmail(event, delay = 1000) {
    clearTimeout(this.emailDebounceTimer);
    this.emailDebounceTimer = setTimeout(async () => {
      const email = event.target.value;
      const response = await post("/users/check_email", {
        body: JSON.stringify({
          email,
        }),
      });
      const responseJson = await response.response.json();
      if (responseJson.validEmail) {
        const disableEmailChecked = new CustomEvent("disable-email-checked");
        document.dispatchEvent(disableEmailChecked);
      } else {
        const enableEmailChecked = new CustomEvent("enable-email-checked");
        document.dispatchEvent(enableEmailChecked);
      }
    }, delay);
  }
}
