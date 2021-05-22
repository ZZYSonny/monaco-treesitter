import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import { createLSP, EditorLanguage } from '../adapter/tree-sitter/loader';
import './TreeEditor.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorProps{
  language: EditorLanguage,
  options: monaco.editor.IStandaloneEditorConstructionOptions | undefined
  onReady: (editor: TreeEditor)=>void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorState{
  props: EditorProps
}

const code = `#include<iostream>
using namespace std;

int main(){

}
`;

export class TreeEditor extends React.Component<EditorProps,EditorState>{
  constructor(props: EditorProps) {
    super(props);
    this.state = {
      props: props
    };
  }

  async handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco): Promise<void> {
    const lsp = await createLSP(this.props.language,editor,monaco);
    await lsp.init();
    editor.setValue(code);
  }

  render(): JSX.Element {
    return <Editor
      height="90vh"
      defaultLanguage={this.props.language}
      onMount={this.handleEditorDidMount.bind(this)}
      theme='light'
      options={this.props.options}
      //wrapperClassName="MainApp-code"
    />;
  }
}