import { Dropdown, Empty } from 'antd';
import 'antd/dist/antd.css';
import { equals, isEmpty } from 'ramda';
import { FC, useEffect, useRef, useState } from 'react';
import reorder from 'utils/reorder';
import { LineAwesome, OuterTrigger, Text, View } from 'wiloke-react-core';
import { Button } from '../Button';
import Sortable, { SortableProps } from '../Sortable';
import { TextInput } from '../TextInput';
import TextInputWrapper from '../TextInputWrapper/TextInputWrapper';
import { VirtualList } from '../VirtualList/VirtualList';
import { Flag } from '../Flag/Flag';
import * as styles from './styles';

const data: Array<{ label: string; value: string }> = [
  { label: 'US Dollar', value: 'USD' },
  { label: 'Bahraini Dinar', value: 'BHD' },
  { label: 'Euro', value: 'EUR' },
  { label: 'British Pound Sterling', value: 'GBP' },
  { label: 'Canadian Dollar', value: 'CAD' },
  { label: 'Albanian Lek', value: 'ALL' },
  { label: 'Algerian Dinar', value: 'DZD' },
  { label: 'Angolan Kwanza', value: 'AOA' },
  { label: 'Argentine Peso', value: 'ARS' },
  { label: 'Armenian Dram', value: 'AMD' },
  { label: 'Aruban Florin', value: 'AWG' },
  { label: 'Australian Dollar', value: 'AUD' },
  { label: 'Barbadian Dollar', value: 'BBD' },
  { label: 'Azerbaijani Manat', value: 'AZN' },
  { label: 'Bangladeshi Taka', value: 'BDT' },
  { label: 'Bahamian Dollar', value: 'BSD' },
  { label: 'Belarusian Ruble', value: 'BYN' },
  { label: 'Belize Dollar', value: 'BZD' },
  { label: 'Bhutanese Ngultrum', value: 'BTN' },
  { label: 'Bosnia-Herzegovina Convertible Mark', value: 'BAM' },
  { label: 'Brazilian Real', value: 'BRL' },
  { label: 'Bolivian Boliviano', value: 'BOB' },
  { label: 'Botswanan Pula', value: 'BWP' },
  { label: 'Brunei Dollar', value: 'BND' },
  { label: 'Bulgarian Lev', value: 'BGN' },
  { label: 'Myanmar Kyat', value: 'MMK' },
  { label: 'Cambodian Riel', value: 'KHR' },
  { label: 'Cayman Islands Dollar', value: 'KYD' },
  { label: 'Central African CFA Franc', value: 'XAF' },
  { label: 'Chilean Peso', value: 'CLP' },
  { label: 'Chinese Yuan', value: 'CNY' },
  { label: 'Colombian Peso', value: 'COP' },
  { label: 'Costa Rican Colon', value: 'CRC' },
  { label: 'Croatian Kuna', value: 'HRK' },
  { label: 'Czech Republic Koruna', value: 'CZK' },
  { label: 'Danish Krone', value: 'DKK' },
  { label: 'Dominican Peso', value: 'DOP' },
  { label: 'East Caribbean Dollar', value: 'XCD' },
  { label: 'Egyptian Pound', value: 'EGP' },
  { label: 'Ethiopian Birr', value: 'ETB' },
  { label: 'CFP Franc', value: 'XPF' },
  { label: 'Fijian Dollar', value: 'FJD' },
  { label: 'Gambian Dalasi', value: 'GMD' },
  { label: 'Ghanaian Cedi', value: 'GHS' },
  { label: 'Guatemalan Quetzal', value: 'GTQ' },
  { label: 'Guyanaese Dollar', value: 'GYD' },
  { label: 'Georgian Lari', value: 'GEL' },
  { label: 'Honduran Lempira', value: 'HNL' },
  { label: 'Hong Kong Dollar', value: 'HKD' },
  { label: 'Hungarian Forint', value: 'HUF' },
  { label: 'Icelandic Krona', value: 'ISK' },
  { label: 'Indian Rupee', value: 'INR' },
  { label: 'Indonesian Rupiah', value: 'IDR' },
  { label: 'Israeli New Shekel', value: 'ILS' },
  { label: 'Jamaican Dollar', value: 'JMD' },
  { label: 'Japanese Yen', value: 'JPY' },
  { label: 'Jersey Pound', value: 'JEP' },
  { label: 'Jordanian Dinar', value: 'JOD' },
  { label: 'Kazakhstani Tenge', value: 'KZT' },
  { label: 'Kenyan Shilling', value: 'KES' },
  { label: 'Kuwaiti Dinar', value: 'KWD' },
  { label: 'Kyrgystani Som', value: 'KGS' },
  { label: 'Latvian Lats', value: 'LVL' },
  { label: 'Lebanese Pound', value: 'LBP' },
  { label: 'Lithuanian Litas', value: 'LTL' },
  { label: 'Malagasy Ariary', value: 'MGA' },
  { label: 'Macedonian Denar', value: 'MKD' },
  { label: 'Macanese Pataca', value: 'MOP' },
  { label: 'Maldivian Rufiyaa', value: 'MVR' },
  { label: 'Mexican Peso', value: 'MXN' },
  { label: 'Malaysian Ringgit', value: 'MYR' },
  { label: 'Mauritian Rupee', value: 'MUR' },
  { label: 'Moldovan Leu', value: 'MDL' },
  { label: 'Moroccan Dirham', value: 'MAD' },
  { label: 'Mongolian Tugrik', value: 'MNT' },
  { label: 'Mozambican Metical', value: 'MZN' },
  { label: 'Namibian Dollar', value: 'NAD' },
  { label: 'Nepalese Rupee', value: 'NPR' },
  { label: 'Netherlands Antillean Guilder', value: 'ANG' },
  { label: 'New Zealand Dollar', value: 'NZD' },
  { label: 'Nicaraguan Cordoba', value: 'NIO' },
  { label: 'Nigerian Naira', value: 'NGN' },
  { label: 'Norwegian Krone', value: 'NOK' },
  { label: 'Omani Rial', value: 'OMR' },
  { label: 'Pakistani Rupee', value: 'PKR' },
  { label: 'Papua New Guinean Kina', value: 'PGK' },
  { label: 'Paraguayan Guarani', value: 'PYG' },
  { label: 'Peruvian Nuevo Sol', value: 'PEN' },
  { label: 'Philippine Peso', value: 'PHP' },
  { label: 'Polish Zloty', value: 'PLN' },
  { label: 'Qatari Rial', value: 'QAR' },
  { label: 'Romanian Leu', value: 'RON' },
  { label: 'Russian Ruble', value: 'RUB' },
  { label: 'Rwandan Franc', value: 'RWF' },
  { label: 'Samoan Tala', value: 'WST' },
  { label: 'Saudi Riyal', value: 'SAR' },
  { label: 'Sao Tome and Principe Dobra', value: 'STD' },
  { label: 'Serbian Dinar', value: 'RSD' },
  { label: 'Seychellois Rupee', value: 'SCR' },
  { label: 'Singapore Dollar', value: 'SGD' },
  { label: 'Syrian Pound', value: 'SYP' },
  { label: 'South African Rand', value: 'ZAR' },
  { label: 'South Korean Won', value: 'KRW' },
  { label: 'Sri Lankan Rupee', value: 'LKR' },
  { label: 'Swedish Krona', value: 'SEK' },
  { label: 'Swiss Franc', value: 'CHF' },
  { label: 'New Taiwan Dollar', value: 'TWD' },
  { label: 'Thai Baht', value: 'THB' },
  { label: 'Tanzanian Shilling', value: 'TZS' },
  { label: 'Trinidad and Tobago Dollar', value: 'TTD' },
  { label: 'Tunisian Dinar', value: 'TND' },
  { label: 'Turkish Lira', value: 'TRY' },
  { label: 'Ugandan Shilling', value: 'UGX' },
  { label: 'Ukrainian Hryvnia', value: 'UAH' },
  { label: 'United Arab Emirates Dirham', value: 'AED' },
  { label: 'Uruguayan Peso', value: 'UYU' },
  { label: 'Vanuatu Vatu', value: 'VUV' },
  { label: 'Venezuelan Bolivar', value: 'VEF' },
  { label: 'Vietnamese Dong', value: 'VND' },
  { label: 'CFA Franc BCEAO', value: 'XOF' },
  { label: 'Zambian Kwacha', value: 'ZMW' },
  { label: 'Afghan Afghani', value: 'AFN' },
  { label: 'Bermudan Dollar', value: 'BMD' },
  { label: 'Burundian Franc', value: 'BIF' },
  { label: 'Cape Verdean Escudo', value: 'CVE' },
  { label: 'Comorian Franc', value: 'KMF' },
  { label: 'Congolese Franc', value: 'CDF' },
  { label: 'Cuban Convertible Peso', value: 'CUC' },
  { label: 'Cuban Peso', value: 'CUP' },
  { label: 'Djiboutian Franc', value: 'DJF' },
  { label: 'Eritrean Nakfa', value: 'ERN' },
  { label: 'Estonian Kroon', value: 'EEK' },
  { label: 'Falkland Islands Pound', value: 'FKP' },
  { label: 'Gibraltar Pound', value: 'GIP' },
  { label: 'Gold Ounce', value: 'XAU' },
  { label: 'Guernsey Pound', value: 'GGP' },
  { label: 'Guinean Franc', value: 'GNF' },
  { label: 'Haitian Gourde', value: 'HTG' },
  { label: 'IMF Special Drawing Rights', value: 'XDR' },
  { label: 'Iranian Rial', value: 'IRR' },
  { label: 'Iraqi Dinar', value: 'IQD' },
  { label: 'Isle of Man Pound', value: 'IMP' },
  { label: 'Laotian Kip', value: 'LAK' },
  { label: 'Lesotho Loti', value: 'LSL' },
  { label: 'Liberian Dollar', value: 'LRD' },
  { label: 'Libyan Dinar', value: 'LYD' },
  { label: 'Malawian Kwacha', value: 'MWK' },
  { label: 'Mauritanian Ouguiya', value: 'MRO' },
  { label: 'North Korean Won', value: 'KPW' },
  { label: 'Palladium Ounce', value: 'XPD' },
  { label: 'Panamanian Balboa', value: 'PAB' },
  { label: 'Platinum Ounce', value: 'XPT' },
  { label: 'Saint Helena Pound', value: 'SHP' },
  { label: 'Salvadoran Colon', value: 'SVC' },
  { label: 'Seborgan Luigino', value: 'SPL' },
  { label: 'Sierra Leonean Leone', value: 'SLL' },
  { label: 'Silver Ounce', value: 'XAG' },
  { label: 'Slovak Koruna', value: 'SKK' },
  { label: 'Solomon Islands Dollar', value: 'SBD' },
  { label: 'Somali Shilling', value: 'SOS' },
  { label: 'Sudanese Pound', value: 'SDG' },
  { label: 'Surinamese Dollar', value: 'SRD' },
  { label: 'Swazi Lilangeni', value: 'SZL' },
  { label: 'Tajikistani Somoni', value: 'TJS' },
  { label: 'Tongan Paʻanga', value: 'TOP' },
  { label: 'Turkmenistani Manat', value: 'TMT' },
  { label: 'Tuvaluan Dollar', value: 'TVD' },
  { label: 'Uzbekistan Som', value: 'UZS' },
  { label: 'Yemeni Rial', value: 'YER' },
  { label: 'Zimbabwean Dollar', value: 'ZWD' },
];

