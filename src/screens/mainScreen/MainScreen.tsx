import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import TreeView from 'react-native-final-tree-view';

import styles from './MainScreen.styles';

import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {
  fetchComments,
  getCommentsQuantity,
  setPage,
} from '../../state/slices/commentsSlice';
import {createTable, getDBConnection} from '../../db/db-service';

import {
  AddCommentSection,
  Comment,
  CommentsFilter,
  Header,
  InformationMessage,
  Pagination,
} from '../../components';

export default function MainScreen() {
  const dispatch = useAppDispatch();
  const {page, comments, commentsQuantity} = useAppSelector(
    state => state.comments,
  );

  const [loading, setLoading] = useState(true);

  const loadDataCallback = useCallback(
    async (pageNumber: number) => {
      try {
        const db = await getDBConnection();
        await createTable(db);
        dispatch(getCommentsQuantity());
        dispatch(fetchComments({page: pageNumber}));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    loadDataCallback(page);
  }, [dispatch, loadDataCallback, page]);

  function handleOpenPage(value: number) {
    setLoading(true);
    dispatch(setPage(value));
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar />
      <Header />
      <ScrollView style={styles.scrollView}>
        <AddCommentSection />
        <View style={styles.filtersWrapper}>
          <CommentsFilter />
        </View>
        {loading && <InformationMessage text="Loading..." />}

        {!loading && comments.length > 0 ? (
          <TreeView
            data={comments}
            initialExpanded
            activeOpacityNode={1}
            renderNode={({node}) => (
              <Comment
                id={node.id}
                text={node.text}
                avatar={node.avatar}
                userName={node.userName}
                email={node.email}
                homePage={node.homePage}
                createdAt={node.createdAt}
                comments={node.comments}
                level={0}
              />
            )}
          />
        ) : (
          <InformationMessage text="No comments" />
        )}
      </ScrollView>

      <Pagination
        quantity={Math.ceil(commentsQuantity / 25)}
        currentPage={page}
        handleOpenPage={value => handleOpenPage(value)}
      />

      <InformationMessage text="Made with 💜 by @consagenik" />
    </SafeAreaView>
  );
}
