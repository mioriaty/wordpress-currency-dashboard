import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: AdvancedField__container;
  margin-bottom: 20px;
  margin-left: -5px;
`;

export const textSelector = ({ colors }: Theme) => css`
  border: 2px solid ${colors.gray3};
  margin-bottom: -18px;
  padding: 20px 10px;
  border-radius: 10px;
`;
