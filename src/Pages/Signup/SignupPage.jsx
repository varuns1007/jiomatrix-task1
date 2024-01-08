import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

import "./SignupPage.css";
import Input from "../../Components/Input/Input";

const SignupPage = () => {
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

  const submitForm = () => {
    // console.log(disable);
  };

  return (
    <div>
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
