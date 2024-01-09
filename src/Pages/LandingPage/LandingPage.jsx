import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Input from "../../Components/Input/Input";
import Card from "../../Components/Card/Card";

import "./LandingPage.css";

const LandingPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["logedInUser"]);
  // const [loggedInUser, setLoggedInUser] = useState({
  //   todos: [],
  // });
  // const loggedInUser = cookies.loggedInUser;
  // const [temp, setTemp] = useState([{ a: 1 }, { b: 1 }, { c: 1 }]);

  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };
  // console.log(loggedInUser);

  useEffect(() => {
    // const User = cookies.loggedInUser;
    // setLoggedInUser(User);
  }, []);

  return (
    <div>
      {/* <p>hello {loggedInUser.email}</p> */}
      <section className="header">
        <p className="title">Todo App</p>
        <div className="searchBar">
          <Input
            type="search"
            icon="MdOutlineSearch"
            placeholder="Search"
            name="search"
            id="search"
            data={search}
            changeData={changeSearch}
          />
          <div className="todoButtons">
            <button className="searchTodoButton addTodoButton">
              Search Todo
            </button>
            <button className="addTodoButton">Add Todo</button>
          </div>

          <div className="todoButtons">
            <a href="/logout">
              <button className="logoutButton addTodoButton">Logout</button>
            </a>
          </div>
        </div>
      </section>
      <section className="todoContainer">
        {/* {cookies.loggedInUser.todos.map((item) => (
          <Card />
        ))} */}
        {/* {loggedInUser.todos.forEach((todo) => {
          return <Card />;
        })} */}
      </section>
    </div>
  );
};

export default LandingPage;
