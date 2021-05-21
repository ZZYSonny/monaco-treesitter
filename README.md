WIP: A monaco editor library wrapper. Hopefully it will

- [] Show grammar errors before code execution through tree-sitter library, a incremental grammar parser.
- [] Provide easier apis for displaying compile error message. So type errors (which will not be generated from tree-sitter) can be generated on the server side, then displayed on the editor.


Workaround notes:
- Create React App does not support wasm. So I used craco following https://github.com/adimit/react-wasm-github-api-demo.