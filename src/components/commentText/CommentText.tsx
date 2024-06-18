import React from 'react';
import {Text, View} from 'react-native';

import styles from './CommentText.styles';

interface CommentTextProps {
  text: string;
}

export default function CommentText({text}: CommentTextProps) {
  return (
    <View style={styles.commentTextWrapper}>
      <Text style={styles.commentText}>{text}</Text>
    </View>
  );
}
