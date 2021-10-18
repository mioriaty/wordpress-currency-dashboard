import { reducerInitialization } from 'containers/InitializationPage';
import { reducerLogin } from 'containers/LoginPage';
import { reducerAppRecommendations } from 'containers/SettingPage/reducers/reducerAppRecommendations';
import { reducerSetting } from 'containers/SettingPage/reducers/reducerSetting';

export const reducers = {
  initialization: reducerInitialization,
  setting: reducerSetting,
  app_recommendations: reducerAppRecommendations,
  validate: reducerLogin,
};
