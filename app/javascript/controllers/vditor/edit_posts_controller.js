import { Controller } from "@hotwired/stimulus";
import Vditor from "vditor";
import { successToast } from "../shard/alert";
import { get, patch, post, put } from "@rails/request.js";
// Connects to data-controller="vditor--edit-posts"
export default class extends Controller {
  connect() {
    let postContent = this.element.querySelector(".post_content").textContent;
    const editorEl = this.element.querySelector("#vditor");
    const vditor = new Vditor(editorEl, {
      height: "100%",
      cache: {
        id: "vditor",
        enable: false,
      },
      mode: "ir",
      preview: {
        delay: 1000,
        show: true,
      },
      counter: {
        enable: true,
      },
      value: postContent,
      after() {
        this.vditor = vditor;
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
    let el = document.createElement("div");
    el.setAttribute("name", "post[content]");
    const content = this.vditor.getValue();
    el.textContent = content;
    const title = this.element.querySelector("#post_title").value || "無標題";

    const tagList = this.element.querySelector("#post_tag_list").value;

    //獲取文章ID
    const postID = this.element
      .querySelector("form")
      .getAttribute("action")
      .match(/\d+$/)[0];

    // 發送API
    const response = await patch(`/posts/${postID}`, {
      body: JSON.stringify({
        content: el.textContent,
        title,
        tag_list: tagList,
      }),
    });

    if (response.ok) {
      successToast("更新成功");
      setTimeout(() => {
        window.location.href = "/posts";
      }, 500);
    } else {
      console.log(response.status);
    }
  }
}
