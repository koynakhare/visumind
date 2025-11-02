// src/redux/projectsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ProjectType } from '@/component/types/project';
import { createAddCaseHandler } from '../helper';
import { addProjectsAction, getProjectsAction, getSingleProjectAction } from '../action/projects.action';

interface ProjectsState {
  projects: ProjectType[];
  singleProject: ProjectType | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  singleProject: null,
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    createAddCaseHandler(builder, getProjectsAction, 'projects', []);
    createAddCaseHandler(builder, addProjectsAction);
    createAddCaseHandler(builder, getSingleProjectAction, 'singleProject', null);

  },
});

export default projectsSlice.reducer;
