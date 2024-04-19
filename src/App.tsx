//@ts-nocheck

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DefaultRoute from "./DefaultRoute";
import ZipRoute from "./ZipRoute";
import ManualRoute from "./ManualRoute";
import TextRoute from "./TextRoute";
import ProjectRoute from "./ProjectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultRoute />,
  },
  {
    path: "/zip",
    element: <ZipRoute />,
  },
  {
    path: "/manual",
    element: <ManualRoute />,
  },
  {
    path: "/text",
    element: <TextRoute />,
  },
  {
    path: "/project",
    element: <ProjectRoute />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
