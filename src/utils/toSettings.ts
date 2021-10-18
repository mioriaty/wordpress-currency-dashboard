export const toSettings = (settings: NguyenDttnSaveSettingsFormData['settings']): Settings => {
  return {
    desktop: {
      backgroundColor: settings.desktop.backgroundColor,
      bottom: settings.desktop.bottom,
      top: settings.desktop.top,
      left: settings.desktop.left,
      right: settings.desktop.right,
      color: settings.desktop.color,
      placement: settings.desktop.placement,
      variant: settings.desktop.variant,
      currenciesVariant: settings.desktop.currencies === 'all' ? 'all' : 'select',
      currencies: settings.desktop.currencies === 'all' ? [] : settings.desktop.currencies,
      location: settings.desktop.addToHeader ? ['header'] : ['other'],
      font: 'Roboto',
      css: settings.desktop.css,
      autoDetectCurrency: settings.desktop.autoDetectCurrency,
    },
    mobile: {
      backgroundColor: settings.mobile.backgroundColor,
      bottom: settings.mobile.bottom,
      top: settings.mobile.top,
      left: settings.mobile.left,
      right: settings.mobile.right,
      color: settings.mobile.color,
      placement: settings.mobile.placement,
      variant: settings.mobile.variant,
      currenciesVariant: settings.mobile.currencies === 'all' ? 'all' : 'select',
      currencies: settings.mobile.currencies === 'all' ? [] : settings.mobile.currencies,
      location: settings.mobile.addToHeader ? ['header'] : settings.mobile.placement ? ['other'] : [],
      font: 'Roboto',
      css: settings.mobile.css,
      autoDetectCurrency: settings.mobile.autoDetectCurrency,
    },
  };
};