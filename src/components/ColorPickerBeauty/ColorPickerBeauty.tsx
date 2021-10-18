import React, { FC } from 'react';
import { ColorNames, Radius, Text, View, ViewProps } from 'wiloke-react-core';
import { FieldBox } from '../FieldBox';
import { ColorPicker, ColorPickerProps } from '../ColorPicker';
import { ColorPickerBeautyLoading } from './ColorPickerBeautyLoading';
import * as css from './styles';

export interface ColorPickerBeautyProps
  extends Pick<ColorPickerProps, 'pickerType' | 'placement' | 'strategy' | 'color' | 'onChange' | 'onChangeComplete'>,
    Pick<ViewProps, 'borderWidth' | 'borderStyle' | 'borderColor'> {
  /** Background color của box */
  backgroundInnerField?: ColorNames;
  /** Radius của field box */
  radiusBox?: Radius;
  /** Radius của color picker */
  radiusPicker?: Radius;
}

const ColorPickerBeauty: FC<ColorPickerBeautyProps> & {
  Loading: typeof ColorPickerBeautyLoading;
} = ({
  placement = 'bottom-start',
  backgroundInnerField = 'light',
  strategy = 'absolute',
  color,
  borderStyle = 'solid',
  borderColor = 'gray2',
  radiusPicker = 5,
  radiusBox = 5,
  borderWidth = 1,
  pickerType,
  onChange,
  onChangeComplete,
}) => {
  return (
    <FieldBox
      backgroundColor={backgroundInnerField}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      radius={radiusBox}
      css={css.box}
    >
      <View css={css.inner}>
        <ColorPicker
          pickerType={pickerType}
          radius={radiusPicker}
          placement={placement}
          strategy={strategy}
          color={color}
          onChange={onChange}
          onChangeComplete={onChangeComplete}
          renderAfter={color => (
            <View css={css.colorDetailsContainer}>
              <Text css={css.colorDetails}>{color}</Text>
            </View>
          )}
        />
      </View>
    </FieldBox>
  );
};

ColorPickerBeauty.Loading = ColorPickerBeautyLoading;

export { ColorPickerBeauty };
