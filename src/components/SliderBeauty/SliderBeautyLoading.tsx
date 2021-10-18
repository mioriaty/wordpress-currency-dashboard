import React, { FC } from 'react';
import { View } from 'wiloke-react-core';

export interface RangeSlideBeautyLoadingProps {}

const RangeSlideBeautyLoading: FC<RangeSlideBeautyLoadingProps> = () => {
  return (
    <View css={{ position: 'relative', overflow: 'hidden' }}>
      <View css={{ display: 'flex', alignItems: 'center', padding: '8px 16px 8px 32px', borderRadius: '6px' }} backgroundColor="light">
        <View css={{ height: '4px', flexGrow: 1, position: 'relative', borderRadius: '4px' }} backgroundColor="gray2">
          <View
            css={{
              width: '23px',
              height: '23px',
              borderRadius: '50px',
              position: 'absolute',
              left: '-10%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            backgroundColor="gray2"
          />
        </View>
        <View css={{ width: '50px', height: '28px', marginLeft: '30px', borderRadius: '5px' }} backgroundColor="gray2" />
      </View>
    </View>
  );
};

export { RangeSlideBeautyLoading };
