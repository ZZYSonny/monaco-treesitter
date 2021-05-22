import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Parser from 'web-tree-sitter';

const cdnURL = 'https://tree-sitter.github.io/';

async function initParser(language:string): Promise<[Parser, Parser.Language]>{
  await Parser.init();
  const parser = new Parser();
  const parserLanguage = await Parser.Language.load(cdnURL + 'tree-sitter-'+language+'.wasm');
  parser.setLanguage(parserLanguage);
  return [parser, parserLanguage];
}

function capturesToMarkers(captures: Parser.QueryCapture[]): monaco.editor.IMarkerData[]{
  return captures.map(e => ({
    startLineNumber: e.node.startPosition.row + 1,
    startColumn: e.node.startPosition.column + 1,
    endLineNumber: e.node.endPosition.row + 1,
    endColumn: e.node.endPosition.column + 1,
    message: 'ERROR',
    severity: monaco.MarkerSeverity.Error
  }));
}

export async function initPython(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco):Promise<void>{
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const model = editor.getModel()!;
  const [parser,language]=await initParser('python');
  let tree = parser.parse(editor.getValue());

  //grammar check for python
  const errorQuery = language.query('(ERROR) @error');

  const errors = errorQuery.captures(tree.rootNode);
  const markers = capturesToMarkers(errors);
  monaco.editor.setModelMarkers(model, 'owner', markers);

  editor.onDidChangeModelContent(e => {
    tree = parser.parse(editor.getValue());
    const errors = errorQuery.captures(tree.rootNode);
    const markers = capturesToMarkers(errors);
    monaco.editor.setModelMarkers(model, 'owner', markers);
  });
}

export async function initCpp(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco): Promise<void>{
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const model = editor.getModel()!;
  const [parser, language] = await initParser('cpp');
  let tree = parser.parse(editor.getValue());
  //grammar check for python
  const errorQuery = language.query('(ERROR) @error');

  const errors = errorQuery.captures(tree.rootNode);
  const markers = capturesToMarkers(errors);
  monaco.editor.setModelMarkers(model, 'owner', markers);

  editor.onDidChangeModelContent(e => {
    tree = parser.parse(editor.getValue());
    const errors = errorQuery.captures(tree.rootNode);
    const markers = capturesToMarkers(errors);
    monaco.editor.setModelMarkers(model, 'owner', markers);
  });
}