import { SelectAntd } from 'components/AntdCustomize/SelectAntd/SelectAntd';
import { Field } from 'components/Field/Field';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export const MenuField = () => {
  const { settings, device_display, statusRequest, menuWordpress } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { menuPlacement } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();

  const _handleChangeSetting = (placement: string[]) => {
    changeSetting({
      menuPlacement: placement,
    });
  };

  return (
    <Field label="Menu placement">
      <View css={styles.container}>
        <SelectAntd
          mode="multiple"
          data={menuWordpress}
          value={menuPlacement}
          loading={isLoading}
          disabled={isLoading}
          onChange={_handleChangeSetting}
          placeholder="Select placement in your specific menu"
        />
      </View>
    </Field>
  );
};
