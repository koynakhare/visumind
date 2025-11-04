'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import ProjectForm from '@/component/projects/projectForm';
import { ProjectType } from '@/component/types/project';
import { getSingleProjectAction, updateProjectAction } from '@/redux/action/projects.action';
import { AppDispatch, RootState } from '@/redux/store';
import { ROUTES } from '@/component/utils/contant';
import Loading from '@/component/customComponents/loading';
import { generateUniqueId } from '@/component/utils/helper';

export default function EditProject() {
  const params = useParams();
  const projectId = params?.id as string; // assumes route is /projects/edit/[projectId]
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const projectState = useSelector((state: RootState) => state.project);
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    if (projectId) {
      dispatch(getSingleProjectAction(projectId || ''));
    }
  }, [projectId]);

  useEffect(() => {
    const project = projectState?.singleProject;

    if (!isEmpty(project)) {
      setProject({
        _id: project?._id || '',
        name: project?.name || '',
        description: project?.description || '',
        files: project?.files?.map((file: any) => ({
          id: generateUniqueId(),
          file,
        })) || [],
      });
    }
  }, [projectState?.singleProject]);

  const handleUpdateProject = async (data: ProjectType) => {
    let payload = {
      _id: projectId,
      name: data.name,
      description: data.description,
      newFiles: data.files?.map((file: any) => file.file)?.filter((file: any) => !file?._id),
      oldFiles: data.files?.map((file: any) => file.file)?.filter((file: any) => file?._id)?.map((file: any) => file?._id)
    }
    const response = await dispatch(updateProjectAction(payload));
    if (updateProjectAction.fulfilled.match(response)) {
      if (response.payload.success) {
        router.push(ROUTES.PROJECTS.LIST);
      }
    } else {
      console.error('Failed to update project:', response.payload);
    }
  };
  return (
    <>
      {projectState?.loading && <Loading />}
      <ProjectForm initialValues={project || undefined} onSubmit={handleUpdateProject} isEdit />
    </>
  );
}
