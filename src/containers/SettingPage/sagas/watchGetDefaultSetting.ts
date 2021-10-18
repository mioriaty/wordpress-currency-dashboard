import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchAPI } from 'utils/functions/fetchAPI';
import { toSettings } from 'utils/toSettings';
import { getActionType } from 'wiloke-react-core/utils';
import { getDefaultSetting } from '../actions/actionSetting';
import { defaultSetting } from '../reducers/reducerSetting';

function* handleGetDefaultSetting(_: ReturnType<typeof getDefaultSetting.request>) {
  try {
    const res: AxiosResponse<NguyenDttnGetSettingsResponse> = yield retry(3, 500, fetchAPI.request, {
      url: `me/settings`,
      method: 'get',
    });
    if (res.data.status !== 'success') throw new Error(res.data.message);
    const _settingResponse = res.data.data.settings;

    if (_settingResponse) {
      const _settings = _settingResponse;
      yield put(
        getDefaultSetting.success({
          isNew: false,
          settings: toSettings(_settings),
        }),
      );
    } else {
      yield put(getDefaultSetting.success({ settings: { desktop: defaultSetting, mobile: defaultSetting }, isNew: true }));
    }
  } catch (err) {
    const _err = err as Error;
    notification.error({ message: 'Get Default Fail', description: _err.message });
    yield put(getDefaultSetting.failure(undefined));
  }
}

export function* watchGetDefaultSetting() {
  yield takeLatest(getActionType(getDefaultSetting.request), handleGetDefaultSetting);
}
