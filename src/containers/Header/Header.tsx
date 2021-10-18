import Navigation, { NavigationProps } from 'components/Navigation';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import { v4 } from 'uuid';
import { Button } from 'components/Button';
import { settingSelector } from '../selectors';
import { useSaveSetting } from '../SettingPage/actions/actionSetting';
import * as styles from './styles';

const navItems: NavigationProps['data'] = [
  {
    label: 'Settings',
    href: '/',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
  {
    label: 'Advanced',
    href: '/advanced',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
  {
    label: 'FAQs',
    href: '/faqs',
    id: v4(),
    isReactRouter: true,
    exact: true,
  },
];

export const Header = () => {
  const { statusSave } = useSelector(settingSelector);
  const saveSetting = useSaveSetting();

  return (
    <View css={styles.container}>
      <View css={styles.left}>
        <Navigation data={navItems} />
      </View>
      <View css={styles.right}>
        <Button size="small" onClick={() => saveSetting.request(undefined)} loading={statusSave === 'loading'}>
          Save Changes
        </Button>
      </View>
    </View>
  );
};
