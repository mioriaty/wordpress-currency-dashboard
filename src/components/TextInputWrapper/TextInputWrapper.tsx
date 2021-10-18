import { FC } from 'react';
import { IconProps, LineAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface TextInputWrapperProps {
  searching?: boolean;
  onClear?: () => void;
  iconProps?: IconProps;
}

const TextInputWrapper: FC<TextInputWrapperProps> = ({ onClear, children, searching, iconProps }) => {
  return (
    <View css={styles.container}>
      {children}
      <View onClick={searching ? onClear : () => {}} css={[styles.close, searching ? { cursor: 'pointer' } : {}]}>
        <LineAwesome name={searching ? 'close' : 'search'} size={18} color="gray8" {...iconProps} />
      </View>
    </View>
  );
};

export default TextInputWrapper;
