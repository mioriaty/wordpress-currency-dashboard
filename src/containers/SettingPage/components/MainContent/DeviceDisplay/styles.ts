import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: DeviceDisplay__container;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const itemContainer = css`
  debug: DeviceDisplay__item;
  &:first-child {
    margin-right: 40px;
  }
`;

export const itemIcon = (isActive: boolean) => ({ colors }: Theme) => css`
  debug: DeviceDisplay__itemIcon;
  background-color: ${isActive ? colors.primary : colors.light};
  color: ${isActive ? colors.light : colors.gray4};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  width: 70px;
  height: 52px;
`;

export const itemDescription = ({ colors }: Theme) => css`
  debug: DeviceDisplay__itemDescription;
  color: ${colors.gray9};
  text-transform: capitalize;
  text-align: center;
  margin-top: 4px;
`;
