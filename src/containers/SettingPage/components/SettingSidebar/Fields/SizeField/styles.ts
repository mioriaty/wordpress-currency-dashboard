import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: SizeField__container;
  display: flex;
  flex-wrap: nowrap;
  border: 2px solid ${colors.gray3};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  margin-left: -5px;
  & > * {
    flex: 1 1 auto;
  }
`;

export const item = ({ isActive }: { isActive: boolean }) => ({ colors, fonts }: Theme) => css`
  debug: SizeField__item;
  padding: 14px;
  text-align: center;
  background-color: ${isActive ? colors.primary : colors.light};
  color: ${isActive ? colors.light : undefined};
  font-family: ${fonts.primary};

  &:first-child {
    border-right: 1px solid ${colors.gray2};
  }
  &:last-child {
    border-left: 1px solid ${colors.gray2};
  }
`;
