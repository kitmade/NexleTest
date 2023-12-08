import * as React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {useTheme} from '../hooks';

interface CircleButtonProps extends TouchableOpacityProps {
  size?: number;
  borderColor?: string;
}

const CircleButton = ({
  borderColor,
  children,
  size = 16,
  ...props
}: CircleButtonProps) => {
  const {Colors, Layout} = useTheme();
  const buttonStyle = {
    height: size,
    width: size,
    borderColor: borderColor || Colors['#647FFF'],
    borderWidth: 1,
    borderRadius: size,
  };

  return (
    <TouchableOpacity style={[buttonStyle, Layout.center]} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default CircleButton;
