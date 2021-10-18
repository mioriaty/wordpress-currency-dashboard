import { MainTemplate } from 'templates/MainTemplate';
import { View, Text } from 'wiloke-react-core';
import { Header } from '../Header/Header';
import * as styles from './styles';

const FAQs = () => {
  return (
    <View css={styles.container}>
      <View css={styles.box}>
        <Text css={styles.title}>How can I publish the App on my Shopify?</Text>
        <View
          css={{
            position: 'relative',
            width: '60%',
            overflow: 'hidden',
            paddingTop: '35%',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src="https://www.youtube.com/embed/7xQyL2kXbI0"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </View>
      </View>
      <View css={styles.box}>
        <Text css={styles.title}>How does Multi Currency Converter work?</Text>
        <Text css={styles.description}>
          Multi Currency Converter automatically converts currency at any place within your shop regardless of the format. Whether you use a
          third-party app like Mini Cart or fill content marketing with the product’s price, our Multi Currency Converter app takes it in stride.
        </Text>
      </View>
      <View css={styles.box}>
        <Text css={styles.title}>How can I pick up a list of currencies myself?</Text>
        <Text css={styles.description}>
          <Text>Step 1: Click on Settings Tab</Text>
          <Text>Step 2: Choose Select Currencies mode under Select Currencies setting.</Text>
          <Text>Step 3: Finally, choose currencies that you want to displays</Text>
        </Text>
      </View>
      <View css={styles.box}>
        <Text css={styles.title}>
          How can I add Multi Currency Converter Toolbar to a placement on my shop such as Bottom-Left, Top-Left, etc ... ?
        </Text>
        <Text css={styles.description}>
          <Text>Step 1: Still under Settings Tab, check on Add one more placement</Text>
          <Text>Step 2: The Placement setting is appeared after that → You can now select a placement with this setting.</Text>
        </Text>
      </View>
    </View>
  );
};

export const FAQsPage = () => {
  return <MainTemplate Header={Header} Content={FAQs} />;
};
