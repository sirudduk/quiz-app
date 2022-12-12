import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import QuizPage from '@/pages/Quiz';
import StartPage from '@/pages/Start';

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <StartPage />,
    },
    {
      path: '/quiz',
      element: <QuizPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
