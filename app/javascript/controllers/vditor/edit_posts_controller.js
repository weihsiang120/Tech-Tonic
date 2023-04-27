import { Controller } from "@hotwired/stimulus";
import Vditor from "vditor";
// import { get, patch, post } from "@rails/request.js";
// import { successToast } from "./shard/alert.js";
// Connects to data-controller="vditor--edit-posts"
export default class extends Controller {
  connect() {
    const editorEl = this.element.querySelector("#vditor");
    const vditor = new Vditor(editorEl, {
      height: "100%",
      cache: {
        id: "vditor",
      },
      mode: "ir",
      preview: {
        delay: 1000,
        show: true,
      },
      counter: {
        enable: true,
      },
      after() {
        this.vditor = vditor;
        console.log("object");
      },
      cache: {
        enable: false,
      },
      lang: "zh_TW",
      width: "100%",
      theme: "classic",
    });
    this.vditor = vditor;
  }

  async update_post(c) {
    c.preventDefault();
    console.log(this.vditor.getValue());
    console.log(this.element.querySelector(".post_content").textContent);
    this.vditor.getValue() = this.element.querySelector(
      ".post_content"
    ).textContent;
  }
}