export interface CurrenciesFieldProps {
  onChange?: (value: typeof data) => void;
  value?: typeof data;
}

export const CurrenciesField: FC<CurrenciesFieldProps> = ({ onChange, value = [] }) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<typeof data>(value);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLElement | null>(null);

  const _renderList = () => {
    const items = search ? data.filter(item => item.label.toLowerCase().includes(search.toLowerCase())) : data;
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
                rowHeight={43}
                rowRender={index => {
                  const { label, value } = items[index];
                  const isActive = state.findIndex(item => item.value === value) !== -1;
                  return (
                    <View
                      key={value}
                      onClick={() => {
                        if (isActive) setState(state => state.filter(item => item.value !== value));
                        else setState(state => state.concat({ label, value }));
                      }}
                      css={styles.listItem}
                    >
                      <Flag currency={value} variant="default" size="md" />
                      <Text tagName="span" css={styles.listItemLabel}>
                        {label}
                      </Text>
                      {isActive && <LineAwesome size={22} css={styles.listItemActiveIcon} name="check" color="primary" />}
                    </View>
                  );
                }}
              />
            )}
          </View>
          <View css={styles.listFooter}>
            <Button backgroundColor="transparent" color="gray8" onClick={() => setState([])}>
              Clear All
            </Button>
            <Button backgroundColor="transparent" color="primary" borderColor="primary" borderWidth={1} borderStyle="solid" radius={6}>
              Save Preferences
            </Button>
          </View>
        </View>
      </OuterTrigger>
    );
  };

  const _renderItemResult: SortableProps<any>['renderItem'] = ({ index, dragHandleProps }) => {
    const { label, value } = state[index];
    return (
      <View css={styles.itemResultContainer} key={value} {...dragHandleProps}>
        <LineAwesome name="bars" css={styles.itemResultDragIcon} />
        <Flag currency={value} variant="default" size="md" />
        <View css={styles.itemResultLabel}>
          <Text>{label}</Text>
          <Text size={10}>{value}</Text>
        </View>
        <LineAwesome
          size={14}
          name="trash"
          css={styles.itemResultTrashIcon}
          onClick={() => setState(state => state.filter(item => item.value !== value))}
        />
      </View>
    );
  };

  useEffect(() => {
    setState(value);
  }, [value]);

  useEffect(() => {
    if (!equals(state, value)) onChange?.(state);
  }, [state]);

  return (
    <View>
      <Dropdown getPopupContainer={() => containerRef.current as any} overlay={_renderList()} visible={visible} trigger={['click']}>
        <View ref={containerRef}>
          <TextInputWrapper iconProps={{ className: 'DROPDOWN_OUTERTRIGGER_SIGNAL' }} onClear={() => setSearch('')}>
            <TextInput
              classNameInput="DROPDOWN_OUTERTRIGGER_SIGNAL"
              block
              value={search}
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

      {/* <View css={{ height: `200px`, overflow: 'auto' }}>
        <VirtualList
          containerCSS={{ flex: 1, height: '100%' }}
          rowCount={state.length}
          rowHeight={60}
          rowRender={index => {
            const { label, value } = state[index];
            return _renderItemResult({ label, value });
          }}
        />
      </View> */}
    </View>
  );
};
