//@ts-nocheck

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DefaultRoute from "./DefaultRoute";
import ZipRoute from "./ZipRoute";
import ManualRoute from "./ManualRoute";

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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
