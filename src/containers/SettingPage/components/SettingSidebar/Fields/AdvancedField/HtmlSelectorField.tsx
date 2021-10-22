import { Tooltip } from 'antd';
import { Button } from 'components/Button';
import { Field } from 'components/Field/Field';
import Textarea, { TextareaProps } from 'components/Textarea';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineAwesome, OuterTrigger, View } from 'wiloke-react-core';
import * as styles from './styles';

export const HtmlSelectorField = () => {
  const changeSetting = useChangeSetting();
  const { settings, device_display } = useSelector(settingSelector);
  const { headerSelector } = settings[device_display];
  const [visible, setVisible] = useState(false);
  const defaultText = 'header [href$="/cart"], header [href$="/cart/"], header .mini-cart';

  const _handleChange: TextareaProps['onChange'] = event => {
    changeSetting({
      headerSelector: event.target.value,
    });
  };

  const _handleVisibleTextarea = () => {
    setVisible(!visible);
  };

  return (
    <OuterTrigger
      onClick={() => {
        setVisible(false);
      }}
    >
      <Field
        label={
          <Tooltip
            color="#26256C"
            style={{ borderRadius: '6px' }}
            title="Sometimes, the Switcher Currency won't appear even the Main Menu is enabled. This field helps to resolve it, You can copy the Header Element and put it here as an anchor for the Switcher Currency. If you are not family with code, don't hesitate contact our support, We will help you to do that."
          >
            Header selector <LineAwesome color="tertiary" name="question-circle-o" />
          </Tooltip>
        }
      >
        <View css={styles.container}>
          {!visible && (
            <View color="gray6" css={styles.textSelector}>
              {headerSelector ? headerSelector : defaultText}
            </View>
          )}
          {visible && <Textarea value={headerSelector ? headerSelector : defaultText} onChange={_handleChange} />}
          <View css={{ textAlign: 'right' }}>
            <Button
              onClick={_handleVisibleTextarea}
              color="gray8"
              backgroundColor="gray2"
              borderColor="gray4"
              borderWidth={2}
              borderStyle="solid"
              css={{ padding: '4px 8px', marginTop: '8px' }}
              radius={4}
            >
              <LineAwesome size={16} color="gray8" name="reply" css={{ marginRight: '4px' }} /> Edit
            </Button>
          </View>
        </View>
      </Field>
    </OuterTrigger>
  );
};
