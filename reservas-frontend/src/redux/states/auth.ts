// src/redux/states/auth.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../modules/users/domain/User';

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoginLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoginLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, action: PayloadAction<{ user: User }>) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.isLoginLoading = false;
    },
    onLogout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.isLoginLoading = false;
    },
    onInitLoading: (state) => {
      state.isLoginLoading = true;
    },
  },
});

export const { onLogin, onLogout, onInitLoading } = authSlice.actions;

export default authSlice.reducer;