import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/globals.scss";
import Redirect from "./components/Redirect.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import Testpage from "./components/testPage/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  
  {
    path: "/test",
    element: <Testpage />,
  },

  {
    path: "*",
    element: <Redirect />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
