/* eslint-disable no-undef */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router";
import './index.css'
import App from './App.jsx'

import Layout from "./Layout";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Chat from "./pages/Chat";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, wlwmwnt: <Home /> },
      { path: "transactions", element: <Transactions /> },
      { path: "analytics", element: <Analytics /> },
      {path: "chat", element: <Chat/>},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
