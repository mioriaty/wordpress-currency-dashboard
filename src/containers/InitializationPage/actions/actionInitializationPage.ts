import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const initialization = createAsyncAction([
  '@InitializationPage/initializationRequest',
  '@InitializationPage/initializationSucess',
  '@InitializationPage/initializationFailure',
])<
  {
    app: any;
  },
  {
    app: any;
    shopDomain: string;
    email: string;
    themeId?: number;
  },
  undefined
>();

export const confirmInitialized = createAction('@Initialzation/confirmInitialized', (payload: boolean) => payload);

export const useInitialization = createDispatchAsyncAction(initialization);
export const useConfirmInitialized = createDispatchAction(confirmInitialized);

export const getToken = createAction('@InitializationPage/getToken', (token: string, baseUrl: string, tidioId: string) => ({
  token,
  baseUrl,
  tidioId,
}));
export const useGetToken = createDispatchAction(getToken);
