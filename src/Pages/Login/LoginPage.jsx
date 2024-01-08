import React, { useState } from "react";

import "./LoginPage.css";
import Input from "../../Components/Input/Input";

const LoginPage = () => {
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

  return (
    <div>
      <section className="box">
        <header>Login</header>
        <div className="form-body">
          <form action="" method="post">
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
