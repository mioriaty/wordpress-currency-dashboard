import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Modal } from 'components/AntdCustomize/Modal/Modal';
import { Button } from 'components/Button';
import { initializationSelector, validationSelector } from 'containers/selectors';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { useStyleSheet, View } from 'wiloke-react-core';
import { usePopupPurchaseCode, useVerifyPurchaseCode } from '.';
import * as css from './styles';

const VerificationPopup = () => {
  const { clientSite, email, purchaseCodeLink } = useSelector(initializationSelector);
  const { popupPurchaseCode, verificationStatus, message } = useSelector(validationSelector);
  const verification = useVerifyPurchaseCode();
  const setShow = usePopupPurchaseCode();
  const { styles } = useStyleSheet();

  const onFinish = (values: any) => {
    const { purchaseCode }: { purchaseCode: string } = values;

    if (purchaseCode && email && clientSite) {
      console.log(clientSite, email, purchaseCode);
      verification.request({ email, clientSite, purchaseCode });
    }
  };

  return (
    <Modal
      width={350}
      className={styles(css.modal)}
      visible={popupPurchaseCode}
      onOk={() => {
        setShow(false);
      }}
      onCancel={() => {
        setShow(false);
      }}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <View backgroundColor="light" css={css.container}>
        <Form layout="vertical" name="basic" onFinish={onFinish}>
          <FormItem label="Purchase Code" name="purchaseCode" rules={[{ required: true, message: 'Please input your evanto purchase code!' }]}>
            <Input size="small" style={{ height: '48px', borderRadius: 6 }} />
          </FormItem>

          {!!message && (
            <View css={{ marginBottom: '5px' }} color="tertiary">
              {parse(message)}
            </View>
          )}

          {purchaseCodeLink && (
            <View
              tagName="a"
              backgroundColor="light"
              css={{ marginBottom: '6px', display: 'block', marginTop: '6px' }}
              color="primary"
              target="_blank"
              href={purchaseCodeLink}
            >
              Where is my purchase code?
            </View>
          )}

          <FormItem>
            <Button block loading={verificationStatus === 'loading'} size="small" type="submit" radius={6}>
              Unlock
            </Button>
          </FormItem>
        </Form>
      </View>
    </Modal>
  );
};

export { VerificationPopup };
