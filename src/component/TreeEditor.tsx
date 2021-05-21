import Editor from '@monaco-editor/react';
import React from 'react';
import './TreeEditor.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorProps{
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditorState{
}

export class TreeEditor extends React.Component<EditorProps,EditorState>{
  constructor(props: EditorProps) {
    super(props);
    this.state = {
    };
  }

  render(): JSX.Element {
    return <Editor
      height="90vh"
      defaultLanguage="python"
      defaultValue="print(1)"
    />;
  }
}