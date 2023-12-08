import {MetricsSizes} from '../../theme';

type MetricSizesType = typeof MetricsSizes;

export type Margins =
  | 'Margin'
  | 'BMargin'
  | 'TMargin'
  | 'RMargin'
  | 'LMargin'
  | 'VMargin'
  | 'HMargin';
export type Paddings =
  | 'Padding'
  | 'BPadding'
  | 'TPadding'
  | 'RPadding'
  | 'LPadding'
  | 'VPadding'
  | 'HPadding';

export type MarginKeys = `${keyof MetricSizesType}${Margins}`;
export type PaddingKeys = `${keyof MetricSizesType}${Paddings}`;

export type GuttersType = {
  [key in MarginKeys | PaddingKeys]: {
    [k in string]: number;
  };
};
