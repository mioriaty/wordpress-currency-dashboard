import { useSelector } from 'react-redux';
import { Modal } from 'components/AntdCustomize/Modal/Modal';
import { initializationSelector, settingSelector } from 'containers/selectors';
import { Text, View } from 'wiloke-react-core';
import { useChangeModalRatingVisible, useChangeModalSaveCompleteVisible } from '../../actions/actionSetting';
import * as styles from './styles';

export const ModalSaveComplete = () => {
  const { modalSaveCompleteVisible } = useSelector(settingSelector);
  const { themeId, shopDomain } = useSelector(initializationSelector);
  const changeModalRatingVisible = useChangeModalRatingVisible();
  const changeModalSaveCompleteVisible = useChangeModalSaveCompleteVisible();

  const shopify_pagebuilder = `https://${shopDomain}/admin/themes/${themeId}/editor?context=apps`;

  return (
    <Modal
      style={{ minWidth: 600 }}
      visible={modalSaveCompleteVisible}
      onOk={() => {
        window.open(shopify_pagebuilder);
        changeModalSaveCompleteVisible(false);
        changeModalRatingVisible(true);
      }}
      onCancel={() => {
        changeModalSaveCompleteVisible(false);
      }}
      okText="Publish"
      title="Your setting has been saved"
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <View css={styles.container}>
        <Text css={styles.title}>How can I publish this feature?</Text>
        <Text css={styles.description}>
          Step1 :
          <Text tagName="a" href={shopify_pagebuilder} target="_blank">
            Click on this link
          </Text>
        </Text>
        <Text css={styles.description}>Step 2: Switch {'APP_NAME'} to Enable status</Text>
        <Text css={styles.description}>
          After change,
          <Text tagName="a" href={`https://${shopDomain}`} target="_blank">
            open your store
          </Text>
          and make everything works fine
        </Text>
        <Text css={styles.description}>It usually takes about 20 seconds for the changes to be applied</Text>
      </View>
    </Modal>
  );
};
