import Editor from '@monaco-editor/react';
import { FC } from 'react';
import { useStyleSheet, useTheme } from 'wiloke-react-core';
import { StyleParam } from 'wiloke-react-core/dist/hooks/useStyleSheet';
import * as _styles from './styles';

export interface CodeEditorProps {
  css?: StyleParam;
  value: string;
  onChange?: (value: string) => void;
}

export const CodeEditor: FC<CodeEditorProps> = ({ css, value, onChange }) => {
  const { styles } = useStyleSheet();
  const theme = useTheme();

  return (
    <Editor
      className={`${styles(_styles.container(theme))} ${css ? styles(css) : ''}`}
      height="200px"
      defaultLanguage="css"
      theme="light"
      onChange={value => onChange?.(value ?? '')}
      options={{
        tabSize: 2,
        lineNumbers: 'off',
        lineNumbersMinChars: false,
        minimap: {
          enabled: false,
        },
      }}
      value={value}
    />
  );
};
