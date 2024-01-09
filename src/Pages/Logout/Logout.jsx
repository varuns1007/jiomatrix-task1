import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedInUser"]);
  removeCookie("loggedInUser");
  window.location.href = "/login";

  return (
    <div>
      <p>Logging out...</p>
      {/* <Navigate to="/login" /> */}
    </div>
  );
};

export default Logout;
