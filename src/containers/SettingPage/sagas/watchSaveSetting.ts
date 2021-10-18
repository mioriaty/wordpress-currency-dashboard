import { notification } from 'antd';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { settingSelector } from 'containers/selectors';
import { fetchAPI } from 'utils/functions/fetchAPI';
import { toPMSettings } from 'utils/toPMSettings';
import { getActionType } from 'wiloke-react-core/utils';
import { changeModalSaveCompleteVisible, saveSetting } from '../actions/actionSetting';

function* handleSaveSetting(_: ReturnType<typeof saveSetting.request>) {
  try {
    const { settings, isNew }: ReturnType<typeof settingSelector> = yield select(settingSelector);
    yield retry(3, 500, fetchAPI.request, {
      url: 'me/settings',
      method: isNew ? 'post' : 'put',
      data: {
        settings: toPMSettings(settings),
      } as NguyenDttnSaveSettingsFormData,
    });
    yield put(changeModalSaveCompleteVisible(true));
    yield put(saveSetting.success(undefined));
  } catch (err) {
    const _err = err as Error;
    notification.error({ message: 'Something went wrong' });
    yield put(saveSetting.failure(undefined));
  }
}

export function* watchSaveSetting() {
  yield takeLatest(getActionType(saveSetting.request), handleSaveSetting);
}
