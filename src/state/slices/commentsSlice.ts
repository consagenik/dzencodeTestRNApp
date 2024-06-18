import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import DBComment from '../../db/entities/DBComment';
import {
  addComment,
  createTable,
  getComments,
  getDBCommentsQuantity,
  getDBConnection,
} from '../../db/db-service';
import DBAddCommentRequest from '../../db/entities/DBAddCommentRequest';
import {RootState} from '../store';

export interface CommentsState {
  commentsQuantity: number;
  page: number;
  comments: DBComment[];
  unsavedComments: DBComment[];
  sortedBy: 'createdAt' | 'userName' | 'email';
  order: 'ASC' | 'DESC';
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: CommentsState = {
  commentsQuantity: 0,
  page: 0,
  comments: [],
  unsavedComments: [],
  loading: 'idle',
  sortedBy: 'createdAt',
  order: 'DESC',
};

export const getCommentsQuantity = createAsyncThunk<
  number,
  undefined,
  {state: RootState}
>('comments/getCommentsQuantity', async () => {
  const db = await getDBConnection();
  await createTable(db);
  return await getDBCommentsQuantity(db);
});

export const fetchComments = createAsyncThunk<
  DBComment[],
  {page: number},
  {state: RootState}
>('comments/fetchComments', async ({page}, {getState}) => {
  const state = getState();
  const db = await getDBConnection();
  const comments = await getComments(
    db,
    state.comments.sortedBy,
    state.comments.order,
    page,
  );

  return comments;
});

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async (arg: DBAddCommentRequest) => {
    const db = await getDBConnection();
    const response: DBComment = await addComment(db, arg);
    return response;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => ({
      ...state,
      page: action.payload,
    }),
    setComments: (state, action: PayloadAction<DBComment[]>) => ({
      ...state,
      comments: action.payload,
    }),
    addUnsavedComment: (state, action: PayloadAction<DBComment>) => {
      state.unsavedComments = [...state.unsavedComments, action.payload];
    },
    clearUnsavedComments: state => {
      state.unsavedComments = [];
    },
    setSortedBy: (
      state,
      action: PayloadAction<'createdAt' | 'userName' | 'email'>,
    ) => {
      state.sortedBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
      state.order = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchComments.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchComments.rejected, state => {
        state.loading = 'failed';
      });

    builder
      .addCase(addNewComment.fulfilled, (state, action) => {
        if (
          state.page === 0 &&
          state.order === 'DESC' &&
          state.comments.length === 25
        ) {
          state.comments.pop();
        }

        if (
          state.page === Math.floor(state.commentsQuantity / 25) &&
          state.order === 'ASC' &&
          state.comments.length === 25
        ) {
          state.comments.shift();
        }

        if (state.order === 'ASC') {
          state.comments.push(action.payload);
        } else {
          state.comments.unshift(action.payload);
        }

        state.loading = 'succeeded';
      })
      .addCase(addNewComment.pending, state => {
        state.loading = 'pending';
      })
      .addCase(addNewComment.rejected, state => {
        state.loading = 'failed';
      });

    builder
      .addCase(getCommentsQuantity.fulfilled, (state, action) => {
        state.commentsQuantity = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(getCommentsQuantity.pending, state => {
        state.loading = 'pending';
      })
      .addCase(getCommentsQuantity.rejected, state => {
        state.loading = 'failed';
      });
  },
});

const {actions, reducer} = commentsSlice;

export const {
  setPage,
  setComments,
  addUnsavedComment,
  clearUnsavedComments,
  setSortedBy,
  setOrder,
} = actions;

export default reducer;
