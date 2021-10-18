import { createPostMessage } from 'wiloke-react-core/utils';

interface AjaxOnPostMessage {
  '@InitializePage/getWPInfoRequest': {
    clientSite: string;
    email: string;
    endpointVerification: string;
    purchaseCode: string;
    purchaseCodeLink: string;
    tidioId: string;
    token: string;
    url: string;
  };
}

interface AjaxEmitPostMessage {
  '@HasPassed': {
    hasPassed: boolean;
  };
}

export const pmAjax = createPostMessage<AjaxEmitPostMessage, AjaxOnPostMessage>({
  is: 'parent',
  iframeSelector: '#currency-iframe',
});
