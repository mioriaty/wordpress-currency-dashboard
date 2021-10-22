import { Field } from 'components/Field/Field';
import { Radio, RadioProps } from 'components/Radio/Radio';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'wiloke-react-core';
import { i18n } from 'translation';
import * as styles from './styles';

export const SizeField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const { size } = settings[device_display];
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';

  const changeSetting = useChangeSetting();

  const _renderItem: RadioProps['renderItem'] = ({ value, isActive }) => {
    if (isLoading) {
      return (
        <View css={styles.item({ isActive: false })}>
          <ActivityIndicator size={14} />
        </View>
      );
    }
    const _value = value as Setting['size'];
    return (
      <View css={styles.item({ isActive })}>
        {_value === 'sm'
          ? i18n.t('settings.size_field.option1.label')
          : _value === 'md'
          ? i18n.t('settings.size_field.option2.label')
          : i18n.t('settings.size_field.option3.label')}
      </View>
    );
  };

  return (
    <Field label={i18n.t('settings.size_field.label')}>
      <View css={styles.container}>
        <Radio
          disabled={isLoading}
          renderItem={_renderItem}
          value={size}
          values={['sm', 'md', 'lg'] as Setting['size'][]}
          onChange={value => changeSetting({ size: value as Setting['size'] })}
        />
      </View>
    </Field>
  );
};
