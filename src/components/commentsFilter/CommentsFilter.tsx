import React, {useState} from 'react';
import {View} from 'react-native';

import styles from './CommentsFilter.styles';

import {FilterItem} from '../filterItem';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {
  fetchComments,
  setComments,
  setOrder,
  setPage,
  setSortedBy,
} from '../../state/slices/commentsSlice';

const filters: {
  name: string;
  text: string;
}[] = [
  {name: 'userName', text: 'Name'},
  {name: 'email', text: 'Email'},
  {name: 'createdAt', text: 'Date'},
];

export default function CommentsFilter() {
  const dispatch = useAppDispatch();
  const {sortedBy, order} = useAppSelector(state => state.comments);

  function handlePress(name: 'userName' | 'email' | 'createdAt') {
    if (sortedBy === name) {
      dispatch(setOrder(order === 'ASC' ? 'DESC' : 'ASC'));
      dispatch(setComments([]));
      dispatch(setPage(0));
      dispatch(fetchComments({page: 0}));
    } else {
      dispatch(setSortedBy(name));
      dispatch(setOrder('ASC'));
      dispatch(setComments([]));
      dispatch(setPage(0));
      dispatch(fetchComments({page: 0}));
    }
  }

  return (
    <View style={styles.filtersWrapper}>
      <View style={styles.filters}>
        {filters.map(({name, text}) => (
          <FilterItem
            key={name}
            text={text}
            isActive={sortedBy === name}
            value={order}
            handlePress={() =>
              handlePress(name as 'userName' | 'email' | 'createdAt')
            }
          />
        ))}
      </View>
    </View>
  );
}
