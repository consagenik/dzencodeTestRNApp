import React, {ChangeEvent} from 'react';
import {Text, TextInput, View} from 'react-native';

import styles from './InputField.styles';

interface InputFieldProps {
  value: string;
  error: string | undefined;
  label: string;
  placeholder: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  multiline?: boolean;
  numberOfLines?: number;
  type?: 'text' | 'email' | 'url' | 'number' | 'password';
}

function getKeyboardType(
  type: 'text' | 'email' | 'url' | 'number' | 'password',
) {
  switch (type) {
    case 'email':
      return 'email-address';
    case 'url':
      return 'url';
    case 'number':
      return 'numeric';
    case 'password':
      return 'default';
    default:
      return 'default';
  }
}

export default function InputField({
  value,
  error,
  label,
  placeholder,
  handleChange,
  handleBlur,
  multiline,
  numberOfLines,
  type = 'text',
}: InputFieldProps) {
  const inputFieldStyles = {
    ...styles.inputField,
    ...(multiline && numberOfLines ? {height: 80} : {}),
  };

  return (
    <View style={styles.inputFieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={getKeyboardType(type)}
        autoCapitalize={['email', 'url'].includes(type) ? 'none' : 'sentences'}
        style={inputFieldStyles}
        placeholder={placeholder}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      <View style={styles.errorWrapper}>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
}
