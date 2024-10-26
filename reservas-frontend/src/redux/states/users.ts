import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../modules/users/domain/User';

interface UsersState {
  users: User[];
  userSelected: User | null;
  visibleForm: boolean;
  errors: string | null;
  isLoading: boolean;
  hasLoaded: boolean;
}

const initialState: UsersState = {
  users: [],
  userSelected: null,
  visibleForm: false,
  errors: null,
  isLoading: true,
  hasLoaded: false
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.isLoading = false;
      state.hasLoaded = true;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    onSelectedUserForm: (state, action: PayloadAction<User>) => {
      state.userSelected = action.payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.userSelected = null;
    },
    loadingError: (state, action: PayloadAction<string>) => {
      state.errors = action.payload;
    },
  },
});

export const {
  loadingUsers,
  addUser,
  updateUser,
  removeUser,
  onSelectedUserForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} = usersSlice.actions;

export default usersSlice.reducer;