import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import { initCpp } from './init';
import './TreeEditor.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorProps{
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorState{
}

const code = `
#include<iostream>
using namespace std;

int main(){

}
`;

export class TreeEditor extends React.Component<EditorProps,EditorState>{
  constructor(props: EditorProps) {
    super(props);
    this.state = {};
  }

  async handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await initCpp(editor,monaco);
    editor.setValue(code);
  }


  render(): JSX.Element {
    return <Editor
      height="90vh"
      defaultLanguage="cpp"
      onMount={this.handleEditorDidMount.bind(this)}
    />;
  }
}