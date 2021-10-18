import React, { FC } from 'react';
import { omit, pick } from 'ramda';
import { Switch, SwitchProps } from '../Switch/Switch';
import TextStatus, { TextStatusProps } from '../SwitchBeauty/TextStatus';
import { FieldBox, BoxProps } from '../FieldBox';
import * as css from './styles';

export interface SwitchBeautyProps
  extends SwitchProps,
    Omit<BoxProps, 'children' | 'onChange'>,
    Pick<TextStatusProps, 'size' | 'enable' | 'enableText' | 'disableText' | 'enableColor' | 'disableColor'> {}

export const SwitchBeauty: FC<SwitchBeautyProps> = ({ checked, ...rest }) => {
  const switchPropsKeys: (keyof SwitchProps)[] = [
    'checked',
    'CheckedChildren',
    'UnCheckedChildren',
    'defaultChecked',
    'loading',
    'size',
    'disabled',
    'onValueChange',
    'onChange',
  ];
  const textStatusPropsKeys: (keyof TextStatusProps)[] = ['size', 'enable', 'enableText', 'disableText', 'enableColor', 'disableColor'];
  const omitFieldBoxPropsKeys = [...switchPropsKeys, ...textStatusPropsKeys];
  const switchProps = pick(switchPropsKeys, rest);
  const textStatusProps = pick(textStatusPropsKeys, rest);
  const fieldBoxProps = omit(omitFieldBoxPropsKeys, rest);
  const { size = 'large', disabled = false } = rest;

  return (
    <FieldBox css={[css.container(size), css.disabled(disabled)]} {...fieldBoxProps}>
      <Switch {...switchProps} checked={checked} renderAfter={value => <TextStatus {...textStatusProps} enable={value} />} />
    </FieldBox>
  );
};
