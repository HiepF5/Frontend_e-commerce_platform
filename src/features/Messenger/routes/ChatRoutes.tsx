import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LayoutPage from '@layouts/LayoutPage'
import ChatPage from '../pages/ChatPage'
const ChatRoutes = (): JSX.Element => {
  const routes = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: '/chat',
          element: <ChatPage />,
        }
      ]
    }
  ]

  const element = useRoutes(routes)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  )
}

export default ChatRoutes
