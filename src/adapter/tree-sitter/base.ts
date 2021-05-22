import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Parser from 'web-tree-sitter';
import { generateErrorMarker } from './helper';

/**
 * Use a bit of OOP to reduce code repetition
 */
export class BaseLSP{
  editor: monaco.editor.IStandaloneCodeEditor
  model: monaco.editor.ITextModel
  monaco: Monaco
  parser: Parser
  language: Parser.Language
  tree: Parser.Tree

  constructor(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
    parser: Parser,
    language: Parser.Language
  ){
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.model=editor.getModel()!;
    this.editor = editor;
    this.monaco=monaco;
    this.parser=parser;
    this.language=language;
    this.tree=this.parser.parse(this.editor.getValue());
  }

  updateMarkerFromTree():void{
    const markers = generateErrorMarker(this.tree.rootNode);
    this.monaco.editor.setModelMarkers(this.model, 'owner', markers);
  }

  async init():Promise<void>{
    this.updateMarkerFromTree();
    this.editor.onDidChangeModelContent(e => {
      this.tree = this.parser.parse(this.editor.getValue());
      this.updateMarkerFromTree();
    });
  }
}