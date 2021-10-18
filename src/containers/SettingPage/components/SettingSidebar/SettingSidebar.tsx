import { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { View } from 'wiloke-react-core';
import { AdvancedField } from './Fields/AdvancedField/AdvancedField';
import { AutoDetectCurrency } from './Fields/AutoDetectCurrency/AutoDetectCurrency';
import { CurrenciesField } from './Fields/CurrenciesField/CurrenciesField';
import { CustomCssField } from './Fields/CustomCssField/CustomCssField';
import { HTMLField } from './Fields/HTMLFIeld/HTMLField';
import { LocationField } from './Fields/LocationField/LocationFIeld';
import { PlacementField } from './Fields/PlacementField/PlacementField';
import { VariantField } from './Fields/VariantField/VariantField';
import * as styles from './styles';

const SettingTab = () => {
  return (
    <View css={styles.container}>
      <View css={styles.body}>
        <LocationField />
        <PlacementField />
        <AdvancedField />
        <AutoDetectCurrency />

        <VariantField />
        <CurrenciesField />
      </View>
    </View>
  );
};

const AdvanceTab = () => {
  return (
    <View css={styles.container}>
      <View css={styles.body}>
        <HTMLField />
        <CustomCssField />
      </View>
    </View>
  );
};

export const SettingSidebar = () => {
  const _handleConfirmQuit = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = 'Changes you made may not be saved.';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', _handleConfirmQuit);
    return () => {
      window.removeEventListener('beforeunload', _handleConfirmQuit);
    };
  }, []);

  return (
    <Switch>
      <Route path="/advanced" exact component={AdvanceTab} />
      <Route component={SettingTab} />
    </Switch>
  );
};
