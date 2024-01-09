import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Input from "../../Components/Input/Input";
import Card from "../../Components/Card/Card";

import "./LandingPage.css";

const LandingPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedInUser"]);

  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

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
        {[{ a: 1 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }, { f: 1 }].map(
          (todo, key) => (
            <Card key={key} data={todo} />
          ),
        )}
        {/* {cookies.loggedInUser.todos.map((item) => (
          <Card />
        ))} */}
      </section>
    </div>
  );
};

export default LandingPage;
