import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { confirmInitialized, getToken, initialization } from '../actions/actionInitializationPage';

interface State {
  statusInitialization: Status;
  app?: any;
  shopDomain?: string;
  email?: string;
  themeId?: number;
  confirmInitialized: boolean;
  token?: string;
  baseUrl?: string;
  tidioId?: string;
  clientSite?: string;
  endpointVerification?: string;
  purchaseCode?: string;
  purchaseCodeLink?: string;
  message?: string;
}

type Actions = ActionTypes<typeof initialization | typeof confirmInitialized | typeof getToken>;

const defaultState: State = {
  statusInitialization: 'idle',
  app: undefined,
  shopDomain: undefined,
  email: '',
  themeId: undefined,
  confirmInitialized: false,
  token: '',
  baseUrl: '',
  tidioId: '',
  clientSite: '',
  endpointVerification: '',
  purchaseCode: '',
  purchaseCodeLink: '',
  message: '',
};

export const reducerInitialization = createReducer<State, Actions>(defaultState, [
  handleAction('@InitializationPage/initializationRequest', ({ state, action }) => {
    const { app } = action.payload;
    return {
      ...state,
      statusInitialization: 'loading',
      app,
    };
  }),
  handleAction('@InitializationPage/initializationSucess', ({ state, action }) => {
    const { app, shopDomain, themeId } = action.payload;
    return {
      ...state,
      statusInitialization: 'success',
      app,
      shopDomain,
      themeId,
    };
  }),
  handleAction('@InitializationPage/initializationFailure', ({ state }) => {
    return {
      ...state,
      statusInitialization: 'failure',
    };
  }),
  handleAction('@Initialzation/confirmInitialized', ({ state, action }) => {
    return {
      ...state,
      confirmInitialized: action.payload,
    };
  }),
  handleAction('@InitializationPage/getToken', ({ state, action }) => {
    const { clientSite, email, endpointVerification, purchaseCode, purchaseCodeLink, tidioId, token, url } = action.payload;
    return {
      ...state,
      token,
      baseUrl: url,
      tidioId,
      clientSite,
      email,
      endpointVerification,
      purchaseCode,
      purchaseCodeLink,
    };
  }),
]);
