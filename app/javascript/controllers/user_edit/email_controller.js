import { Controller } from "@hotwired/stimulus";
import { post } from "@rails/request.js";
export default class extends Controller {
  debounceTimer = null;

  // debounce(callback, delay = 1000) {
  //   clearTimeout(this.debounceTimer);
  //   this.debounceTimer = setTimeout(() => {
  //     callback
  //   },delay)
  // }

  connect() {
    console.log(this.element);
  }

  searchEmail(event, delay = 1000) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      const email = event.target.value;
      const response = await post("/users/check_email", {
        body: JSON.stringify({
          email,
        }),
      });
      const responseJson = await response.response.json();
      if (responseJson.exists) {
        console.log("NO");
      } else {
        console.log("YES");
      }
    }, delay);
  }
}
