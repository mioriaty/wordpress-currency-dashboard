import { useSelector } from 'react-redux';
import { Field } from 'components/Field/Field';
import { FontField as FontFieldComponent } from 'components/FontField/FontField';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export const FontField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { font } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();

  return (
    <Field label={i18n.t('settings.font_field.label')}>
      <View css={styles.container}>
        <FontFieldComponent loading={isLoading} disabled={isLoading} value={font} onChange={value => changeSetting({ font: value })} />
      </View>
    </Field>
  );
};
