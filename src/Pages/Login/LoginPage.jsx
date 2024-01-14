import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import {login} from '../../Utils/DB_Init'

import "./LoginPage.css";
import Input from "../../Components/Input/Input";


const notify = (msg) => toast(msg);

const LoginPage = ({ idb, userData }) => {
  const [cookies, setCookie] = useCookies(["loggedInUser"]);

  const [email, setEmail] = useState("");
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

 

  const checkLogout = ()=>{
if(document.referrer === "http://localhost:3000/logout"){
      notify("Logout Successful ✅");
    }
  };

  useEffect(() => {
    checkLogout();
  }, []);

  const handleLogin = e => login(e,email,password,setCookie,notify);

  return (
    <div>
      <Toaster />
      <section className="box">
        <header>Login</header>
        <div className="form-body">
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              // error={emailError}
              // errorMessage="Kindly enter appropriate email!"
              data={email}
              changeData={changeEmail}
              icon="MdAlternateEmail"
            />
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              // error={passwordError}
              // errorMessage="Kindly follow the password policy!"
              data={password}
              changeData={changePassword}
              icon="MdLock"
            />

            <Input type="submit" />
            <p style={{ marginLeft: "1.5em" }}>
              Don't have a account?{" "}
              <a
                href="/signup"
                style={{
                  outline: "none",
                  textDecoration: "none",
                  color: "#107895",
                  fontWeight: "600",
                }}
              >
                Signup
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
