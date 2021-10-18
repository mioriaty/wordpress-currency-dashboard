import { createAction, createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const actionValidateApp = createAsyncAction([
  '@Auth/actionValidateAppRequest',
  '@Auth/actionValidateAppSuccess',
  '@Auth/actionValidateAppFailure',
])<{ username: string; password: string; url: string }, { username: string; password: string; hasPassed: boolean }, { message: string }>();

export const useActionValidateApp = createDispatchAsyncAction(actionValidateApp);

export const actionConfirmValidate = createAction('@Auth/actionConfirmValidate', (hasPassed: boolean) => ({ hasPassed }));
export const useConfirmValidate = createDispatchAction(actionConfirmValidate);
