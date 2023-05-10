import { Controller } from "@hotwired/stimulus";
import Vditor from "vditor";
// Connects to data-controller="vditor--show-post"
export default class extends Controller {
  static targets = ["content"];
  connect() {
    // const vditor = new Vditor.preview(
    //   this.contentTarget,
    //   this.contentTarget.textContent
    // );
    const vditor = new Vditor.preview(
      this.contentTarget,
      this.contentTarget.textContent,
      {
        mode: "both",
        hljs: { style: "dracula", lineNumber: true },
      }
    );
  }
}
