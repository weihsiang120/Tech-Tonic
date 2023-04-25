# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin "vditor" # @3.9.2
pin "@toast-ui/editor", to: "https://ga.jspm.io/npm:@toast-ui/editor@3.2.2/dist/esm/index.js"
pin "orderedmap", to: "https://ga.jspm.io/npm:orderedmap@2.1.0/dist/index.js"
pin "prosemirror-commands", to: "https://ga.jspm.io/npm:prosemirror-commands@1.5.1/dist/index.js"
pin "prosemirror-history", to: "https://ga.jspm.io/npm:prosemirror-history@1.3.0/dist/index.js"
pin "prosemirror-inputrules", to: "https://ga.jspm.io/npm:prosemirror-inputrules@1.2.0/dist/index.js"
pin "prosemirror-keymap", to: "https://ga.jspm.io/npm:prosemirror-keymap@1.2.1/dist/index.js"
pin "prosemirror-model", to: "https://ga.jspm.io/npm:prosemirror-model@1.19.0/dist/index.js"
pin "prosemirror-state", to: "https://ga.jspm.io/npm:prosemirror-state@1.4.2/dist/index.js"
pin "prosemirror-transform", to: "https://ga.jspm.io/npm:prosemirror-transform@1.7.1/dist/index.js"
pin "prosemirror-view", to: "https://ga.jspm.io/npm:prosemirror-view@1.30.2/dist/index.js"
pin "rope-sequence", to: "https://ga.jspm.io/npm:rope-sequence@1.3.3/dist/index.es.js"
pin "w3c-keyname", to: "https://ga.jspm.io/npm:w3c-keyname@2.2.6/index.es.js"
pin "@rails/request.js", to: "https://ga.jspm.io/npm:@rails/request.js@0.0.8/src/index.js"
pin "@toast-ui/editor-plugin-code-syntax-highlight", to: "https://ga.jspm.io/npm:@toast-ui/editor-plugin-code-syntax-highlight@3.1.0/dist/toastui-editor-plugin-code-syntax-highlight.js"
