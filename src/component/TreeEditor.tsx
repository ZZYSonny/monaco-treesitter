import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import Parser from 'web-tree-sitter';
import './TreeEditor.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorProps{
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorState{
}

export class TreeEditor extends React.Component<EditorProps,EditorState>{
  constructor(props: EditorProps) {
    const a = Parser;
    super(props);
    this.state = {
    };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Parser.init().then(()=>{console.log(1);});
  }

  async handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const model = editor.getModel()!;
    //await Parser.init();
    //const parser = new Parser();
    //const parserLanguage = await Parser.Language.load('../../node_modules/tree-sitter-wasm-prebuilt/lib/tree-sitter-python.wasm');
    //parser.setLanguage(parserLanguage);
    editor.onDidChangeModelContent(e=>{
      console.log(e);
      monaco.editor.setModelMarkers(model,'owner',[
        {
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: 1,
          endColumn: 5,
          message: 'LOL',
          severity: monaco.MarkerSeverity.Warning
        },
      ]);
    });
  }

  render(): JSX.Element {
    return <Editor
      height="90vh"
      defaultLanguage="python"
      defaultValue="print(1)\nprint(2)\nprint(3)"
      onMount={this.handleEditorDidMount.bind(this)}
    />;
  }
}