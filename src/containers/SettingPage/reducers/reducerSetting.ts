import { equals } from 'ramda';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import {
  changeDeviceDisplay,
  changeModalRatingVisible,
  changeModalSaveCompleteVisible,
  changeSetting,
  getDefaultSetting,
  saveSetting,
} from '../actions/actionSetting';

interface State {
  statusRequest: Status;
  statusSave: Status;
  isDraft: boolean;
  isNew: boolean;
  settings: Settings;
  originalSettings: Settings;
  modalSaveCompleteVisible: boolean;
  modalRatingVisible: boolean;
  device_display: 'mobile' | 'desktop';
}

type Actions = ActionTypes<
  | typeof getDefaultSetting
  | typeof saveSetting
  | typeof changeSetting
  | typeof changeDeviceDisplay
  | typeof changeModalSaveCompleteVisible
  | typeof changeModalRatingVisible
>;

export const defaultSetting: Setting = {
  variant: 'style1',
  placement: 'bottom_left',
  backgroundColor: '#fff',
  color: '#2AB885',
  font: 'Roboto',
  bottom: 10,
  right: 10,
  top: 10,
  left: 10,
  currencies: [],
  currenciesVariant: 'select',
  location: ['header'],
  css: '',
  autoDetectCurrency: false,
  headerSelector: '',
  format: 'money',
  size: 'md',
};

export const defaultState: State = {
  statusRequest: 'idle',
  statusSave: 'idle',
  isDraft: false,
  isNew: true,
  settings: {
    desktop: defaultSetting,
    mobile: defaultSetting,
  },
  originalSettings: {
    desktop: defaultSetting,
    mobile: defaultSetting,
  },
  modalSaveCompleteVisible: false,
  modalRatingVisible: false,
  device_display: 'desktop',
};

export const reducerSetting = createReducer<State, Actions>(defaultState, [
  handleAction('@Setting/getDefaultSettingRequest', ({ state }) => {
    return { ...state, statusRequest: 'loading' };
  }),
  handleAction('@Setting/getDefaultSettingSuccess', ({ state, action }) => {
    const { settings, isNew } = action.payload;
    return {
      ...state,
      statusRequest: 'success',
      isNew,
      settings,
      originalSettings: settings,
    };
  }),
  handleAction('@Setting/getDefaultSettingFailure', ({ state }) => {
    return { ...state, statusRequest: 'failure' };
  }),
  handleAction('@Setting/saveSettingRequest', ({ state }) => {
    return { ...state, statusSave: 'loading' };
  }),
  handleAction('@Setting/saveSettingSuccess', ({ state }) => {
    const { settings } = state;
    return {
      ...state,
      originalSettings: settings,
      statusSave: 'success',
      isDraft: false,
      isNew: false,
    };
  }),
  handleAction('@Setting/saveSettingFailure', ({ state }) => {
    return { ...state, statusSave: 'failure' };
  }),
  handleAction('@Setting/changeSetting', ({ state, action }) => {
    const { settings, originalSettings, device_display } = state;
    return {
      ...state,
      settings: {
        ...settings,
        [device_display]: {
          ...settings[device_display],
          ...action.payload,
        },
      },
      isDraft: !equals(settings, originalSettings),
    };
  }),
  handleAction('@Setting/changeDeviceDisplay', ({ state, action }) => {
    return {
      ...state,
      device_display: action.payload,
    };
  }),
  handleAction('@Setting/changeModalSaveCompleteVisible', ({ state, action }) => {
    return {
      ...state,
      modalSaveCompleteVisible: action.payload,
    };
  }),
  handleAction('@Setting/changeModalRatingVisible', ({ state, action }) => {
    return {
      ...state,
      modalRatingVisible: action.payload,
    };
  }),
]);
