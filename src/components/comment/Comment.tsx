import React, {useState} from 'react';
import {View} from 'react-native';

import styles from './Comment.styles';

import DBComment from '../../db/entities/DBComment';
import DBAddCommentRequest from '../../db/entities/DBAddCommentRequest';

import {CommentHeader} from '../commentHeader';
import {CommentText} from '../commentText';
import {CommentsSection} from '../commentsSection';

interface CommentProps {
  id: number;
  text: string;
  avatar: {file_name: string; file_data: string};
  userName: string;
  email: string;
  homePage: string | undefined;
  createdAt: string;
  comments: DBComment[];
  level: number;
}

export default function Comment({
  id,
  text,
  avatar,
  userName,
  email,
  homePage,
  createdAt,
  comments,
  level,
}: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentFormVisible, setCommentFormVisible] = useState(false);

  const commentStyles = {
    ...styles.comment,
    ...(level > 0 && styles.nestedComment),
  };

  function handleAddComment(value: DBAddCommentRequest) {
    setCommentFormVisible(false);
  }

  return (
    <View style={commentStyles}>
      <View>
        <CommentHeader
          avatar={avatar}
          userName={userName}
          createdAt={createdAt}
        />
        <CommentText text={text} />
      </View>

      <CommentsSection
        comments={comments}
        level={level}
        isExpanded={isExpanded}
        showCommentForm={setCommentFormVisible}
        expandComments={setIsExpanded}
        formIsVisible={commentFormVisible}
        handleAddComment={handleAddComment}
      />
    </View>
  );
}
