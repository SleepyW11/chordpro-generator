import { NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { CHORD_REGEX } from './regex/chord.regex';
import {
  FULL_DIRECTIVE_REGEX,
  PARTIAL_DIRECTIVE_REGEX,
} from './regex/directive.regex';
import * as Monaco from 'monaco-editor';

export const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: monacoInit,
};

function monacoInit() {
  const monaco: typeof Monaco = (<any>window).monaco;

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
}
