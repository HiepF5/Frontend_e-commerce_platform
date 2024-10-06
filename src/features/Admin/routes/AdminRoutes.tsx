/* eslint-disable @typescript-eslint/promise-function-async */
import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import Task from '../ProjectManager/components/TaskProject/TaskProject';
import ProjectManagerRoutes from '../ProjectManager/routes/ProjectManagerRoutes';

const ProjectManagerPage = lazy(() => import('../ProjectManager/pages'));

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'project/create/*',
        element: (
          <ProjectManagerRoutes />
        )
      },
      {
        path: 'task',
        element: <Task />
      },
      {
        path: 'project',
        element: (
          <ProjectManagerPage />
        )
      }
    ]
  }
];

const AdminRoutes = (): JSX.Element => {
  const element = useRoutes(routes);
  return <div>{element}</div>;
};

export default AdminRoutes;
