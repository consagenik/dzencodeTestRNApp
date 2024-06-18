import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import styles from './AddCommentSection.styles';

import DBAddCommentRequest from '../../db/entities/DBAddCommentRequest';
import {addNewComment} from '../../state/slices/commentsSlice';

import {Button} from '../button';
import {AddCommentForm} from '../addCommentForm';
import {useAppDispatch} from '../../state/hooks';

export default function AddCommentSection() {
  const dispatch = useAppDispatch();
  const [addCommentFormVisible, setAddCommentFormVisible] = useState(false);

  const showAddCommentForm = () => {
    setAddCommentFormVisible(true);
  };

  const handleAddComment = async (value: DBAddCommentRequest) => {
    try {
      await dispatch(addNewComment(value));
      setAddCommentFormVisible(false);
    } catch (error) {
      console.error('Error', error);
      // @ts-ignore
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.addCommentSection}>
      <View style={styles.addCommentWrapper}>
        <View style={styles.addCommentButtonWrapper}>
          <Button
            text="Add comment"
            handlePress={showAddCommentForm}
            disabled={addCommentFormVisible}
          />
        </View>

        {addCommentFormVisible && (
          <View style={styles.addCommentFormWrapper}>
            <AddCommentForm
              handleAddComment={handleAddComment}
              showCommentForm={setAddCommentFormVisible}
            />
          </View>
        )}
      </View>
    </View>
  );
}
