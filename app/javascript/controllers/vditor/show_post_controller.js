import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
// Connects to data-controller="vditor--show-post"
export default class extends Controller {
  static targets = ["content"];
  connect() {
    const content = this.contentTarget.textContent.trim();
    // // 初始化 Vditor.js
    marked.use(
      markedHighlight({
        langPrefix: "hljs language-",
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      })
    );

    // this.contentTarget.innerHTML = marked.parse(this.contentTarget.textContent);
    this.contentTarget.innerHTML = marked.parse(content);
  }
}
