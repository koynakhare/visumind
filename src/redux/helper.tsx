// src/redux/helpers/createAsyncThunkHelper.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';

export const createGenericAsyncThunk = (
  actionType: string,
  apiCall: (args: any) => Promise<any>,
  apiType: 'get' | 'post' | 'put' | 'patch' | 'delete',
  showNotification = true,
  successHandler?: Function,
  errorHandler?: Function
) => {
  return createAsyncThunk(actionType, async (args, { dispatch }) => {
    try {
      const response = await apiCall(args);
      const { error, success, message, data } = get(response, 'data', {});

      if (success) {
        if (apiType !== 'get' && showNotification) {
          // Dispatch success notification here, e.g., dispatch(notification(true, message));
        }
        if (successHandler) successHandler(dispatch, { success, message, data });
        return { success, data };
      } else {
        if (apiType !== 'get' && showNotification) {
          // Dispatch error notification here, e.g., dispatch(notification(false, message || 'Error'));
        }
        if (errorHandler) errorHandler(dispatch, { error, message });
        return { success: false, message };
      }
    } catch (error: any) {
      if (apiType !== 'get' && showNotification) {
        // Dispatch generic error notification
      }
      if (errorHandler) errorHandler(dispatch, { error, message: error.message || 'Something went wrong' });
      return { success: false, message: error.message || 'Something went wrong' };
    }
  });
};

export const createAddCaseHandler = (builder, actionType, key, defaultValue) => {
  builder
    .addCase(actionType.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(actionType.fulfilled, (state, action) => {
      state[key] = action.payload?.data || defaultValue || [];
      state.loading = false;
    })
    .addCase(actionType.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
};