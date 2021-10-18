import { message } from 'antd';
import { Button } from 'components/Button';
import { Field } from 'components/Field/Field';
import Textarea from 'components/Textarea';
import { i18n } from 'translation';
import { copyToClipboard } from 'utils/copyToClipboard';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const HTML = '<div class="select-currency"></div>';

export const HTMLField = () => {
  return (
    <Field label={i18n.t('settings.html_field.label')} noteDescription={i18n.t('settings.html_field.description')}>
      <View css={styles.container}>
        <Textarea disabled value={HTML} />
        <Button
          block
          size="medium"
          radius={6}
          css={styles.button}
          onClick={() => {
            copyToClipboard(HTML);
            message.success('Copied to clipboard');
          }}
        >
          Copy Code
        </Button>
      </View>
    </Field>
  );
};
