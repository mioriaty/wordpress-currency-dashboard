import { Reducers } from 'store/configureStore';
import { compose } from 'redux';
import { CurrencySettings } from './containers/SettingPage/postmessage';

declare global {
  type AppState = Reducers;
  type RootState = Reducers;
  type GetState = () => AppState;
  type Status = 'idle' | 'loading' | 'success' | 'failure';

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    $crisp: any;
    CRISP_WEBSITE_ID: string;
    tidioChatApi: any;
    _APP_: any;
    __CURRENCY_SETTINGS__: Setting[];
    Shopify: {
      currency: {
        active: string;
      };
    };
  }

  interface WordpressInfo {
    clientSite: string;
    email: string;
    endpointVerification: string;
    purchaseCode: string;
    purchaseCodeLink: string;
    tidioId: string;
    token: string;
    url: string;
  }

  interface Setting {
    location: ('header' | 'other')[];
    variant: 'style1' | 'style2' | 'style3' | 'style4' | 'style5' | 'style6';
    placement:
      | undefined
      | 'top_left'
      | 'top_right'
      | 'bottom_left'
      | 'bottom_right'
      | 'top_left_bar'
      | 'top_right_bar'
      | 'bottom_left_bar'
      | 'bottom_right_bar';
    backgroundColor: string;
    color: string;
    top: number;
    right: number;
    bottom: number;
    left: number;
    font: string;
    currencies: CurrencyKey[];
    currenciesVariant: 'all' | 'select';
    css: string;
    autoDetectCurrency: boolean;
    format: 'money' | 'money_with_currency';
    headerSelector: string;
    size: 'sm' | 'md' | 'lg';
  }

  type DeviceDisplay = 'desktop' | 'mobile';
  type Settings = Record<DeviceDisplay, Setting>;

  interface NguyenDttnGetSettingsResponse {
    message: string;
    status: 'success' | 'error';
    data: {
      status: 'activate' | 'deactivate';
      settings?: Record<DeviceDisplay, CurrencySettings>;
    };
  }

  interface NguyenDttnGetMenuWPResponse {
    message: string;
    status: 'success' | 'error';
    data: Array<{ label: string; value: string }>;
  }

  interface NguyenDttnSaveSettingsFormData {
    settings: Record<DeviceDisplay, CurrencySettings>;
    status?: 'activate' | 'deactivate';
  }

  interface NguyenDttnSaveSettingsResponse {
    message: string;
    status: 'success' | 'error';
  }
  interface NguyenDttnPopup {
    name?: string;
    description?: string;
    thumbnailUrl: string;
    link?: string;
    target: '_blank';
    utm?: string;
    data?: Record<string, any>;
    id: string;
    btnName: string;
  }
  interface NguyenDttnGetAppRecommendationsResponseItem {
    name: string;
    price?: string;
    btnName: string;
    description: string;
    thumbnailUrl: string;
    link: string;
    target: '_blank' | 'popup';
    couponCode?: NguyenDttnPopup;
    utm?: string;
    data?: Record<string, any>;
    total_ratings?: number;
    average_ratings?: number;
  }

  interface NguyenDttnGetAppRecommendationsResponseSuccess {
    data: Item[];
    message: 'Fetched';
    status: 'success';
  }
}
