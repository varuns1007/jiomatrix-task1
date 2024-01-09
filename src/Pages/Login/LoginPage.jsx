import React, { useState } from "react";
import { useCookies } from "react-cookie";

import "./LoginPage.css";
import Input from "../../Components/Input/Input";

function addHours(date, hours) {
  date.setHours(date.getHours() + hours);

  return date;
}

const LoginPage = ({ idb, userData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedInUser"]);
  // const loggedInUser = cookies.loggedInUser;
  // if (loggedInUser) {
  //   window.location.replace("/landingPage");
  // }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const [email, setEmail] = useState("");
  const changeEmail = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value);
    if (!emailRegex.test(e.target.value) && e.target.value !== "") {
      changeEmailError(true);
    } else {
      changeEmailError(false);
    }
  };
  const [emailError, setEmailError] = useState(false);
  const changeEmailError = (value) => {
    setEmailError(value);
  };

  const [password, setPassword] = useState("");
  const changePassword = (e) => {
    setPassword(e.target.value);
    // console.log(e.target.value);
    if (!passwordRegex.test(e.target.value) && e.target.value !== "") {
      changePasswordError(true);
    } else {
      changePasswordError(false);
    }
  };
  const [passwordError, setPasswordError] = useState(false);
  const changePasswordError = (value) => {
    setPasswordError(value);
  };

  const [submitError, setSubmitError] = useState(false);
  const changeSubmitError = (value) => {
    setSubmitError(value);
  };

  const handleLogin = (e) => {
    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      var tx = db.transaction("userData", "readonly");
      var userData = tx.objectStore("userData");

      const user = userData.get(email);
      user.onsuccess = (query) => {
        const user1 = query.srcElement.result;
        console.log("User found", user1);
        if (user1.password === password) {
          console.log("password matched, log in user");
          //set cookie
          const date = new Date();

          const newDate = addHours(date, 2);
          setCookie("loggedInUser", user1, {
            expires: newDate,
          });
          // window.location.replace("/landingPage");
        } else {
          alert("password different, log in user");
        }
      };
      user.onerror = (query) => {
        console.log("User not found");
      };

      tx.oncomplete = function () {
        // console.log("User found");
        db.close();
      };
    };
    e.preventDefault();
  };

  return (
    <div>
      <section className="box">
        <header>Login</header>
        <div className="form-body">
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              error={emailError}
              errorMessage="Kindly enter appropriate email!"
              data={email}
              changeData={changeEmail}
              icon="MdAlternateEmail"
            />
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              error={passwordError}
              errorMessage="Kindly follow the password policy!"
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
