import {StyleSheet} from 'react-native';
import {GuttersType} from '../types';

export const Colors = {
  '#647FFF': '#647FFF',
  'rgba(255, 255, 255, 0.5)': 'rgba(255, 255, 255, 0.5)',
  '#FFF': '#FFF',
  'rgba(255, 255, 255, 0.12)': 'rgba(255, 255, 255, 0.12)',
  asd: ['#8A32A9', '#8A00FF'],
  red: 'red',
};

export const MetricsSizes = {
  none: 0,
  tiny: 8,
  small: 20,
  medium: 16,
  regular: 30,
};

export const FontSize = {
  extraLarge: 22,
  large: 18,
  medium: 16,
  regular: 14,
  small: 12,
  extraSmall: 9,
};

export const Commons = StyleSheet.create({
  categoryItem: {width: 109, height: 71, borderWidth: 1, borderRadius: 8},
  height2: {height: 2},
  noneBorderBottom: {borderBottomWidth: 0},
  paddingTop80p: {paddingTop: '80%'},
});

export const Fonts = StyleSheet.create({
  extraLargeText: {
    fontSize: FontSize.extraLarge,
  },
  largeText: {
    fontSize: FontSize.large,
  },
  mediumText: {
    fontSize: FontSize.medium,
  },
  regularText: {
    fontSize: FontSize.regular,
  },
  smallText: {
    fontSize: FontSize.small,
  },
  extraSmallText: {
    fontSize: FontSize.extraSmall,
  },
});

export const Gutters = StyleSheet.create(
  Object.entries(MetricsSizes).reduce(
    (curValue, [key, value]) => ({
      ...curValue /* Margins */,
      [`${key}Margin`]: {
        margin: value,
      },
      [`${key}BMargin`]: {
        marginBottom: value,
      },
      [`${key}TMargin`]: {
        marginTop: value,
      },
      [`${key}RMargin`]: {
        marginRight: value,
      },
      [`${key}LMargin`]: {
        marginLeft: value,
      },
      [`${key}VMargin`]: {
        marginVertical: value,
      },
      [`${key}HMargin`]: {
        marginHorizontal: value,
      },
      /* Paddings */
      [`${key}Padding`]: {
        padding: value,
      },
      [`${key}BPadding`]: {
        paddingBottom: value,
      },
      [`${key}TPadding`]: {
        paddingTop: value,
      },
      [`${key}RPadding`]: {
        paddingRight: value,
      },
      [`${key}LPadding`]: {
        paddingLeft: value,
      },
      [`${key}VPadding`]: {
        paddingVertical: value,
      },
      [`${key}HPadding`]: {
        paddingHorizontal: value,
      },
    }),
    {} as GuttersType,
  ),
);

export const Layout = StyleSheet.create({
  center: {alignItems: 'center', justifyContent: 'center'},
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
  row: {flexDirection: 'row'},
  alignItemsCenter: {alignItems: 'center'},
  justifyContentBetween: {justifyContent: 'space-between'},
  justifyContentEnd: {justifyContent: 'flex-end'},
  fill: {flex: 1},
  textAlignRight: {textAlign: 'right'},
});

export default {
  Colors,
  MetricsSizes,
};
