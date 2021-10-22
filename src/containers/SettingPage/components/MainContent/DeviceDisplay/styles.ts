import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: DeviceDisplay__container;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const itemContainer = (isActive: boolean) => ({ colors }: Theme) => css`
  debug: DeviceDisplay__item;
  display: flex;
  flex-direction: column;
  background-color: ${colors.light};
  border: 2px solid ${isActive ? colors.primary : colors.light};
  border-radius: 7px;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;

  &:first-child {
    margin-right: 10px;
  }

  :global {
    .ant-popover-inner-content {
      color: ${colors.light} !important;
    }
    .ant-popover-inner {
      border-radius: 6px;
    }
  }
`;

export const itemIcon = (isActive: boolean) => ({ colors }: Theme) => css`
  debug: DeviceDisplay__itemIcon;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: ${isActive ? colors.primary : colors.gray4}; */
  color: ${isActive ? colors.primary : colors.gray8};
  width: 80px;
  border-radius: 7px;
  margin-right: 4px;
`;

export const itemDescription = (isActive: boolean) => ({ colors }: Theme) => css`
  debug: DeviceDisplay__itemDescription;
  color: ${isActive ? colors.primary : colors.gray8};
  text-transform: capitalize;
  text-align: center;
  margin-top: 4px;
`;
