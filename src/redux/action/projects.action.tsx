import { ProjectType } from '@/component/types/project';
import { deleteRequest, getRequest, postRequest, putRequest } from '@/lib/apiClient';
import { createGenericAsyncThunk } from '@/redux/helper';

type AddProjectResponse = {
  data: {
    success: boolean;
    data: ProjectType;
    message?: string;
  }
}


import type { AxiosResponse } from 'axios';

const getProjects = async (): Promise<AxiosResponse<ProjectType[]>> => {
  const res = await getRequest('projects');
  return res; // full AxiosResponse<ProjectType[]>
};

const getSingleProject = async (id: string): Promise<AxiosResponse<ProjectType>> => {
  const res = await getRequest(`projects/${id}`);
  return res;
};

const addProject = async (data: ProjectType): Promise<AxiosResponse<AddProjectResponse>> => {
  const res = await postRequest('projects', data, { contentType: 'formdata' });
  return res;
};

const updateProject = async (data: ProjectType): Promise<AxiosResponse<AddProjectResponse>> => {
  const res = await putRequest(`projects/${data?._id}`, data, { contentType: 'formdata' });
  return res;
};

const deleteProject = async (id: string): Promise<AxiosResponse<AddProjectResponse>> => {
  const res = await deleteRequest(`projects/${id}`);
  return res;
};


export const getProjectsAction = createGenericAsyncThunk(
  'getProjectsAction',
  getProjects,
  'get',
);
export const getSingleProjectAction = createGenericAsyncThunk<
  string,
  { success: boolean; data?: ProjectType | null; message?: string }
>(
  'getSingleProjectAction',
  getSingleProject,
  'get'
);


export const addProjectsAction = createGenericAsyncThunk<ProjectType, { success: boolean; data?: ProjectType | null; message?: string }>(
  'addProjectsAction',
  addProject,
);

export const updateProjectAction = createGenericAsyncThunk(
  'updateProjectAction',
  updateProject,
);

export const deleteProjectAction = createGenericAsyncThunk(
  'deleteProjectAction',
  deleteProject,
);
