import { useSelector } from 'react-redux';
import { Radio, RadioProps } from 'components/Radio/Radio';
import { settingSelector } from 'containers/selectors';
import { useChangeDeviceDisplay } from 'containers/SettingPage/actions/actionSetting';
import { ActivityIndicator, LineAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export const DeviceDisplay = () => {
  const changeDeviceDisplay = useChangeDeviceDisplay();
  const { device_display, statusRequest } = useSelector(settingSelector);
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';

  const _renderItem: RadioProps['renderItem'] = ({ isActive, value }) => {
    if (isLoading) {
      return (
        <View css={styles.itemContainer}>
          <ActivityIndicator size={24} />
        </View>
      );
    }
    return (
      <View css={styles.itemContainer}>
        <View css={styles.itemIcon(isActive)}>
          <LineAwesome size={32} name={value as DeviceDisplay} />
        </View>
        <Text css={styles.itemDescription}>{value}</Text>
      </View>
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
