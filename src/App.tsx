import {createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import NewApplication from './screens/NewApplication';
import PendingApplicationList from './screens/PendingApplicationList';
import ModifyApplication from './screens/ModifyApplication';
import CheckApplicationStatus from './screens/CheckApplicationStatus';
import ApplicationSuccesful from './screens/ApplicationSuccesful';
import ViewApplication from './screens/ViewApplication';
import HomeLayout from './layouts/HomeLayout';
import RequireAuth from './layouts/RequireAuth';
import { LoginAdmin } from './screens/LoginAdmin';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Navigate to="/basvuru-olustur" />,
      },
      {
        path: "/basvuru-olustur",
        element: <NewApplication/>,
      },
      {
        path: "/basvuru-sorgula",
        element: <CheckApplicationStatus/>,
      },
      {
        path: "/basvuru-basarili",
        element: <ApplicationSuccesful/>,
      },
      {
        path: "/basvuru/:basvuruNo",
        element: <ViewApplication />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LoginAdmin />,
  },
  {
    path: "/",
    element: <RequireAuth />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/admin/basvuru-listesi",
        element: <PendingApplicationList />,
      },
      {
        path: "/admin/basvuru/:basvuruNo",
        element: <ModifyApplication />,
      },
      
    ],
  },
]);

const App = () => {

  return (
    <>  
        <RouterProvider router={router} />
    </>
  )
}

export default App
