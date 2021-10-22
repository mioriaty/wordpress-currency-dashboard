import { useSelector } from 'react-redux';
import { CurrenciesField as CurrenciesFieldComponent } from 'components/CurrenciesField/CurrenciesField';
import { Field } from 'components/Field/Field';
import Radio from 'components/WilRadio';
import { settingSelector, validationSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export const CurrenciesField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { currencies, currenciesVariant } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();
  const { isVerifications } = useSelector(validationSelector);

  const _renderSelectCurrencies = () => {
    if (currenciesVariant !== 'select') return null;
    return (
      <CurrenciesFieldComponent
        isVerified={isVerifications}
        value={currencies.map(item => ({ label: item, value: item }))}
        onChange={value => changeSetting({ currencies: value.map(item => item.value) })}
      />
    );
  };

  return (
    <Field label={i18n.t('settings.currencies_field.label')} noteDescription={i18n.t('settings.currencies_field.description')}>
      <View css={styles.container}>
        <View css={styles.radioGroup}>
          <Radio.Group
            size="small"
            disabled={isLoading}
            value={currenciesVariant}
            onChangeValue={value => {
              if (value === 'all') changeSetting({ currenciesVariant: 'all' });
              else changeSetting({ currenciesVariant: 'select' });
            }}
          >
            <Radio disabled={!isVerifications} value="all">
              {i18n.t('settings.currencies_field.option1.label')}
            </Radio>
            <Radio value="select">{i18n.t('settings.currencies_field.option2.label')}</Radio>
          </Radio.Group>
        </View>
        {_renderSelectCurrencies()}
      </View>
    </Field>
  );
};
