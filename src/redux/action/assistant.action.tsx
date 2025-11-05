import { getRequest, postRequest } from '@/lib/apiClient';
import { createGenericAsyncThunk } from '@/redux/helper';
import type { AxiosResponse } from 'axios';

type QueryType = {
  projectId: string;
  question: string;
};

type QueryResponse = {
  data: {
    success: boolean;
    data: {
      answer: string;
      chatId: string;
      projectFiles: string[];
    };
    message?: string;
  };
};

const getAnswer = async (data: QueryType): Promise<AxiosResponse<QueryResponse>> => {
  const res = await postRequest('assistant', data);
  return res;
};
const getChatHistory = async (data: { projectId: string }): Promise<AxiosResponse<QueryResponse>> => {
  const res = await getRequest(`chat?projectId=${data?.projectId}` );
  return res;
};

export const getAnswerAction = createGenericAsyncThunk(
  'getAnswerAction',
  getAnswer,
);

export const getChatHistoryAction = createGenericAsyncThunk(
  'getChatHistoryAction',
  getChatHistory,
);
