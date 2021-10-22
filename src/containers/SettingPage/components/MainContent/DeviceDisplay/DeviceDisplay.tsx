import { Popover } from 'antd';
import { Radio, RadioProps } from 'components/Radio/Radio';
import { settingSelector } from 'containers/selectors';
import { useChangeDeviceDisplay } from 'containers/SettingPage/actions/actionSetting';
import { useSelector } from 'react-redux';
import { ActivityIndicator, LineAwesome, Text, useTheme, View } from 'wiloke-react-core';
import * as styles from './styles';

export const DeviceDisplay = () => {
  const changeDeviceDisplay = useChangeDeviceDisplay();
  const { device_display, statusRequest } = useSelector(settingSelector);
  const { colors } = useTheme();

  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';

  const _renderItem: RadioProps['renderItem'] = ({ isActive, value }) => {
    const _value = value as DeviceDisplay;

    if (isLoading) {
      return (
        <View css={styles.itemContainer(false)}>
          <ActivityIndicator size={24} />
        </View>
      );
    }

    if (_value === 'desktop') {
      return (
        <View css={styles.itemContainer(isActive)}>
          <View css={styles.itemIcon(isActive)}>
            <LineAwesome size={32} name={_value} />
          </View>
          <View>
            <Text css={styles.itemDescription(isActive)}>{_value}</Text>
          </View>
        </View>
      );
    }

    return (
      <Popover
        color={colors.gray8}
        content={'This settings is for mobile device, you can set the settings on the sidebar'}
        placement="bottomRight"
        trigger="hover"
      >
        <View css={styles.itemContainer(isActive)}>
          <View css={styles.itemIcon(isActive)}>
            <LineAwesome size={32} name={_value} />
          </View>
          <View>
            <Text css={styles.itemDescription(isActive)}>{_value}</Text>
          </View>
        </View>
      </Popover>
    );
  };

  if (isLoading) return null;

  return (
    <View css={styles.container}>
      <Radio
        values={['desktop', 'mobile'] as DeviceDisplay[]}
        value={device_display}
        onChange={value => changeDeviceDisplay(value as DeviceDisplay)}
        disabled={isLoading}
        renderItem={_renderItem}
      />
    </View>
  );
};
