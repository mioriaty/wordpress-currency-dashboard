import { Dropdown, Empty, message } from 'antd';
import 'antd/dist/antd.css';
import { usePopupPurchaseCode } from 'containers/LoginPage';
import moneyFormats from 'containers/SettingPage/moneyFormats';
import { equals, isEmpty } from 'ramda';
import { FC, useEffect, useRef, useState } from 'react';
import reorder from 'utils/reorder';
import { LineAwesome, OuterTrigger, Text, useStyleSheet, View } from 'wiloke-react-core';
import { Flag } from '../Flag/Flag';
import Sortable, { SortableProps } from '../Sortable';
import { TextInput } from '../TextInput';
import TextInputWrapper from '../TextInputWrapper/TextInputWrapper';
import { VirtualList } from '../VirtualList/VirtualList';
import * as styles from './styles';

const data: Array<{ label: string; value: string }> = Object.entries(moneyFormats).reduce((acc, [key, value]) => {
  acc.push({ label: value.money_name, value: key });
  return acc;
}, [] as any);

export interface CurrenciesFieldProps {
  onChange?: (value: typeof data) => void;
  value?: typeof data;
  isVerified?: boolean;
}

export const CurrenciesField: FC<CurrenciesFieldProps> = ({ onChange, value = [], isVerified = false }) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<typeof data>(value);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLElement | null>(null);
  const [disabled, setDisabled] = useState(false);
  const visibleModal = usePopupPurchaseCode();
  const { styles: style } = useStyleSheet();

  useEffect(() => {
    if (!isVerified && state.length === 3) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isVerified, state.length]);

  const _handleSelectFlag = ({ isActive, label, value }: { isActive: boolean; label: string; value: string }) => () => {
    if (!disabled) {
      if (isActive) setState(state => state.filter(item => item.value !== value));
      else setState(state => state.concat({ label, value }));
    } else {
      message.warning({
        icon: <div />,
        content: (
          <div
            className={style(styles.message)}
            onClick={() => {
              visibleModal(true);
            }}
          >
            Please <span style={{ color: '#FFC947' }}>Upgrade To Premium</span> to select more
          </div>
        ),
        duration: 10,
      });
    }
  };

  const _renderList = () => {
    const items = search
      ? data.filter(item => {
          return item.label.toLowerCase().includes(search.toLowerCase()) || item.value.toLowerCase().includes(search.toLowerCase());
        })
      : data;
    return (
      <OuterTrigger
        onClick={({ target }) => {
          const _target = target as HTMLElement;
          if (!_target.getAttribute('class')?.includes('DROPDOWN_OUTERTRIGGER_SIGNAL')) {
            setVisible(false);
          }
        }}
      >
        <View css={styles.listContainer}>
          <View css={styles.listBody}>
            {isEmpty(items) ? (
              <Empty />
            ) : (
              <VirtualList
                containerCSS={{ flex: 1, height: '100%' }}
                rowCount={items.length}
                rowHeight={60}
                rowRender={index => {
                  const { label, value } = items[index];
                  const isActive = state.findIndex(item => item.value === value) !== -1;
                  return (
                    <View key={value} onClick={_handleSelectFlag({ isActive, label, value })} css={styles.listItem(disabled)}>
                      <Flag currency={value} variant="round" size="lg" />
                      <View>
                        <Text css={styles.listItemLabel}>{value}</Text>
                        <Text numberOfLines={1} size={13} tagName="span" css={styles.listItemLabel}>
                          {label}
                        </Text>
                      </View>
                      {isActive && <LineAwesome size={22} css={styles.listItemActiveIcon} name="check" color="primary" />}
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      </OuterTrigger>
    );
  };

  const _renderItemResult: SortableProps<any>['renderItem'] = ({ index, dragHandleProps }) => {
    const { value } = state[index];
    const _value = value as keyof typeof moneyFormats;

    return (
      <View backgroundColor="light" css={styles.itemResultContainer} key={value} {...dragHandleProps}>
        <View css={styles.itemResultLeft}>
          <Flag currency={value} variant="default" size="lg" />
          <View css={styles.itemResultLabel}>
            <Text>{moneyFormats[_value].money_name}</Text>
            <Text size={10}>{value}</Text>
          </View>
        </View>
        <View>
          <LineAwesome size={16} name="arrows-alt" css={styles.itemResultDragIcon} />
          <LineAwesome
            size={18}
            name="trash"
            css={styles.itemResultTrashIcon}
            onClick={() => setState(state => state.filter(item => item.value !== value))}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    setState(value);
  }, [value]);

  useEffect(() => {
    if (!equals(state, value)) onChange?.(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <View>
      <Dropdown getPopupContainer={() => containerRef.current as any} overlay={_renderList()} visible={visible} trigger={['click']}>
        <View ref={containerRef}>
          <TextInputWrapper iconProps={{ className: 'DROPDOWN_OUTERTRIGGER_SIGNAL' }} onClear={() => setSearch('')}>
            <TextInput
              classNameInput="DROPDOWN_OUTERTRIGGER_SIGNAL"
              block
              radius={6}
              borderWidth={2}
              borderColor="gray4"
              value={search}
              placeholder="Search currencies..."
              onValueChange={setSearch}
              onFocus={() => setVisible(true)}
            />
          </TextInputWrapper>
        </View>
      </Dropdown>

      <Sortable
        data={state.map(item => ({ id: item.value }))}
        renderItem={_renderItemResult}
        onDragEnd={result => {
          const { destination, source } = result;
          if (!destination) {
            return;
          }
          setState(state => reorder(state, source.index, destination.index));
        }}
      />
    </View>
  );
};
