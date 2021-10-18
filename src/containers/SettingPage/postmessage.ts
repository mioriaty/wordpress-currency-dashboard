import { createPostMessage } from 'wiloke-react-core/utils';
import moneyFormats from './moneyFormats';

type CurrencyKey = keyof typeof moneyFormats;

export type Variant = 'style1' | 'style2' | 'style3' | 'style4' | 'style5' | 'style6';

export type Placement =
  | 'top_left'
  | 'top_right'
  | 'bottom_left'
  | 'bottom_right'
  | 'top_left_bar'
  | 'top_right_bar'
  | 'bottom_left_bar'
  | 'bottom_right_bar';

export type Size = 'sm' | 'md' | 'lg';

export interface CurrencySettings {
  variant: Variant;
  currencies: CurrencyKey[] | 'all';
  placement?: Placement;
  backgroundColor: string;
  color: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  size: Size;
  css: string;
  addToHeader: boolean;
  autoDetectCurrency: boolean;
}

export interface OnMessage {}

export interface EmitMessage {
  '@currencySettings': Record<DeviceDisplay, CurrencySettings> | Record<DeviceDisplay, CurrencySettings>[];
}

export const pm = createPostMessage<EmitMessage, OnMessage>({
  is: 'parent',
  url: '*',
  iframeSelector: '#IFRAME',
});
