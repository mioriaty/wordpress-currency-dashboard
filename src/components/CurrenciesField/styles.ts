import { css, Theme } from 'wiloke-react-core';

export const listContainer = ({ colors }: Theme) => css`
  debug: CurrenciesField__listContainer;
  background: ${colors.light};
  box-shadow: 0px 4px 10px rgba(${colors.rgbDark}, 0.1);
  user-select: none;
`;

export const listBody = css`
  debug: CurrenciesField__listBody;
  padding: 12px;
  height: 400px;
  overflow: auto;
`;

export const listItem = (disabled: boolean) => css`
  debug: CurrenciesField__listItem;
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #dedee9;
  cursor: ${!disabled ? 'pointer' : 'no-drop'};
  user-select: none;
  display: flex;
  align-items: center;
`;

export const listItemLabel = css`
  debug: CurrenciesField__listItemLabel;
  margin-left: 8px;
  line-height: 16px;
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

export const message = css`
  cursor: pointer;

  :global {
    .ant-message-notice-content {
      background-color: #ffd38a;
      border-radius: 6px;
    }

    .ant-message-custom-content {
      display: flex;
      align-items: center;
      font-weight: 500;
    }
  }
`;

export const itemResultContainer = css`
  debug: CurrenciesField__itemResultContainer;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #dedee9;
  user-select: none;
`;

export const itemResultLeft = css`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const itemResultDragIcon = css`
  debug: CurrenciesField__itemResultDragIcon;
  transform: rotate(45deg);
`;

export const itemResultLabel = css`
  debug: CurrenciesField__itemResultLabel;
  margin-left: 8px;
`;

export const itemResultTrashIcon = css`
  debug: CurrenciesField__itemResultTrashIcon;
  cursor: pointer;
  margin-left: 4px;
  padding: 4px;
`;
