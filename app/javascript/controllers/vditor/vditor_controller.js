import { Controller } from "@hotwired/stimulus";
import Vditor from "vditor";
import { get, patch, post } from "@rails/request.js";
import { successToast } from "../shard/alert.js";
// Connects to data-controller="vditor"
export default class extends Controller {
  connect() {
    const editorEl = this.element.querySelector("#vditor");
    const vditor = new Vditor(editorEl, {
      cache: {
        id: "vditor",
      },
      mode: "ir",
      preview: {
        delay: 1000,
        show: true,
      },
      value: " ",
      counter: {
        enable: true,
      },
      type:'text',
      after() {
      },
      cache: {
        enable: false,
      },
      lang: "zh_TW",
      theme: "classic",
      width:"1440"
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

    const tagList = this.element.querySelector("#post_tag_list").value || "";

    // 發送API
    const response = await post("/posts", {
      body: JSON.stringify({
        content: el.textContent,
        title,
        tag_list: tagList,
      }),
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

// async

// create_post(e) {
// 停止 form 表單預設 "送出" 事件
// e.preventDefault();
// 建立一個元素將編輯器的值塞入

// let el = document.createElement("div");
// el.setAttribute("name", "post[content]");
// const content = this.editor.getHTML();
// el.textContent = content;
// const title = this.element.querySelector("#post_title").value;

// console.log(this.element.querySelector("#post_title").value);
//console.log(el); // <div name="article[content]">
//console.log(el.textContent); // <div name="article[content]

// 發送API;
// const response = await post("/posts", {
//   body: JSON.stringify({ content: el.textContent, title }),
// });

// if (response.ok) {
//   this.editor.reset();
//   get("/posts");
// } else {
//   console.log(response.status);
// }
//   }
// }
