import { useSelector } from 'react-redux';
import { Field } from 'components/Field/Field';
import { SliderBeauty } from 'components/SliderBeauty';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import withDebounce from 'hocs/withDebounce';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const SliderBeautyDebounce = withDebounce(SliderBeauty, 'value', 'onValueChange', 300);

export const PaddingLeftField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { left, placement, location } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();

  if (!placement?.includes('left') || !location.includes('other')) return null;

  if (isLoading) {
    return (
      <Field label={i18n.t('settings.paddingLeft_field.label')}>
        <View css={styles.container}>
          <SliderBeauty.Loading />
        </View>
      </Field>
    );
  }

  return (
    <Field label={i18n.t('settings.paddingLeft_field.label')}>
      <View css={styles.container}>
        <SliderBeautyDebounce borderColor="gray3" borderWidth={2} value={left} onValueChange={value => changeSetting({ left: value })} />
      </View>
    </Field>
  );
};
