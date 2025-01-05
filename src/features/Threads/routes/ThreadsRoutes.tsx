import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import { ThreadsPage } from '../pages/ThreadsPage'
import ThreadForMePage from '../components/threads-for-me'
import UserProfilePage from '../pages/UserProfilePage'

const ThreadsRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: '/home',
          element: <ThreadsPage />
        },
        {
          path: '/me',
          element: <ThreadForMePage />
        },
        {
          path: '/:id',
          element: <UserProfilePage />
        }
      ]
    }
  ]

  const element = useRoutes(routes)
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default ThreadsRoutes
