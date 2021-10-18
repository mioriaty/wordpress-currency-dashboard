import { Modal } from 'components/AntdCustomize/Modal/Modal';
import { settingSelector } from 'containers/selectors';
import { Text, View } from 'wiloke-react-core';
import { useSelector } from 'react-redux';
import { FEEDBACK_MAIL, REVIEW_URL } from 'env';
import { useChangeModalRatingVisible } from '../../actions/actionSetting';
import * as styles from './styles';

export const ModalRating = () => {
  const { modalRatingVisible } = useSelector(settingSelector);

  const changeModalRatingVisible = useChangeModalRatingVisible();

  return (
    <Modal
      style={{ minWidth: 600 }}
      onOk={() => {
        window.open(REVIEW_URL);
        changeModalRatingVisible(false);
      }}
      onCancel={() => {
        changeModalRatingVisible(false);
      }}
      cancelButtonProps={{
        href: `mailto:${FEEDBACK_MAIL}`,
        target: '_blank',
      }}
      title="Your setting has been saved"
      okText="Great! I'll leave a good review"
      cancelText="Not good, I have some feedbacks"
      visible={modalRatingVisible}
    >
      <View css={styles.container}>
        <Text css={styles.title}>Thank you for using Multi Currency Converter</Text>
        <Text css={styles.message}>Your app settings have been finished. Could you please share with us your experience of this App</Text>
      </View>
    </Modal>
  );
};
