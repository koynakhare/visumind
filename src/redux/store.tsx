// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducer/project.reducer'; // adjust path as needed

export const store = configureStore({
  reducer: {
    project: projectReducer,
    // Add more reducers here as needed
  },
});

// 🔥 Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
