import React from 'react';
import {Text, View} from 'react-native';

import styles from './InformationMessage.styles';

interface InformationMessageProps {
  text: string;
}

export default function InformationMessage({text}: InformationMessageProps) {
  return (
    <View style={styles.informationMessageContainer}>
      <Text style={styles.informationMessage}>{text}</Text>
    </View>
  );
}
