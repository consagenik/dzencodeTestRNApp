import React from 'react';
import {Image, Text, View} from 'react-native';

import styles from './CommentHeader.styles';

interface CommentHeaderProps {
  avatar: {file_name: string; file_data: string};
  userName: string;
  createdAt: string;
}

export default function CommentHeader({
  avatar,
  userName,
  createdAt,
}: CommentHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={{uri: avatar.file_data}} />
      </View>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.date}>{createdAt}</Text>
    </View>
  );
}
