import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { QuizPage, StartPage, NotFoundPage } from '../pages';
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
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
