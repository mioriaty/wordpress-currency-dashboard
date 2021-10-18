import { FC } from 'react';
import { View } from 'wiloke-react-core';
import flags from './flagSprite.png';
export type FlagSize = 'sm' | 'md' | 'lg';

export type FlagVariant = 'default' | 'round' | 'app';

export interface FlagProps {
  currency: string;
  variant?: FlagVariant;
  size?: FlagSize;
}

const getFlagClasses = (currency: string, variant: FlagVariant, size: FlagSize) => {
  const flag = `fflag-${/XP|XA|XP/g.test(currency) ? currency : currency.replace(/\w$/g, '')}`;
  switch (variant) {
    case 'round':
      return `fflag ff-${size} ff-round ${flag}`;
    case 'app':
      return `fflag ff-${size} ff-app ${flag}`;
    case 'default':
    default:
      return `fflag ff-${size} ${flag}`;
  }
};

export const Flag: FC<FlagProps> = ({ currency, size = 'lg', variant = 'app' }) => {
  return <View tagName="span" className={getFlagClasses(currency, variant, size)} css={{ backgroundImage: `url("${flags}")` }} />;
};
