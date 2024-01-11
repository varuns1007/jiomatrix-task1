import { Navigate } from "react-router-dom";

import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LogoutPage from "./Pages/Logout/Logout";

const routes = (isLoggedIn, idb, allUsers) => [
  {
    path: "/",
    element: isLoggedIn ? (
      <Navigate to="/landingPage" />
    ) : (
      <Navigate to="/login" />
    ),
  },

  // { path: "/login", element: <LoginPage userData={allUsers} idb={idb} /> },
  {
    path: "/login",
    element: isLoggedIn ? (
      <Navigate to="/landingPage" />
    ) : (
      <LoginPage userData={allUsers} idb={idb} />
    ),
  },
  {
    path: "/signup",
    element: isLoggedIn ? (
      <Navigate to="/landingPage" />
    ) : (
      <SignupPage userData={allUsers} idb={idb} />
    ),
  },
  {
    path: "/landingPage",
    element: isLoggedIn ? <LandingPage idb={idb} /> : <Navigate to="/login" />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
];

export default routes;
