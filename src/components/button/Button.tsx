import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './Button.styles';

interface ButtonProps {
  text: string | number;
  handlePress: () => void;
  disabled?: boolean;
  type?: 'solid' | 'outline';
}

export default function Button({
  text,
  handlePress,
  disabled,
  type = 'solid',
}: ButtonProps) {
  const buttonStyles = {
    ...styles.button,
    ...(type === 'outline' && styles.outlineButton),
    ...(disabled && styles.disabledButton),
  };

  const textStyles = {
    ...styles.buttonText,
    ...(type === 'outline' && styles.outlineButtonText),
    ...(disabled && styles.disabledButtonText),
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
}
