import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import MessageBox from './components/MessageBox';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  },
  {
    path: "/chat",
    element: <MessageBox />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
