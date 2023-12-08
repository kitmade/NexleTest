import * as React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import {useTheme} from '../hooks';

interface TextProps extends RNTextProps {}

const Text = ({style = {}, ...props}: TextProps) => {
  const {Colors} = useTheme();

  const {color = Colors['#FFF'], ...restStyle} = StyleSheet.flatten(style);

  return <RNText style={[{color}, restStyle]} {...props} />;
};

export default Text;
