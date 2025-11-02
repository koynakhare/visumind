// src/redux/helpers/createAsyncThunkHelper.ts
import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { get } from 'lodash';
import {
  Draft,
  AsyncThunk,
} from '@reduxjs/toolkit';

export const createGenericAsyncThunk = <
  TArgs = void,
  TReturn = any
>(
  actionType: string,
  apiCall: (args: TArgs) => Promise<any>,
  apiType?: 'get' | 'post' | 'put' | 'patch' | 'delete',
  successHandler?: (dispatch: any, response: any) => void,
  errorHandler?: (dispatch: any, response: any) => void
) => {
  return createAsyncThunk<TReturn, TArgs>(
    actionType,
    async (args: TArgs, { dispatch }) => {
      try {
        const response = await apiCall(args);
        const { error, success, message, data } = get(response, 'data', {});

        if (success) {
          if (apiType !== 'get') {
          }
          if (successHandler) successHandler(dispatch, { success, message, data });
          return { success, data } as TReturn;
        } else {
          if (apiType !== 'get') {
          }
          if (errorHandler) errorHandler(dispatch, { error, message });
          return { success: false, message } as TReturn;
        }
      } catch (error: any) {
        if (apiType !== 'get') {
          // Dispatch generic error notification
        }
        if (errorHandler) errorHandler(dispatch, { error, message: error.message || 'Something went wrong' });
        return { success: false, message: error.message || 'Something went wrong' } as TReturn;
      }
    }
  );
};



interface WithStatus {
  loading: boolean;
  error: any;
}

// helper.ts
export const createAddCaseHandler = <
  TState extends WithStatus,
  TPayload,
  K extends keyof Draft<TState>
>(
  builder: ActionReducerMapBuilder<TState>,
  actionType: AsyncThunk<
    { data?: TPayload; success: boolean; message?: string },
    any,
    any
  >,
  key?: K,
  defaultValue?: TPayload
) => {
  builder
    .addCase(actionType.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      actionType.fulfilled,
      (state, action: PayloadAction<{ data?: TPayload; success: boolean; message?: string }>) => {
        if (key) {
          state[key] = (action.payload.data ?? defaultValue ?? null) as Draft<TState>[K];
        }
        state.loading = false;
      }
    )
    .addCase(actionType.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    });
};


