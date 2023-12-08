import * as React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {useTheme} from '../hooks';
import {useNavigation} from '@react-navigation/native';

interface HeaderBackButtonProps extends TouchableOpacityProps {}

const HeaderBackButton = ({onPress, ...props}: HeaderBackButtonProps) => {
  const {Icons, Gutters} = useTheme();
  const {canGoBack, goBack} = useNavigation();

  const onButtonPress = (event: GestureResponderEvent) => {
    goBack();
    onPress && onPress(event);
  };

  if (!canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity
      style={Gutters.mediumLPadding}
      onPress={onButtonPress}
      {...props}>
      <Icons.LeftChevron />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
