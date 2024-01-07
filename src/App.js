import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
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
