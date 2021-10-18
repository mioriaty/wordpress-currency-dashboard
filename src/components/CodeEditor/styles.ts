import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: CodeEditor__container;
  border-radius: 6px;
  border: 2px solid ${colors.gray3};
  overflow: hidden;
`;
