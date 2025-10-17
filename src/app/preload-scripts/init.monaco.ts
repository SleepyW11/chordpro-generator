import * as monaco from 'monaco-editor';
import { CHORD_REGEX } from '../regex/chord.regex';
import {
  FULL_DIRECTIVE_REGEX,
  PARTIAL_DIRECTIVE_REGEX,
} from '../regex/directive.regex';

self.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case 'json':
        return new Worker(
          new URL(
            '../../../node_modules/monaco-editor/esm/vs/language/json/json.worker',
            import.meta.url,
          ),
        );
      case 'css':
      case 'scss':
      case 'less':
        return new Worker(
          new URL(
            '../../../node_modules/monaco-editor/esm/vs/language/css/css.worker',
            import.meta.url,
          ),
        );
      case 'html':
      case 'handlebars':
      case 'razor':
        return new Worker(
          new URL(
            '../../../node_modules/monaco-editor/esm/vs/language/html/html.worker',
            import.meta.url,
          ),
        );
      case 'typescript':
      case 'javascript':
        return new Worker(
          new URL(
            '../../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker',
            import.meta.url,
          ),
        );
      default:
        return new Worker(
          new URL(
            '../../../node_modules/monaco-editor/esm/vs/editor/editor.worker',
            import.meta.url,
          ),
        );
    }
  },
};

monaco.languages.register({ id: 'chord-pro' });
monaco.languages.setMonarchTokensProvider('chord-pro', {
  tokenizer: {
    root: [
      {
        regex: CHORD_REGEX,
        action: ['delimeter', 'chord', 'delimeter'],
      },
      {
        regex: FULL_DIRECTIVE_REGEX,
        action: [
          'delimeter',
          'directive-type',
          'delimeter',
          'directive-value',
          'delimeter',
        ],
      },
      {
        regex: PARTIAL_DIRECTIVE_REGEX,
        action: ['delimeter', 'directive-value', 'delimeter'],
      },
    ],
  },
});

monaco.editor.defineTheme('chord-pro-dark', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'chord', foreground: '#ff6655' },
    { token: 'directive-type', foreground: '#2277dd' },
    { token: 'directive-value', foreground: '#ffaa00' },
  ],
  colors: {},
});

monaco.editor.defineTheme('chord-pro-light', {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'chord', foreground: '#e64630' },
    { token: 'directive-type', foreground: '#3366cc' },
    { token: 'directive-value', foreground: '#ff9900' },
  ],
  colors: {},
});
