// src/redux/projectsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ProjectType } from '@/component/types/project';
import { getRequest } from '@/lib/apiClient';
import { createAddCaseHandler, createGenericAsyncThunk } from '../helper';

interface ProjectsState {
  projects: ProjectType[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const getProjects = async (endpoint: string): Promise<ProjectType[]> => {
  // return getRequest('/api/projects');

  return {
    data: {
      success: true,
      data: [{
        name: 'Project 1',
        description: 'Description of Project 1',
       noOfFiles:10
      },
      {
        name: 'Project 2',
        description: 'Description of Project 2',
       noOfFiles:10
      },
      {
        name: 'Project 3',
        description: 'Description of Project 3',
       noOfFiles:10
      }],
    }
  }
}

export const getProjectsAction = createGenericAsyncThunk(
  'getProjectsAction',
  getProjects,
  'get',
  false
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    createAddCaseHandler(builder, getProjectsAction, 'projects', []);
  },
});

export default projectsSlice.reducer;
