import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: VariantField__container;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-left: -5px;
  margin-right: -5px;
  & > * {
    flex: 1 1 33%;
  }
`;

export const item = ({ isActive }: { isActive: boolean }) => ({ colors }: Theme) => css`
  debug: VariantField__item;
  /* padding: 20px 30px; */
  border: 2px solid ${isActive ? colors.primary : colors.gray2};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: ${colors.light};
  min-width: 100px;
  min-height: 100px;
  max-height: 100px;

  & svg {
    width: 32px;
    height: 32px;
  }
`;

export const styleIcon = css`
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 25%);
`;

export const style1 = css`
  justify-content: space-between;
  padding: 5px 10px;
`;

export const style3 = css`
  padding: 5px;
`;

export const style2 = css`
  width: 35px;
  height: 35px;
  justify-content: center;
`;
