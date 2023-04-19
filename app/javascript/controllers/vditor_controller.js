import { Controller } from "@hotwired/stimulus";
import Vditor from "vditor";
// Connects to data-controller="vditor"
export default class extends Controller {
  connect() {
    console.log(this.element);
    const vditor = new Vditor(this.element, {
      height: "100%",
      cache: {
        id: "vditor",
      },
      mode: "ir",
      preview: {
        delay: 1000,
        show: true,
      },
      after() {
        this.vditor = vditor;
      },
      lang: "zh_TW",
      width: "100%",
      theme: "classic",
      list: {
        "ant-design": "Ant Design",
        dark: "Dark",
        light: "Light",
        wechat: "WeChat",
      },
    });
  }
}
