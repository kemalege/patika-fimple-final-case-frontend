import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewApplication from './screens/NewApplication';
import PendingApplicationList from './screens/PendingApplicationList';
import ModifyApplication from './screens/ModifyApplication';
import CheckApplicationStatus from './screens/CheckApplicationStatus';
import ApplicationSuccesfull from './screens/ApplicationSuccesfull';
import ViewApplication from './screens/ViewApplication';
import HomeLayout from './layouts/HomeLayout';
import RequireAuth from './layouts/RequireAuth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
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
        element: <ApplicationSuccesfull/>,
      },
      {
        path: "/basvuru/:basvuruNo",
        element: <ViewApplication />,
      },
    ],
  },
  {
    path: "/admin",
    element: <RequireAuth/>,
    children: [
      {
        path: "/admin/basvuru-listesi",
        element: <PendingApplicationList />,
      },
      {
        path: "/admin/basvuru/:basvuruNo",
        element: <ModifyApplication />,
      },
    ]
  },
  
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)