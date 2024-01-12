import React,{useState,useEffect} from "react";
import {
  MdAlternateEmail,
  MdLock,
  MdOutlineSearch,
  MdFormatQuote,
  MdLockClock,
  MdTextFormat,
} from "react-icons/md";

import "./Input.css";

const getIconFromName = (iconName) => {
  switch (iconName) {
    case "MdAlternateEmail":
      return <MdAlternateEmail />;
    case "MdLock":
      return <MdLock />;
    case "MdOutlineSearch":
      return <MdOutlineSearch />;
    case "MdFormatQuote":
      return <MdFormatQuote />;
    case "MdLockClock":
      return <MdLockClock />;
    case "MdTextFormat":
      return <MdTextFormat />;
    default:
    // all other supported icons
  }
};

const Input = ({
  type,
  name,
  id,
  data,
  icon,
  placeholder,
  error,
  errorMessage,
  changeData,
  disabled,
  searchKeyword,
  changeSearchKeyword,
  searchDate,
  changeSearchDate
}) => {
  
  useEffect(()=>{
    const timeoutId = setTimeout(() => console.log(`I can see you're not typing. I can use "${searchKeyword}" now!`), 3000);
    return () => clearTimeout(timeoutId);
  },[searchKeyword])
  
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
      ) : type === "textarea" ? (
        <textarea
          className="input-body"
          name="description"
          value={data}
          cols="30"
          rows="10"
          placeholder="What's on your mind today?...."
          onChange={(e) => changeData(e)}
        ></textarea>
      ) : type === "search" ? (
        <div className="position:relative">
          <input
            className="input-body"
            type={type}
            name={name}
            value={searchKeyword}
            id={id}
            placeholder={placeholder}
            onChange={(e) => {changeSearchKeyword(e)}}
          />
          <input type="date" className="searchDate input-body" name={name} id={id} value={searchDate} placeholder={placeholder}
            onChange={(e) => {changeSearchDate(e)}} />
        </div>
      ) : (
        <div className="position:relative">
          <input
            className="input-body"
            type={type}
            name={name}
            value={data}
            id={id}
            placeholder={placeholder}
            onChange={(e) => {changeData(e)}}
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
