import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const changeSetting = createAction('@Setting/changeSetting', (payload: Partial<Setting>) => ({ ...payload }));
export const changeDeviceDisplay = createAction('@Setting/changeDeviceDisplay', (payload: DeviceDisplay) => payload);

export const getDefaultSetting = createAsyncAction([
  '@Setting/getDefaultSettingRequest',
  '@Setting/getDefaultSettingSuccess',
  '@Setting/getDefaultSettingFailure',
])<undefined, { settings: Settings; isNew: boolean }, undefined>();

export const saveSetting = createAsyncAction(['@Setting/saveSettingRequest', '@Setting/saveSettingSuccess', '@Setting/saveSettingFailure'])<
  undefined,
  undefined,
  undefined
>();

export const changeModalSaveCompleteVisible = createAction('@Setting/changeModalSaveCompleteVisible', (payload: boolean) => payload);
export const changeModalRatingVisible = createAction('@Setting/changeModalRatingVisible', (payload: boolean) => payload);

export const useGetDefaultSetting = createDispatchAsyncAction(getDefaultSetting);
export const useSaveSetting = createDispatchAsyncAction(saveSetting);
export const useChangeSetting = createDispatchAction(changeSetting);
export const useChangeDeviceDisplay = createDispatchAction(changeDeviceDisplay);
export const useChangeModalSaveCompleteVisible = createDispatchAction(changeModalSaveCompleteVisible);
export const useChangeModalRatingVisible = createDispatchAction(changeModalRatingVisible);

export const getMenuWordpress = createAsyncAction([
  '@Setting/getMenuWordpressRequest',
  '@Setting/getMenuWordpressSuccess',
  '@Setting/getMenuWordpressFailure',
])<undefined, { data: NguyenDttnGetMenuWPResponse['data'] }, undefined>();
export const useGetMenuWordpress = createDispatchAsyncAction(getMenuWordpress);
