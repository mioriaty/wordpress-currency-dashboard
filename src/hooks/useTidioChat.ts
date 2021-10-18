import storage from 'utils/storage';
import { useEffect } from 'react';
import { createGlobalState } from 'react-use';
import { useSelector } from 'react-redux';
import { initializationSelector } from 'containers/selectors';

const useGlobalEmail = createGlobalState<string | undefined>();

export const useTidioChat = () => {
  const [email, setEmail] = useGlobalEmail();
  const { tidioId } = useSelector(initializationSelector);

  const handleInitTidioChat = () => {
    const tidioScript = document.createElement('script');
    tidioScript.src = `//code.tidio.co/${tidioId}.js`;
    document.body.appendChild(tidioScript);
  };

  const _handleReady = () => {
    const tidioState = JSON.parse(storage.getItem(`tidio_state_${tidioId}`) || '{}');
    const email = tidioState.visitor?.email ?? '';
    window.tidioChatApi.setColorPalette('#2AB885');
    setEmail(email);
  };

  const _handlePreFormFilled = (event: any) => {
    const { email } = event.data.form_data;
    setEmail(email);
  };

  useEffect(() => {
    document.addEventListener('tidioChat-ready', _handleReady);
    document.addEventListener('tidioChat-preFormFilled', _handlePreFormFilled);
    return () => {
      document.removeEventListener('tidioChat-ready', _handleReady);
      document.removeEventListener('tidioChat-preFormFilled', _handlePreFormFilled);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetEmail = (email: string) => {
    window.tidioChatApi.setVisitorData({
      email,
    });
  };

  const handleReset = () => {
    storage.removeItem(`tidio_state_${tidioId}`);
    storage.removeItem(`tidio_state_${tidioId}_lastActivity`);
    storage.removeItem(`tidio_state_${tidioId}_lastMessageFromVisitorTimestamp`);
  };

  const openWithEmail = ({ email, shopName }: { email: string; shopName: string }) => {
    window.tidioChatApi.setVisitorData({
      email,
      shopName,
    });
    window.tidioChatApi.open();
    window.tidioChatApi.messageFromVisitor('I got an error when save the setting');
  };

  return {
    email,
    setEmail: handleSetEmail,
    initTidioChat: handleInitTidioChat,
    reset: handleReset,
    openWithEmail,
  };
};
