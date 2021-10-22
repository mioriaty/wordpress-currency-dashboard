export const toSettings = (settings: NguyenDttnSaveSettingsFormData['settings']): Settings => {
  let locationDesktop: ('header' | 'other')[] = [];

  if (settings.desktop.addToHeader) {
    locationDesktop.push('header');
  }
  if (!settings.desktop.addToHeader && settings.desktop.placement) {
    locationDesktop.push('other');
  }
  if (settings.desktop.addToHeader && settings.desktop.placement) {
    locationDesktop = ['header', 'other'];
  }

  let locationMobile: ('header' | 'other')[] = [];

  if (settings.mobile.addToHeader) {
    locationMobile.push('header');
  }
  if (!settings.mobile.addToHeader && settings.mobile.placement) {
    locationMobile.push('other');
  }
  if (settings.mobile.addToHeader && settings.mobile.placement) {
    locationMobile = ['header', 'other'];
  }

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
      location: locationDesktop,
      font: 'Roboto',
      css: settings.desktop.css,
      autoDetectCurrency: settings.desktop.autoDetectCurrency,
      headerSelector: settings.desktop.headerSelector,
      format: 'money',
      size: settings.desktop.size,
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
      location: locationMobile,
      font: 'Roboto',
      css: settings.mobile.css,
      autoDetectCurrency: settings.mobile.autoDetectCurrency,
      headerSelector: settings.mobile.headerSelector,
      format: 'money',
      size: settings.mobile.size,
    },
  };
};
