import { EmitMessage } from 'containers/SettingPage/postmessage';

export const toPMSettings = (settings: Settings): EmitMessage['@currencySettings'] => {
  return {
    desktop: {
      currencies: settings.desktop.currenciesVariant === 'all' ? 'all' : settings.desktop.currencies,
      placement: settings.desktop.location.includes('other') ? settings.desktop.placement : undefined,
      variant: settings.desktop.variant,
      backgroundColor: settings.desktop.backgroundColor,
      bottom: settings.desktop.bottom,
      color: settings.desktop.color,
      left: settings.desktop.left,
      right: settings.desktop.right,
      size: 'lg',
      top: settings.desktop.top,
      addToHeader: settings.desktop.location.includes('header'),
      autoDetectCurrency: settings.desktop.autoDetectCurrency,
      css: settings.desktop.css,
      format: settings.desktop.format,
      headerSelector: settings.desktop.headerSelector,
    },
    mobile: {
      currencies: settings.mobile.currenciesVariant === 'all' ? 'all' : settings.mobile.currencies,
      placement: settings.mobile.placement,
      variant: settings.mobile.variant,
      backgroundColor: settings.mobile.backgroundColor,
      bottom: settings.mobile.bottom,
      color: settings.mobile.color,
      left: settings.mobile.left,
      right: settings.mobile.right,
      size: 'lg',
      top: settings.mobile.top,
      addToHeader: settings.mobile.location.includes('header'),
      autoDetectCurrency: settings.mobile.autoDetectCurrency,
      css: settings.mobile.css,
      format: settings.mobile.format,
      headerSelector: settings.mobile.headerSelector,
    },
  };
};
