import { css, Theme } from 'wiloke-react-core';

export const listContainer = ({ colors }: Theme) => css`
  debug: CurrenciesField__listContainer;
  background: ${colors.light};
  box-shadow: 0px 4px 10px rgba(${colors.rgbDark}, 0.1);
`;

export const listBody = css`
  debug: CurrenciesField__listBody;
  padding: 12px;
  height: 400px;
  overflow: auto;
`;

export const listItem = css`
  debug: CurrenciesField__listItem;
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #dedee9;
  cursor: pointer;
`;

export const listItemLabel = css`
  debug: CurrenciesField__listItemLabel;
  margin-left: 5px;
  line-height: 20px;
`;

export const listItemActiveIcon = css`
  debug: CurrenciesField__listItemActiveIcon;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

export const listFooter = css`
  debug: CurrenciesField__listFooter;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const itemResultContainer = css`
  debug: CurrenciesField__itemResultContainer;
  display: flex;
  position: relative;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #dedee9;
`;

export const itemResultDragIcon = css`
  debug: CurrenciesField__itemResultDragIcon;
  margin-right: 15px;
`;

export const itemResultLabel = css`
  debug: CurrenciesField__itemResultLabel;
  margin-left: 5px;
`;

export const itemResultTrashIcon = css`
  debug: CurrenciesField__itemResultTrashIcon;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
