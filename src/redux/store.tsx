
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './reducer/project.reducer';
import assistantReducer from './reducer/assistant.reducer'; 

export const store = configureStore({
  reducer: {
    project: projectReducer,
    assistant: assistantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
