WIP: A monaco editor library wrapper. Hopefully it will

- [] Show grammar errors before code execution through tree-sitter library, a incremental grammar parser.
- [] Provide easier apis for displaying compile error message. So type errors (which will not be generated from tree-sitter) can be generated on the server side, then displayed on the editor.


Workaround notes:
- Create React App, Webpack does not support local wasm
  - So I hacked tree-sitter.js
```
            //hack
            return fetch(
              "https://cdn.jsdelivr.net/npm/web-tree-sitter@0.19.4/tree-sitter.wasm"
            ).then(function (e) {
```
