import { watchGetAppRecommendations } from './watchGetAppRecommendations';
import { watchGetDefaultSetting } from './watchGetDefaultSetting';
import { watchSaveSetting } from './watchSaveSetting';

export const sagaSetting = [watchGetDefaultSetting, watchSaveSetting, watchGetAppRecommendations];
