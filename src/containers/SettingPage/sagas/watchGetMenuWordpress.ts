// get menu wordpress saga

import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAPI } from 'utils/functions/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { getMenuWordpress } from '../actions/actionSetting';

function* getMenuWordpressSaga(_: ReturnType<typeof getMenuWordpress.request>) {
  try {
    const res: AxiosResponse<NguyenDttnGetMenuWPResponse> = yield call(fetchAPI.request, {
      url: 'registered-menus',
    });

    console.log(res);

    if (res.status === 200) {
      yield put(getMenuWordpress.success({ data: res.data.data }));
    }
  } catch (err) {
    yield put(getMenuWordpress.failure(undefined));
  }
}

export default function* watchGetMenuWordpress() {
  yield takeLatest(getActionType(getMenuWordpress.request), getMenuWordpressSaga);
}
