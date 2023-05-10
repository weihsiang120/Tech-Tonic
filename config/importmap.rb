# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin "vditor" # @3.9.2
pin "@rails/request.js", to: "https://ga.jspm.io/npm:@rails/request.js@0.0.8/src/index.js"
pin "sweetalert2", to: "https://ga.jspm.io/npm:sweetalert2@11.7.3/dist/sweetalert2.all.js"
pin "highlight.js", to: "https://ga.jspm.io/npm:highlight.js@11.8.0/es/index.js"
pin "tailwind-highlightjs", to: "https://ga.jspm.io/npm:tailwind-highlightjs@2.0.1/src/index.js"
pin "app-root-path", to: "https://ga.jspm.io/npm:app-root-path@3.1.0/browser-shim.js"
pin "atob", to: "https://ga.jspm.io/npm:atob@2.1.2/browser-atob.js"
pin "base64-js", to: "https://ga.jspm.io/npm:base64-js@1.5.1/index.js"
pin "buffer", to: "https://ga.jspm.io/npm:buffer@5.7.1/index.js"
pin "css", to: "https://ga.jspm.io/npm:css@3.0.0/index.js"
pin "decode-uri-component", to: "https://ga.jspm.io/npm:decode-uri-component@0.2.2/index.js"
pin "fs", to: "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/fs.js"
pin "ieee754", to: "https://ga.jspm.io/npm:ieee754@1.2.1/index.js"
pin "inherits", to: "https://ga.jspm.io/npm:inherits@2.0.4/inherits_browser.js"
pin "lodash.merge", to: "https://ga.jspm.io/npm:lodash.merge@4.6.2/index.js"
pin "path", to: "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/path.js"
pin "process", to: "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/process-production.js"
pin "source-map", to: "https://ga.jspm.io/npm:source-map@0.6.1/source-map.js"
pin "source-map-resolve", to: "https://ga.jspm.io/npm:source-map-resolve@0.6.0/index.js"
pin "sync-fetch", to: "https://ga.jspm.io/npm:sync-fetch@0.3.1/browser.js"
pin "tailwindcss/plugin", to: "https://ga.jspm.io/npm:tailwindcss@3.3.2/plugin.js"
pin "url", to: "https://ga.jspm.io/npm:@jspm/core@2.0.1/nodelibs/browser/url.js"
