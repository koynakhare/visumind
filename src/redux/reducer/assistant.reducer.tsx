import { createSlice } from '@reduxjs/toolkit';
import { createAddCaseHandler } from '../helper';
import { getAnswerAction, getChatHistoryAction } from '../action/assistant.action';

interface QueryState {
  answers: string;
  chatHistory:[]
  loading: boolean;
  error: string | null;
}

const initialState: QueryState = {
  answers: '',
  chatHistory:[],
  loading: false,
  error: null,
};

const QuerySlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    createAddCaseHandler(builder, getAnswerAction, 'answers', {});
    createAddCaseHandler(builder, getChatHistoryAction, 'chatHistory', []);

  },
});
export default QuerySlice.reducer;
