import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { settingSelector } from 'containers/selectors';
import { pm } from 'containers/SettingPage/postmessage';
import { toPMSettings } from 'utils/toPMSettings';
import { useTheme, View } from 'wiloke-react-core';
import * as styles from './styles';

export const Preview = () => {
  const { statusRequest, settings, device_display } = useSelector(settingSelector);
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const mobileWidth = device_display === 'mobile' ? 368 : 579;
  const { colors } = useTheme();

  const _handlePostmessage = () => {
    pm.emit('@currencySettings', toPMSettings(settings));
  };

  useEffect(() => {
    _handlePostmessage();
  }, [settings]);

  if (isLoading) return null;

  return (
    <View css={styles.container}>
      <iframe
        onLoad={_handlePostmessage}
        id="IFRAME"
        style={{
          maxWidth: mobileWidth,
          maxHeight: 500,
          width: '100%',
          height: '100%',
          border: `1px solid ${colors.gray3}`,
          borderRadius: '12px',
          backgroundColor: colors.light,
        }}
        frameBorder={0}
        src="https://currency-converter-client.netlify.app/iframe.html"
      />
    </View>
  );
};
