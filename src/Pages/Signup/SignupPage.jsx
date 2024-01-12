import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";

import "./SignupPage.css";
import Input from "../../Components/Input/Input";

function addHours(date, hours) {
  date.setHours(date.getHours() + hours);

  return date;
}

const notify = (msg) => toast(msg);

const SignupPage = ({ idb, userData }) => {
  const [cookies, setCookie] = useCookies(["loggedInUser"]);
  // console.log(cookies);
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
    changeDisable();
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
    changeDisable();
  };
  const [passwordError, setPasswordError] = useState(false);
  const changePasswordError = (value) => {
    setPasswordError(value);
  };

  const [tooltip, setTooltip] = useState(false);
  const changeTooltip = () => {
    setTooltip(!tooltip);
  };

  const [disable, setDisable] = useState(true);
  const changeDisable = () => {
    if (!emailError && !passwordError) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    // console.log(disable);
  };

  const submitForm = (e) => {
    // console.log("userData", userData);

    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");

      const user1 = userData.get(email);
      user1.onsuccess = (query) => {
        const user1 = query.srcElement.result;
        if (!user1) {
          const v4Id = uuidv4();
          console.log("v4id", v4Id);
          const item = {
            id: v4Id,
            email: email,
            password: password,
            todos: [],
          };
          const user = userData.put(item);
          user.onsuccess = () => {
            //set cookie
            const date = new Date();

            const newDate = addHours(date, 2);
            setCookie("loggedInUser", item, {
              expires: newDate,
            });
          };
          user.onerror = () => {
            console.log("User Adding failed");
          };
        } else {
          console.log("User found", user1);
          notify("User already exists❗");
        }
      };
      user1.onerror = (query) => {
        console.log("Error", query);
      };

      tx.oncomplete = function () {
        // console.log("User added successfully");
        db.close();
      };
    };

    e.preventDefault();
  };

  return (
    <div>
      <Toaster />

      <section className="box">
        <header>Signup</header>
        <span
          className="info-icon"
          onMouseEnter={changeTooltip}
          onMouseLeave={changeTooltip}
        >
          <FaCircleInfo />
        </span>
        {tooltip ? (
          <div className="tooltip">
            Password should be of length 8 and must contain atleast 1 lowercase,
            1 uppercase, 1 digit and 1 special character.
          </div>
        ) : null}

        <div className="form-body">
          <form onSubmit={submitForm}>
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
            <Input type="submit" disabled={disable} />
            <p style={{ marginLeft: "1.5em" }}>
              Already have a account?{" "}
              <a
                href="/login"
                style={{
                  outline: "none",
                  textDecoration: "none",
                  color: "#107895",
                  fontWeight: "600",
                }}
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
