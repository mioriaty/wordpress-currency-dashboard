import { watchGetAppRecommendations } from './watchGetAppRecommendations';
import { watchGetDefaultSetting } from './watchGetDefaultSetting';
import watchGetMenuWordpress from './watchGetMenuWordpress';
import { watchSaveSetting } from './watchSaveSetting';

export const sagaSetting = [watchGetDefaultSetting, watchSaveSetting, watchGetAppRecommendations, watchGetMenuWordpress];
