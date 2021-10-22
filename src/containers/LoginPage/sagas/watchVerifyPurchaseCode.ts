import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { fetchAPI } from 'utils/functions/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { actionVerifyPurchaseCode } from '../actions/actionLogin';

interface LoginPageSuccess {
  data: {
    isVerifications: boolean;
  };
  code: number;
  message: string;
  status: string;
}

function* handleLogin({ payload }: ReturnType<typeof actionVerifyPurchaseCode.request>) {
  try {
    const { clientSite, email, purchaseCode, productName } = payload;
    const res: AxiosResponse<LoginPageSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: 'https://multicurrency.myshopkit.app/vge/ev/v1/verifications',
      method: 'post',
      data: {
        clientSite,
        purchaseCode,
        email,
        productName,
      },
    });
    if (res.data.status === 'success') {
      yield put(
        actionVerifyPurchaseCode.success({
          messageResponse: res.data.message,
          isVerifications: res.data.data.isVerifications,
          statusResponse: res.data.status,
        }),
      );
    }
    if (res.data.status === 'error') {
      yield put(actionVerifyPurchaseCode.failure({ message: res.data.message }));
    }
  } catch (error) {
    const _err = error as Error;
    yield put(actionVerifyPurchaseCode.failure({ message: _err.message }));
  }
}

export function* watchVerifyPurchaseCode() {
  yield takeLatest(getActionType(actionVerifyPurchaseCode.request), handleLogin);
}
