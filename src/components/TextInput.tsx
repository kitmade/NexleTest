import * as React from 'react';
import {
  Pressable,
  TextInput as RNInput,
  TextInputProps as RNInputProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../hooks';
import Text from './Text';

interface TextInputProps extends RNInputProps {
  label?: string;
  errorMsg?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextInput = ({
  errorMsg,
  label,
  style = {},
  containerStyle,
  ...props
}: TextInputProps) => {
  // const [open, setOpen] = React.useState(false);
  const {Colors, Gutters} = useTheme();
  const inputRef = React.useRef<RNInput>(null);

  const {color = Colors['#FFF'], ...restStyle} = StyleSheet.flatten(style);
  const borderBottomColor = Colors['#647FFF'];

  const _onPress = () => {
    inputRef.current?.focus();
  };

  const onBlur = () => {
    // setOpen(false);
  };

  return (
    <Pressable onPress={_onPress} style={containerStyle}>
      {label && (
        <Text style={{color: Colors['rgba(255, 255, 255, 0.5)']}}>{label}</Text>
      )}
      <RNInput
        ref={inputRef}
        onBlur={onBlur}
        style={[
          styles.textInput,
          {color, borderBottomColor},
          Gutters.tinyVPadding,
          restStyle,
        ]}
        {...props}
      />
      {errorMsg && (
        <Text style={[{color: Colors.red}, Gutters.tinyTMargin]}>
          {errorMsg}
        </Text>
      )}
    </Pressable>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
  },
});
