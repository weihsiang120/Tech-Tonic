export function markedHighlight(e) {
  "function" === typeof e && (e = { highlight: e });
  if (!e || "function" !== typeof e.highlight)
    throw new Error("Must provide highlight function");
  "string" !== typeof e.langPrefix && (e.langPrefix = "language-");
  return {
    async: !!e.async,
    langPrefix: "",
    walkTokens(t) {
      if ("code" !== t.type) return;
      const n = getLang(t);
      if (e.async)
        return Promise.resolve(e.highlight(t.text, n)).then(updateToken(t));
      const r = e.highlight(t.text, n);
      updateToken(t)(r);
    },
    renderer: {
      code(t, n, r) {
        const o = (n || "").match(/\S*/)[0];
        const c = o ? ` class="${e.langPrefix}${escape(o)}"` : "";
        t = t.replace(/\n$/, "");
        return `<pre><code${c}>${r ? t : escape(t, true)}\n</code></pre>`;
      },
    },
  };
}
function getLang(e) {
  return (e.lang || "").match(/\S*/)[0];
}
function updateToken(e) {
  return (t) => {
    if ("string" === typeof t && t !== e.text) {
      e.escaped = true;
      e.text = t;
    }
  };
}
const e = /[&<>"']/;
const t = new RegExp(e.source, "g");
const n = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const r = new RegExp(n.source, "g");
const o = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const getEscapeReplacement = (e) => o[e];
function escape(o, c) {
  if (c) {
    if (e.test(o)) return o.replace(t, getEscapeReplacement);
  } else if (n.test(o)) return o.replace(r, getEscapeReplacement);
  return o;
}
export { escape, markedHighlight };
