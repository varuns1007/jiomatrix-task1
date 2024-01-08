import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const checkIndexedDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("test-db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      const objectStore = db.createObjectStore("userData", {
        keyPath: "email",
      });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");
  };
};

function App() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    checkIndexedDb();
    getAllData();
  }, []);

  const getAllData = () => {
    const dbPromise = idb.open("test-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("userData", "readonly");
      var userData = tx.objectStore("userData");
      const users = userData.getAll();

      users.onsuccess = (query) => {
        setAllUsers(query.srcElement.result);
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <LoginPage userData={allUsers} idb={idb} />,
    },
    {
      path: "/signup",
      element: <SignupPage userData={allUsers} idb={idb} />,
    },
  ]);

  return (
    <div>
      <CookiesProvider defaultSetOptions={{ path: '/' }}> 
      <RouterProvider router={router} />
      </CookiesProvider >
    </div>
  );
}

export default App;
