import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { fetchAPI } from 'utils/functions/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { initialization } from '../actions';

interface InitializationPageSuccess {
  name: string;
  email: string;
  myshopifyDomain: string;
  themeId?: number;
}

function* handleInitialization({ payload }: ReturnType<typeof initialization.request>) {
  try {
    const res: AxiosResponse<InitializationPageSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: `${payload.app.localOrigin}/api/initialization`,
      baseURL: '',
    });
    yield put(
      initialization.success({
        app: payload.app,
        shopDomain: res.data.myshopifyDomain,
        themeId: res.data.themeId,
        email: res.data.email,
      }),
    );
  } catch (error) {
    yield put(initialization.failure(undefined));
  }
}

export function* watchInitialization() {
  yield takeLatest(getActionType(initialization.request), handleInitialization);
}
