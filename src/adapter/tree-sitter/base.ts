import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Parser from 'web-tree-sitter';
import { generateErrorMarker } from './helper';

/**
 * Use a bit of OOP to reduce code repetition
 */
export class BaseLSP {
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
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.model = editor.getModel()!;
    this.editor = editor;
    this.monaco = monaco;
    this.parser = parser;
    this.language = language;
    this.tree = this.parser.parse(this.editor.getValue());
  }

  updateTree(e: monaco.editor.IModelContentChangedEvent): void{
    e.changes.forEach(change => {
      const r = change.range as monaco.Range;
      const start = r.getStartPosition();
      const oldend = r.getEndPosition();
      const newend = appendPoint(start, change.text);
      this.tree.edit({
        startIndex: change.rangeOffset,
        oldEndIndex: this.model.getOffsetAt(oldend),
        newEndIndex: change.rangeOffset + change.text.length,
        startPosition: convert(start),
        oldEndPosition: convert(oldend),
        newEndPosition: convert(newend)
      });
    });
    this.tree = this.parser.parse(this.editor.getValue());
    //console.log(this.tree.rootNode.toString());
  }

  updateMarker(): void {
    const markers = generateErrorMarker(this.tree.rootNode);
    this.monaco.editor.setModelMarkers(this.model, 'owner', markers);
  }

  async init(): Promise<void> {
    this.updateMarker();
    this.editor.onDidChangeModelContent(e => {
      this.updateTree(e);
      this.updateMarker();
    });
  }
}

/**
 * Given (row,monaco) in monaco coordiniate
 * Return coordinate after appending text
 */
function appendPoint(p:monaco.Position, text:string): monaco.Position{
  const lines = text.split('\n');
  if (lines.length === 1) return p.delta(0,text.length);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  else return new monaco.Position(p.lineNumber + lines.length - 1, lines.pop()!.length + 1);
}

/**
 * Given (row,column) in monaco coordinate
 * Return the coordinate in parser coordinate
 */
function convert(p: monaco.IPosition): Parser.Point {
  return {
    row: p.lineNumber-1,
    column: p.column-1
  };
}