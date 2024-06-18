import React from 'react';
import {Text, View} from 'react-native';

import styles from './Header.styles';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Litter</Text>
    </View>
  );
}
