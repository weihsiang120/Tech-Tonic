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
      width: "1440",
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

    if (response.ok) {
      this.vditor.clearCache();
      successToast("新增成功");
      setTimeout(() => {
        window.location.href = "/posts";
      }, 1000);
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
        tag_list: "tagList",
        status: "published",
      }),
    });

    if (response.ok) {
      this.vditor.clearCache();
      successToast("發佈成功");
      setTimeout(() => {
        window.location.href = "/posts";
      }, 1000);
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

    // //標題
    const title = this.element.querySelector("#post_title").value || "無標題";
    // // 標籤
    const tagList = this.element.querySelector("#post_tag_list").value || "";
    //獲取文章目前狀態
    let currentState = this.element.querySelector('[name="currentState"]')
      .textContent;

    //獲取按鈕狀態
    let postStatus;

    this.element
      .querySelectorAll('[data-disable-with="發佈文章"]')
      .forEach((element) => {
        postStatus = element.getAttribute("data-disable-with");
      });
    currentState = "publish";

    // 發送API
    const response = await post("/posts", {
      body: JSON.stringify({
        content: el.textContent,
        title,
        tag_list: tagList,
        status: currentState,
      }),
    });

    if (response.ok) {
      this.vditor.clearCache();
      successToast("發佈成功");
      setTimeout(() => {
        window.location.href = "/posts";
      }, 500);
    }
  }
}
