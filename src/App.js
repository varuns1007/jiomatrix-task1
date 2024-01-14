import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import {checkIndexedDb,getAllData,idb} from './Utils/DB_Init'
import Routes from "./Routes";



function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [cookies] = useCookies(["loggedInUser"]);
  const loggedInUser = cookies.loggedInUser;

  useEffect(() => {
    checkIndexedDb();
    const data = getAllData();
    setAllUsers(data);
  }, []);

  

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <LandingPage idb={idb} />,
  //   },
  //   {
  //     path: "/login",
  //     element: <LoginPage userData={allUsers} idb={idb} />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <SignupPage userData={allUsers} idb={idb} />,
  //   },
  // ]);

  const router = createBrowserRouter(Routes(loggedInUser, idb, allUsers));

  return (
    <div>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <RouterProvider router={router} />
      </CookiesProvider>
    </div>
  );
}

export default App;
