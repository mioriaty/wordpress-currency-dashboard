import { Login, useGetPurchaseCode } from 'containers/LoginPage';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'wiloke-react-core';
import { useConfirmInitialized, useGetWordpressInfo } from '.';
import { initializationSelector } from '../selectors';
import { pmAjax } from './postmessage';
import * as styles from './styles';

export const InitializationPage = () => {
  const { token, purchaseCode, email, clientSite } = useSelector(initializationSelector);
  const confirmInitialized = useConfirmInitialized();
  const getWPInfo = useGetWordpressInfo();
  const pmToken = useRef<(() => void) | undefined>();
  const verifyPurchaseCode = useGetPurchaseCode();

  useEffect(() => {
    pmToken.current = pmAjax.on('@InitializePage/getWPInfoRequest', payload => {
      const { tidioId, token, url, email, clientSite, endpointVerification, purchaseCode, purchaseCodeLink, productName } = payload;
      getWPInfo({ token, url, tidioId, email, clientSite, endpointVerification, purchaseCode, purchaseCodeLink, productName });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (clientSite && email) {
      verifyPurchaseCode.request({
        clientSite,
        email,
        purchaseCode: purchaseCode || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSite, email]);

  useEffect(() => {
    if (token) {
      confirmInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return <Login />;
  }

  return (
    <View css={styles.container}>
      <ActivityIndicator size={50} />
    </View>
  );
};
