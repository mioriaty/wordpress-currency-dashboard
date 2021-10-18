import qs from 'qs';
import { CANCEL } from 'redux-saga';
import { Reducers } from 'store/configureStore';
import { ConfigureAxios } from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    paramsSerializer: qs.stringify,
  },
  setInitializationApp: () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { store } = require('store/configureStore');
    const {
      initialization: { token, baseUrl },
    } = store.getState() as Reducers;
    return {
      token,
      baseUrl,
    };
  },
});

export const fetchAPI = axiosConfig.create(CANCEL);
