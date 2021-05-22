import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Parser from 'web-tree-sitter';
import { BaseLSP } from './base';
import { CppLSP } from './language/cpp';

const cdnURL = 'https://tree-sitter.github.io/';
export type EditorLanguage = 'cpp' | 'python';
const map = new Map<string, typeof BaseLSP>([
  ['cpp', CppLSP],
  ['python', BaseLSP]
]);


export async function createLSP(
  language: EditorLanguage,
  editor: monaco.editor.IStandaloneCodeEditor,
  monaco: Monaco
):Promise<BaseLSP>{
  await Parser.init();
  const parser = new Parser();
  const parserLanguage = await Parser.Language.load(cdnURL + 'tree-sitter-' + language + '.wasm');
  parser.setLanguage(parserLanguage);

  return new (map.get(language) || BaseLSP)(
    editor,
    monaco,
    parser,
    parserLanguage
  );
}