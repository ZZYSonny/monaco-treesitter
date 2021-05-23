import React from 'react';
import { TreeEditor } from './TreeEditor';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProps {
  //language: EditorLanguage
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppState {
}


export class MainApp extends React.Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    return <TreeEditor
      language='cpp'
      onReady={e=>console.log(e)}
      options={{
        fontSize: 18
      }}
    />;
  }
}