import React,{useEffect} from "react";
import { useCookies } from "react-cookie";

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedInUser"]);
  
  useEffect(()=>{
    removeCookie("loggedInUser");
    window.location.href = "/login";
  },[])


  return (
    <div>
      <p>Logging out...</p>
      {/* <Navigate to="/login" /> */}
    </div>
  );
};

export default Logout;
