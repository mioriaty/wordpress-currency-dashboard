import { Login } from 'containers/LoginPage';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'wiloke-react-core';
import { useConfirmInitialized, useGetToken } from '.';
import { initializationSelector } from '../selectors';
import { pmAjax } from './postmessage';
import * as styles from './styles';

export const InitializationPage = () => {
  const { token } = useSelector(initializationSelector);

  const confirmInitialized = useConfirmInitialized();
  const getToken = useGetToken();
  const pmToken = useRef<(() => void) | undefined>();

  useEffect(() => {
    pmToken.current = pmAjax.on('@InitializePage/getWPInfoRequest', payload => {
      const { tidioId, token, url } = payload;
      getToken(token, url, tidioId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      confirmInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return <Login />;
  }

  // useEffect(() => {
  //   if (statusInitialization !== 'success') {
  //     init.request({ app });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (statusInitialization === 'success' && shopDomain && !themeId) {
  //   return (
  //     <View css={styles.container}>
  //       You need active a theme.
  //       <Text tagName="a" href={`${shopDomain}`}>
  //         Active here
  //       </Text>
  //     </View>
  //   );
  // }

  // if (statusInitialization === 'failure') {
  //   return (
  //     <View css={styles.container}>
  //       <Button onClick={() => init.request({ app })} size="small">
  //         Retry
  //       </Button>
  //     </View>
  //   );
  // }

  return (
    <View css={styles.container}>
      <ActivityIndicator size={50} />
    </View>
  );
};
