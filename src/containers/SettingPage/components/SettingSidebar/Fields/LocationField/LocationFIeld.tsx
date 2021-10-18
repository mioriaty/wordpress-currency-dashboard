import { useSelector } from 'react-redux';
import Checkbox from 'components/Checkbox';
import { Field } from 'components/Field/Field';
import { settingSelector } from 'containers/selectors';
import { useChangeSetting } from 'containers/SettingPage/actions/actionSetting';
import { i18n } from 'translation';
import { v4 } from 'uuid';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

const data = [
  {
    id: v4(),
    title: i18n.t('settings.location_field.option1.label'),
    description: i18n.t('settings.location_field.option1.description'),
    value: 'header' as Setting['location'][number],
  },
  {
    id: v4(),
    title: i18n.t('settings.location_field.option2.label'),
    description: i18n.t('settings.location_field.option2.description'),
    value: 'other' as Setting['location'][number],
  },
];

export const LocationField = () => {
  const { settings, device_display, statusRequest } = useSelector(settingSelector);
  const setting = settings[device_display];
  const { location } = setting;
  const isLoading = statusRequest === 'loading' || statusRequest === 'idle';
  const changeSetting = useChangeSetting();

  const _renderItem = ({ description, id, title, value }: typeof data[number]) => {
    const isActive = location.includes(value);

    if (isLoading) {
      return (
        <View key={id} css={styles.itemContainer(isActive)}>
          <View css={styles.itemLeft}>
            <Checkbox.Loading />
          </View>
          <View css={styles.itemRight}>
            <Text css={styles.itemTitle}>{title}</Text>
            <Text css={styles.itemDescription}>{description}</Text>
          </View>
        </View>
      );
    }

    return (
      <View
        key={id}
        css={styles.itemContainer(isActive)}
        onClick={() => {
          changeSetting({
            location: !isActive ? location.concat(value) : location.filter(item => item !== value),
          });
        }}
      >
        <View css={styles.itemLeft}>
          <Checkbox checked={isActive} />
        </View>
        <View css={styles.itemRight}>
          <Text css={styles.itemTitle}>{title}</Text>
          <Text css={styles.itemDescription}>{description}</Text>
        </View>
      </View>
    );
  };

  return (
    <Field label={i18n.t('settings.location_field.label')} noteDescription={i18n.t('settings.location_field.description')}>
      <View css={styles.container}>{data.map(_renderItem)}</View>
    </Field>
  );
};
