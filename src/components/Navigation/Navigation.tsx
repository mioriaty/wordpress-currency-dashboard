import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Text, useStyleSheet, useTheme, View, withStyles, WithStylesProps } from 'wiloke-react-core';
import * as css from './styles';

export interface MenuItemInterface {
  id: string;
  label: string;
  href: string;
  exact?: boolean;
  isReactRouter: boolean;
}

export interface NavigationProps {
  data: MenuItemInterface[];
}

const NavLinkWithStyles = withStyles(NavLink);

const Navigation: FC<NavigationProps> = ({ data }) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);

  const linkProps: Pick<WithStylesProps, 'color' | 'colorHover' | 'css'> = {
    css: css.link,
    color: 'gray7',
    colorHover: 'gray7',
  };

  const renderLink = (item: MenuItemInterface): ReactNode => {
    const { isReactRouter, href, label, exact } = item;

    if (isReactRouter) {
      return (
        <NavLinkWithStyles {...linkProps} activeClassName={styles(css.active)} exact={exact} to={href as any}>
          {label}
        </NavLinkWithStyles>
      );
    }
    return (
      <Text {...linkProps} tagName="a" target="blank" href={href}>
        {label}
      </Text>
    );
  };

  const renderMenuItem = (item: MenuItemInterface): ReactNode => {
    const { id } = item;
    return (
      <View key={id}>
        <View className="Navigation-parent" css={css.parent}>
          {renderLink(item)}
        </View>
      </View>
    );
  };

  return (
    <View tagName="nav" className="Navigation-container" css={css.container}>
      {data.map(renderMenuItem)}
      <Text {...linkProps} tagName="a" href="https://wiloke.com/support/" target="blank">
        Support Forum
      </Text>
    </View>
  );
};

export default Navigation;
