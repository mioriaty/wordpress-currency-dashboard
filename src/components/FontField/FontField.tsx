import { FC, useEffect } from 'react';
import { createGlobalState } from 'react-use';
import { debounce } from 'utils/functions/debounce';
import { SelectAntd, Option, SelectAntdProps } from 'components/AntdCustomize/SelectAntd/SelectAntd';
import WebFont from 'utils/webfontloader';
import { ActivityIndicator, useStyleSheet, useTheme, View } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import googleFonts from './googleFonts';
import * as styles from './styles';

export interface FontFieldProps extends Omit<SelectAntdProps, 'setOptionStyle' | 'onChange'> {
  /** Sự kiện khi chọn 1 option */
  onChange?: (value: string) => void;
  onStartAddFont?: (fonts: string[]) => void;
  onFailedAddFont?: (fonts: string[]) => void;
  value?: string;
}

const useGlobalState = createGlobalState<string[]>([]);

export const FontField: FC<FontFieldProps> = ({
  defaultValue = '',
  style,
  className,
  value = 'Roboto',
  onChange,
  onFailedAddFont,
  onStartAddFont,
  ...rest
}) => {
  const { colors } = useTheme();
  const { styles: styleHooks } = useStyleSheet(colors);
  const [fontLoadedState, setFontLoaded] = useGlobalState();

  const handleLoadFont = (data: Option[]) => {
    const fonts = data.map(item => item.value) as string[];
    const fontsNeedLoad = fonts.filter(font => !fontLoadedState?.includes(font));
    if (fontsNeedLoad.length > 0) {
      WebFont.load({
        google: {
          families: [...fontsNeedLoad.map(font => font)],
        },
        active() {
          setFontLoaded(fontLoadedState => [...fontLoadedState, ...fontsNeedLoad]);
        },
        loading() {
          onStartAddFont?.(fontsNeedLoad);
        },
        inactive() {
          onFailedAddFont?.(fontsNeedLoad);
        },
      });
    }
  };

  useEffect(() => {
    const data: Option[] = [{ label: value, value }];
    handleLoadFont(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleLoadFonts = () => {
    const itemElement = Array.from(document.querySelectorAll('.ant-select-item.ant-select-item-option'));
    const fonts = (itemElement as HTMLElement[]).map(item => ({ label: item.innerText, value: item.innerText }));
    handleLoadFont(fonts);
  };

  return (
    <SelectAntd
      {...rest}
      showSearch
      listItemHeight={35}
      data={googleFonts.map(item => ({ ...item, value: item.value }))}
      defaultValue={value || defaultValue}
      value={value}
      style={{ ...style, fontFamily: value || defaultValue }}
      getPopupContainer={trigger => trigger.parentElement}
      renderOption={item => {
        return (
          <View css={styles.font}>
            <View style={{ fontFamily: `"${item.value}"`, fontSize: 12, paddingTop: 10, paddingBottom: 10 }}>{item.label}</View>
            {!fontLoadedState?.includes(item.label) && <ActivityIndicator className={styleHooks(styles.loadingIcon)} size={16} color="gray4" />}
          </View>
        );
      }}
      className={classNames(className, styleHooks(styles.select))}
      dropdownClassName={styleHooks(styles.dropdown)}
      onChange={onChange}
      onSearch={debounce(handleLoadFonts, 100)}
      onPopupScroll={debounce(handleLoadFonts, 100)}
      onDropdownVisibleChange={open => open && debounce(handleLoadFonts, 100)()}
    />
  );
};
