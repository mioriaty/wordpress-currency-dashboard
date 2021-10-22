import { Tooltip } from 'antd';
import { Field } from 'components/Field/Field';
import Textarea, { TextareaProps } from 'components/Textarea';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { LineAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export const HtmlSelectorField = () => {
  const changeSetting = useChangeSetting();
  const { settings, device_display } = useSelector(settingSelector);
  const { headerSelector } = settings[device_display];

  const _handleChange: TextareaProps['onChange'] = event => {
    changeSetting({
      headerSelector: event.target.value,
    });
  };

  return (
    <Field
      label={
        <Tooltip color="#26256C" style={{ borderRadius: '6px' }} title="Use when you know exactly where the html selector you need to place">
          {i18n.t('settings.headerSelector_field.label')} <LineAwesome color="tertiary" name="question-circle-o" />
        </Tooltip>
      }
    >
      <View css={styles.container}>
        <Textarea placeholder='header [href$="/cart"], header [href$="/cart/"], header .mini-cart' value={headerSelector} onChange={_handleChange} />
      </View>
    </Field>
  );
};
