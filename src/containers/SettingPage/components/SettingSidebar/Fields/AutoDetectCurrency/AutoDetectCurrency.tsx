import { Button } from 'components/Button';
import { Field } from 'components/Field/Field';
import { SwitchBeauty } from 'components/SwitchBeauty/SwitchBeauty';
import { usePopupPurchaseCode } from 'containers/LoginPage';
import { settingSelector, validationSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export const AutoDetectCurrency = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const { isVerifications } = useSelector(validationSelector);
  const setting = settings[device_display];
  const { autoDetectCurrency } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();
  const setShowPopup = usePopupPurchaseCode();

  return (
    <Field label={i18n.t('settings.autoDetectCurrency_field.label')} noteDescription={i18n.t('settings.autoDetectCurrency_field.description')}>
      <View css={styles.container}>
        {isVerifications ? (
          <SwitchBeauty
            loading={isLoading}
            disabled={isLoading}
            checked={autoDetectCurrency}
            onValueChange={checked => changeSetting({ autoDetectCurrency: checked })}
          />
        ) : (
          <Button
            onClick={() => {
              setShowPopup(true);
            }}
            size="medium"
            radius={6}
            color="gray8"
            backgroundColor="quaternary"
          >
            Unlock this feature
          </Button>
        )}
      </View>
    </Field>
  );
};
