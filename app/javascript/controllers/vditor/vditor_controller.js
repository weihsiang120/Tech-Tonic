import { Controller } from "@hotwired/stimulus";
import Vditor from "vditor";
import { get, patch, post } from "@rails/request.js";
import { successToast } from "../shard/alert.js";
// Connects to data-controller="vditor"
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

  async create_post(c) {
    // 停止 form 表單預設 "送出" 事件
    c.preventDefault();

    // 建立元素塞入編輯器的內容
    let el = document.createElement("div");
    el.setAttribute("name", "post[content]");
    const content = this.vditor.getValue();
    el.textContent = content;

    const title = this.element.querySelector("#post_title").value || "無標題";

    // 發送API
    const response = await post("/posts", {
      body: JSON.stringify({ content: el.textContent, title }),
    });

    if (response.ok) {
      this.vditor.clearCache();
      successToast("新增成功");
      setTimeout(() => {
        window.location.href = "/posts";
      }, 500);
    } else {
      console.log(response.status);
    }
  }
}
