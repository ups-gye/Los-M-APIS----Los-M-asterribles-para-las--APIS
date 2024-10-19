// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './states/users';
import authReducer from './states/auth';

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;