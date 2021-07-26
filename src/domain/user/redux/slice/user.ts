import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserEntity } from '@/domain/user/interface/entity/user';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { getSingleton } from '@/core/singleton';
import UserService from '../../services/userService';
import { CancelToken } from '../../../../service/httpService';

const namespace = 'books';

const userAdapter = createEntityAdapter<UserEntity>({
  selectId: (book) => book.id,
  /* 排序 */
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const fetchUser = createAsyncThunk(`${namespace}/fetchUser`, async (id: string, { signal }) => {
  const source = CancelToken.source();
  const userService = getSingleton(UserService);
  signal.addEventListener('abort', () => {
    source.cancel();
  });
  const userVO = await userService.getNewUserInfo(id, source.token);
  return userVO;
});

console.log(fetchUser);

const userSlice = createSlice({
  name: namespace,
  initialState: userAdapter.getInitialState({
    loading: false,
  }),
  reducers: {
    get: (state) => {
      state.entities;
    },
    booksReceived: (state, action: PayloadAction<UserEntity[]>) => {
      userAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (_builder) => {
    // builder.addCase(fetchUser, (a) => {});
  },
});

export { userSlice };
