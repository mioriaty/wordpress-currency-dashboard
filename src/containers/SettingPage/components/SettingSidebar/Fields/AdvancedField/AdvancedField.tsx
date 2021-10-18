import { BackgroundColorField } from './BackgroundColorField';
import { PaddingBottomField } from './PaddingBottomField';
import { PaddingLeftField } from './PaddingLeftField';
import { PaddingRightField } from './PaddingRightField';
import { PaddingTopField } from './PaddingTopField';
import { TextColorField } from './TextColorField';

export const AdvancedField = () => {
  return (
    <>
      <PaddingTopField />
      <PaddingLeftField />
      <PaddingRightField />
      <PaddingBottomField />
      <TextColorField />
      <BackgroundColorField />
      {/* <FontField /> */}
    </>
  );
};
