import { SelectAntd } from 'components/AntdCustomize/SelectAntd/SelectAntd';
import { Field } from 'components/Field/Field';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const MoneyFormatField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const { format } = settings[device_display];
  const changeSetting = useChangeSetting();

  const _handleChangeSetting = (value: Setting['format']) => {
    changeSetting({
      format: value,
    });
  };

  return (
    <Field label="Money format">
      <View css={styles.container}>
        <SelectAntd
          data={[
            { label: 'Money (Eg: $ 100.00)', value: 'money' },
            { label: 'Money with currency (Eg: 100.00 USD)', value: 'money_with_currency' },
          ]}
          value={format}
          loading={statusRequest === 'loading'}
          onChange={_handleChangeSetting}
        />
      </View>
    </Field>
  );
};

export { MoneyFormatField };
