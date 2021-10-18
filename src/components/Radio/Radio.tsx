import { useState, useEffect, ReactNode, FC } from 'react';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export interface RadioProps {
  onChange: (value: string) => void;
  values: string[];
  value: string;
  disabled: boolean;
  renderItem: (item: { value: string; isActive: boolean }, index: number) => ReactNode;
}

export const Radio: FC<RadioProps> = ({ value, values, disabled, renderItem, onChange }) => {
  const [state, setState] = useState(value);

  const _renderItem = (value: string, index: number) => {
    return (
      <View
        css={[styles.container, disabled ? styles.disabled : undefined]}
        disabled={disabled}
        key={value}
        onClick={() => {
          setState(value);
          onChange(value);
        }}
      >
        {renderItem({ value, isActive: state === value }, index)}
      </View>
    );
  };

  useEffect(() => {
    if (value !== state) setState(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{values.map(_renderItem)}</>;
};
