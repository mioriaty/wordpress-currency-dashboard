import { Field } from 'components/Field/Field';
import { Radio, RadioProps } from 'components/Radio/Radio';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { useSelector } from 'react-redux';
import { ActivityIndicator, LineAwesome, Text, View } from 'wiloke-react-core';
import { Flag } from 'components/Flag/Flag';
import { ReactNode } from 'react';
import { i18n } from 'translation';
import * as styles from './styles';

export const VariantField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { variant } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();

  const mappingVariantStyle: Record<string, ReactNode> = {
    style1: (
      <View radius={4} borderColor="gray3" borderStyle="solid" borderWidth={1} css={[styles.styleIcon, styles.style1]}>
        <Flag size="lg" variant="default" currency="USD" />
        <Text tagName="span" css={{ marginLeft: '4px', marginRight: '4px' }}>
          USD
        </Text>
        <LineAwesome name="angle-down" />
      </View>
    ),
    style2: (
      <View borderColor="gray3" radius="pill" borderStyle="solid" borderWidth={1} backgroundColor="light" css={[styles.styleIcon, styles.style2]}>
        <Flag currency="USD" variant="round" />
      </View>
    ),
    style3: (
      <View radius={4} borderColor="gray3" borderStyle="solid" borderWidth={1} backgroundColor="light" css={[styles.styleIcon, styles.style2]}>
        <Flag currency="USD" variant="app" />
      </View>
    ),
    style4: (
      <View borderColor="gray3" borderStyle="solid" borderWidth={1} css={[styles.styleIcon, styles.style1]}>
        <Flag size="lg" variant="default" currency="USD" />
        <Text tagName="span" css={{ marginLeft: '4px', marginRight: '4px' }}>
          USD
        </Text>
        <LineAwesome name="angle-down" />
      </View>
    ),
    style5: (
      <View borderColor="gray3" borderStyle="solid" borderWidth={1} css={[styles.styleIcon, styles.style3]}>
        <Flag size="lg" variant="default" currency="USD" />
        <LineAwesome css={{ marginLeft: '4px' }} name="angle-down" />
      </View>
    ),
    style6: (
      <View borderColor="gray3" borderStyle="solid" borderWidth={1} radius="pill" css={[styles.styleIcon, styles.style3]}>
        <Flag variant="round" currency="USD" />
        <Text tagName="span" css={{ marginLeft: '4px', marginRight: '4px' }}>
          USD
        </Text>
        <LineAwesome name="angle-down" />
      </View>
    ),
  };

  const _renderItem: RadioProps['renderItem'] = ({ value, isActive }) => {
    if (isLoading) {
      return (
        <View css={styles.item({ isActive })}>
          <ActivityIndicator size={24} />
        </View>
      );
    }
    return <View css={styles.item({ isActive })}>{mappingVariantStyle[value]}</View>;
  };

  const _handleChangeSetting = (variant: Setting['variant']) => {
    changeSetting({
      variant,
    });
  };

  return (
    <Field label={i18n.t('settings.variant_field.label')}>
      <View css={styles.container}>
        <Radio
          disabled={isLoading}
          renderItem={_renderItem}
          values={['style1', 'style2', 'style3', 'style4', 'style5', 'style6']}
          value={variant}
          onChange={value => _handleChangeSetting(value as Setting['variant'])}
        />
      </View>
    </Field>
  );
};
