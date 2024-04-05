import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DefaultRoute from "./DefaultRoute";
import ZipRoute from "./ZipRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultRoute />,
  },
  {
    path: "/zip",
    element: <ZipRoute />,
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
