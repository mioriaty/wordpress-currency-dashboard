import { useSelector } from 'react-redux';
import { SelectAntd } from 'components/AntdCustomize/SelectAntd/SelectAntd';
import { Field } from 'components/Field/Field';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export const PlacementField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { placement } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();

  const _handleChangeSetting = (placement: Setting['placement']) => {
    changeSetting({
      placement,
    });
  };

  if (!setting.location.includes('other')) return null;

  return (
    <Field label={i18n.t('settings.placement_field.label')}>
      <View css={styles.container}>
        <SelectAntd
          data={[
            { label: 'Top Left', value: 'top_left' },
            { label: 'Top Left Bar', value: 'top_left_bar' },
            { label: 'Top Right', value: 'top_right' },
            { label: 'Top Right Bar', value: 'top_right_bar' },
            { label: 'Bottom Left', value: 'bottom_left' },
            { label: 'Bottom Left Bar', value: 'bottom_left_bar' },
            { label: 'Bottom Right', value: 'bottom_right' },
            { label: 'Bottom Right Bar', value: 'bottom_right_bar' },
          ]}
          value={placement}
          loading={isLoading}
          disabled={isLoading}
          onChange={_handleChangeSetting}
        />
      </View>
    </Field>
  );
};
