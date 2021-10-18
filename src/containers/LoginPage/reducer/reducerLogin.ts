import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionConfirmValidate, actionValidateApp } from '../actions/actionLogin';

type LoginAction = ActionTypes<typeof actionValidateApp | typeof actionConfirmValidate>;

interface LoginState {
  loginStatus: Status;
  username: string;
  password: string;
  hasPassed: boolean;
  message: string;
}

const defaultState: LoginState = {
  loginStatus: 'idle',
  hasPassed: false,
  password: '',
  username: '',
  message: '',
};

export const reducerLogin = createReducer<LoginState, LoginAction>(defaultState, [
  handleAction('@Auth/actionValidateAppRequest', ({ state }) => {
    return {
      ...state,
      loginStatus: 'loading',
    };
  }),
  handleAction('@Auth/actionValidateAppSuccess', ({ state, action }) => {
    const { hasPassed, password, username } = action.payload;
    return {
      ...state,
      loginStatus: 'success',
      hasPassed,
      password,
      username,
    };
  }),
  handleAction('@Auth/actionValidateAppFailure', ({ state, action }) => {
    return {
      ...state,
      loginStatus: 'failure',
      message: action.payload.message,
    };
  }),
  handleAction('@Auth/actionConfirmValidate', ({ state, action }) => {
    const { hasPassed } = action.payload;
    return {
      ...state,
      hasPassed,
    };
  }),
]);
