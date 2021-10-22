import { useSelector } from 'react-redux';
import { ColorPickerBeauty } from 'components/ColorPickerBeauty';
import { Field } from 'components/Field/Field';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import withDebounce from 'hocs/withDebounce';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const ColorPickerBeautyDebounce = withDebounce(ColorPickerBeauty, 'color', 'onChange', 300);

export const BackgroundColorField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { backgroundColor } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();

  if (isLoading) {
    return (
      <Field label={i18n.t('settings.backgroundColor_field.label')}>
        <View css={styles.container}>
          <ColorPickerBeauty.Loading />
        </View>
      </Field>
    );
  }

  return (
    <Field label={i18n.t('settings.backgroundColor_field.label')}>
      <View css={styles.container}>
        <ColorPickerBeautyDebounce
          borderColor="gray3"
          borderWidth={2}
          radiusBox={10}
          color={backgroundColor}
          onChange={value => changeSetting({ backgroundColor: value })}
        />
      </View>
    </Field>
  );
};
