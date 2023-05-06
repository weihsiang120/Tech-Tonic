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
      type: "text",
      cache: {
        enable: false,
      },
      lang: "en_US",
      theme: "classic",
    });
    this.vditor = vditor;
  }
  // draft
  async create_post(c) {
    // 停止 form 表單預設 "送出" 事件
    c.preventDefault();

    // 建立元素塞入編輯器的內容
    let el = document.createElement("div");
    el.setAttribute("name", "post[content]");
    const content = this.vditor.getValue();
    el.textContent = content;
    // 標題
    const title = this.element.querySelector("#post_title").value || "無標題";
    // 標籤
    const tagList = this.element.querySelector("#post_tag_list").value || "";
    // 狀態

    // 發送API
    const response = await post("/posts", {
      body: JSON.stringify({
        content: el.textContent,
        title,
        tag_list: tagList,
        status: "draft",
      }),
    });

    const responseJson = await response.response.json();

    if (responseJson.success) {
      this.vditor.clearCache();
      successToast("新增成功");
      setTimeout(() => {
        window.location.href = "/posts";
      }, 1000);
    } else {
      const errorsUl = document.querySelector("#errors");
      errorsUl.classList.remove("hidden");
      errorsUl.innerHTML = "新增文章失敗";

      responseJson.errors.forEach((error) => {
        const li = document.createElement("li");
        li.textContent = error;
        errorsUl.insertAdjacentElement("beforeend", li);
      });
    }
  }

  // publish
  async publish_post(c) {
    // 停止 form 表單預設 "送出" 事件
    c.preventDefault();

    // 建立元素塞入編輯器的內容
    let el = document.createElement("div");
    el.setAttribute("name", "post[content]");
    const content = this.vditor.getValue();
    el.textContent = content;

    //標題
    const title = this.element.querySelector("#post_title").value || "無標題";
    // 標籤
    const tagList = this.element.querySelector("#post_tag_list").value || "";

    // 發送API
    const response = await post("/posts", {
      body: JSON.stringify({
        content: el.textContent,
        title,
        tag_list: tagList,
        status: "published",
      }),
    });

    const responseJson = await response.response.json();

    if (responseJson.success) {
      this.vditor.clearCache();
      successToast("發佈成功");
      setTimeout(() => {
        window.location.href = "/posts";
      }, 1000);
    } else {
      const errorsUl = document.querySelector("#errors");
      errorsUl.classList.remove("hidden");
      errorsUl.innerHTML = "新增文章失敗";
      console.log(responseJson);

      responseJson.errors.forEach((error) => {
        const li = document.createElement("li");
        li.textContent = error;
        errorsUl.insertAdjacentElement("beforeend", li);
      });
    }
  }
}
