import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: LocationField__container;
  margin-bottom: 20px;
  margin-left: -5px;
`;

export const itemContainer = (isActive: boolean) => ({ colors }: Theme) => css`
  debug: LocationField__itemContainer;
  display: flex;
  padding: 15px;
  border: 2px solid ${colors.gray3};
  background-color: ${isActive ? '#E0FFF4' : undefined};
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const itemLeft = css`
  debug: LocationField__itemLeft;
  margin-right: 10px;
`;

export const itemRight = css`
  debug: LocationField__itemRight;
`;

export const itemTitle = ({ colors }: Theme) => css`
  debug: LocationField__itemTitle;
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray9};
  margin-top: -4px;
`;

export const itemDescription = ({ colors }: Theme) => css`
  debug: LocationField__itemDescription;
  color: ${colors.gray9};
`;
