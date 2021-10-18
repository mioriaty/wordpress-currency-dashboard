import { useSelector } from 'react-redux';
import { CodeEditor } from 'components/CodeEditor/CodeEditor';
import { Field } from 'components/Field/Field';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import withDebounce from 'hocs/withDebounce';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const CodeEditorDebounce = withDebounce(CodeEditor, 'value', 'onChange', 300);

export const CustomCssField = () => {
  const changeSetting = useChangeSetting();

  const { settings, device_display } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { css } = setting;

  return (
    <Field label={i18n.t('settings.customCss_field.label')}>
      <View css={styles.container}>
        <CodeEditorDebounce value={css} onChange={value => changeSetting({ css: value })} />
      </View>
    </Field>
  );
};
