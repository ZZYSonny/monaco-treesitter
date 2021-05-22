import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Parser from 'web-tree-sitter';

/**
 * Generate a Monaco Error Marker
 * with range equal to node range
 */
function nodeToMarker(node: Parser.SyntaxNode, message: string): monaco.editor.IMarkerData{
  return {
    startLineNumber: node.startPosition.row + 1,
    startColumn: node.startPosition.column + 1,
    endLineNumber: node.endPosition.row + 1,
    endColumn: node.endPosition.column + 1,
    message: message,
    severity: monaco.MarkerSeverity.Error
  };
}

/**
 * Generate error message for errors in the tree-sitter AST
 */
export function generateErrorMarker(cur: Parser.SyntaxNode): monaco.editor.IMarkerData[] {
  if (cur.isMissing()) return [nodeToMarker(cur, `Missing ${cur.type}`)];
  else if (cur.type === 'ERROR') return [nodeToMarker(cur, 'ERROR')];
  else if (cur.hasError()) return cur.children.flatMap(generateErrorMarker);
  else return [];
}
