import React, {useRef} from 'react';
import {View} from 'react-native';

import styles from './CommentsSection.styles';

import DBComment from '../../db/entities/DBComment';
import DBAddCommentRequest from '../../db/entities/DBAddCommentRequest';

import {Button} from '../button';
import {AddCommentForm} from '../addCommentForm';
import {Comment} from '../comment';

interface CommentsSectionProps {
  comments: DBComment[];
  level: number;
  formIsVisible: boolean;
  isExpanded: boolean;
  showCommentForm: (value: boolean) => void;
  expandComments: (value: boolean) => void;
  handleAddComment: (value: DBAddCommentRequest) => void;
}

export default function CommentsSection({
  comments,
  level,
  expandComments,
  isExpanded,
  showCommentForm,
  formIsVisible,
  handleAddComment,
}: CommentsSectionProps) {
  return (
    <View style={styles.commentsSection}>
      <View style={styles.actionButtons}>
        <View style={styles.buttonWrapper}>
          <Button
            text="Reply"
            handlePress={() => showCommentForm(true)}
            disabled={formIsVisible}
            type="outline"
          />
        </View>
        <View style={styles.buttonWrapper}>
          {comments.length > 0 && (
            <Button
              text={isExpanded ? 'Collapse' : 'Expand'}
              handlePress={() => expandComments(!isExpanded)}
            />
          )}
        </View>
      </View>

      {formIsVisible && (
        <View style={styles.addCommentFormWrapper}>
          <AddCommentForm
            handleAddComment={handleAddComment}
            showCommentForm={showCommentForm}
          />
        </View>
      )}

      {isExpanded && (
        <View>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              id={comment.id}
              text={comment.text}
              avatar={comment.avatar}
              userName={comment.userName}
              email={comment.email}
              homePage={comment.homePage}
              createdAt={comment.createdAt}
              comments={comment.comments}
              level={level + 1}
            />
          ))}
        </View>
      )}
    </View>
  );
}
