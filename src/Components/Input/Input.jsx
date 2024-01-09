import React from "react";
import { MdAlternateEmail, MdLock, MdOutlineSearch } from "react-icons/md";

import "./Input.css";

const getIconFromName = (iconName) => {
  switch (iconName) {
    case "MdAlternateEmail":
      return <MdAlternateEmail />;
    case "MdLock":
      return <MdLock />;
    case "MdOutlineSearch":
      return <MdOutlineSearch />;
    default:
    // all other supported icons
  }
};

const Input = ({
  type,
  name,
  id,
  value,
  icon,
  placeholder,
  error,
  errorMessage,
  changeData,
  disabled,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <span className="icon">{getIconFromName(icon)}</span>

      {type === "submit" ? (
        <div className="position:relative">
          {" "}
          {disabled ? (
            <input
              className="input-body submitButton"
              type={type}
              placeholder={placeholder}
              disabled
            />
          ) : (
            <input
              className="input-body submitButton"
              type={type}
              placeholder={placeholder}
            />
          )}
        </div>
      ) : (
        <div className="position:relative">
          <input
            className="input-body"
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={(e) => changeData(e)}
          />
        </div>
      )}
      {error ? (
        <span>
          <p className="errorMessage">{errorMessage}</p>
        </span>
      ) : null}
    </div>
  );
};

export default Input;
