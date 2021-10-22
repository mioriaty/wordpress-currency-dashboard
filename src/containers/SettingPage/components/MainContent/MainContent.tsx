import { VerificationPopup } from 'containers/LoginPage/VerificationPopup';
import { View } from 'wiloke-react-core';
import { AppRecommendations } from './AppRecommendations/AppRecommendations';
import { DeviceDisplay } from './DeviceDisplay/DeviceDisplay';
import { Preview } from './Preview/Preview';
import * as styles from './styles';

export const MainContent = () => {
  return (
    <View css={styles.container}>
      <DeviceDisplay />
      <Preview />
      <AppRecommendations />
      <VerificationPopup />
    </View>
  );
};
