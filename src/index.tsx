import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import { CreateUserV, ErrorPageV } from './Views';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPageV/>,
  },
  {
    path: "create/:id?",
    element: <CreateUserV />,
  },
])
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div style={{ padding: '0px 20px'}}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

