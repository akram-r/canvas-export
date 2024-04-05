import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import DefaultRoute from "./DefaultRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultRoute />,
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
