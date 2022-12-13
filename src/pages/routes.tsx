import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { QuizPage, StartPage, ResultPage, NotFoundPage } from './';
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
      path: '/result',
      element: <ResultPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
