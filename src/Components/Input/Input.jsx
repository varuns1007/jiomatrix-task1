import React from "react";
// import { MdAlternateEmail } from "react-icons/md";

import "./Input.css";

// const getIconFromName = (iconName) => {
//   switch (iconName) {
//     case "MdAlternateEmail":
//       return <MdAlternateEmail />;
//     default:
//     // all other supported icons
//   }
// }

const Input = ({
  type,
  name,
  id,
  value,
  placeholder,
  error,
  errorMessage,
  changeData,
  disabled,
}) => {
  return (
    <div className="position:relative">
      {type === "submit" ? (
        <div>
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
        <input
          className="input-body"
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onInput={(e) => changeData(e)}
        />
      )}
      {error ? (
        <span>
          <p className="errorMessage">{errorMessage}</p>
        </span>
      ) : (
        <div></div>
      )}

      {/* <span className="icon">{getIconFromName(icon)}</span> */}
    </div>
  );
};

export default Input;
