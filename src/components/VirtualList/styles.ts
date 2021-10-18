import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: VirtualList__container;
  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.gray2};
    box-shadow: none !important;
    outline: none !important;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.gray5};
    box-shadow: none !important;
    outline: none !important;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray6};
    outline: none !important;
    box-shadow: none !important;
  }
`;
