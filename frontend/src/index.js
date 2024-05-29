import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Attribute from './pages/Attribute';
import Product from './pages/Product';
import User from './pages/User';
import Follow from './pages/Follow';
import Profile from './pages/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/:userId",
    element: <App />,
  },
  {
    path: "attribute",
    element: <Attribute />,
  },
  {
    path: "user/:userId",
    element: <User />,
    children: [
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "follow",
        element: <Follow />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
])
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
