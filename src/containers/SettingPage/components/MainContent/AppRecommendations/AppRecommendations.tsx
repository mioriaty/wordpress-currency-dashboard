import { Carousel } from 'components/Carousel/Carousel';
import { appRecommendationsSelector } from 'containers/selectors';
import { useGetAppRecommendations } from 'containers/SettingPage/actions/actionAppRecommendations';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'wiloke-react-core';
import { AppRecommendationsItem } from './AppRecommendationsItem/AppRecommendationsItem';
import * as styles from './styles';

interface AppRecommendationsProps {
  showDescription?: boolean;
}

export const AppRecommendations: FC<AppRecommendationsProps> = ({ showDescription }) => {
  const { data, statusRequest } = useSelector(appRecommendationsSelector);
  const _getAppRecommendations = useGetAppRecommendations();

  // useEffect(() => {
  //   if (statusRequest !== 'loading' && statusRequest !== 'success') {
  //     getAppRecommendations.request(undefined);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [statusRequest]);

  if (statusRequest === 'loading') return null;

  return (
    <View css={styles.container}>
      {showDescription && (
        <Text size={15} css={styles.title}>
          App Recommendations
        </Text>
      )}
      {showDescription && (
        <Text size={12} css={styles.description}>
          We're proud to help you grow your online store with these powerful apps. We provide everything to save your time and grow your bussiness
          effectively
        </Text>
      )}
      <View css={styles.apps}>
        <Carousel slideCount={3} slideWidth={190} data={data} renderItem={item => <AppRecommendationsItem {...item} key={item.name} />} />
      </View>
    </View>
  );
};
