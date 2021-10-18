import { fetchAPI } from 'utils/functions/fetchAPI';
import { AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { getActionType } from 'wiloke-react-core/utils';
import { getAppRecommendations } from '../actions/actionAppRecommendations';

function* handleGetAppRecommendations(_: ReturnType<typeof getAppRecommendations.request>) {
  try {
    const res: AxiosResponse<NguyenDttnGetAppRecommendationsResponseSuccess> = yield retry(3, 500, fetchAPI.request, {
      url: 'https://myshopkit.app/wp-json/customer-feedback/v1/app-recommendations',
      baseURL: '',
      params: {
        app: 'APP_NAME'.toLowerCase().replaceAll(' ', '-'),
      },
    });
    yield put(getAppRecommendations.success({ app_recommendations: res.data.data }));
  } catch (err) {
    yield put(getAppRecommendations.failure(undefined));
  }
}

export function* watchGetAppRecommendations() {
  yield takeLatest(getActionType(getAppRecommendations.request), handleGetAppRecommendations);
}
