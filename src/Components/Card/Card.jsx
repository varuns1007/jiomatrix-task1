import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Card.css";

function addHours(date, hours) {
  date.setHours(date.getHours() + hours);

  return date;
}

const Card = ({ data, idb }) => {
  const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
    "loggedInUser",
  ]);

  const [todoComplete, setTodoComplete] = useState(data.completed);
  const changeTodoComplete = () => {
    setTodoComplete(!todoComplete);
    handleTodoComplete();
  };

  const handleTodoComplete = () => {
    const request = idb.open("test-db", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      // console.error(event);
    };
    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");

      const currentUser = cookies.loggedInUser;
      currentUser.todos.forEach((todo) => {
        if (todo.id === data.id) {
          console.log("here", todo);
          console.log("here", data);
          todo.completed = !todo.completed;
          return;
        }
      });

      const user = userData.put(currentUser);
      user.onsuccess = (query) => {
        console.log("Todo completed");
        const date = new Date();

        const newDate = addHours(date, 1);
        // console.log("before: ", cookies.loggedInUser);
        setCookie("loggedInUser", currentUser, {
          expires: newDate,
        });
        // console.log("after: ", cookies.loggedInUser);
      };
      user.onerror = (query) => {
        console.log("Todo completed update failed");
      };

      tx.oncomplete = function () {
        // console.log("User found");
        db.close();
      };
    };
  };

  return (
    <div>
      <div className="wrapper">
        <div className="product-info">
          <div className="product-text">
            <h1>{data.title}</h1>
            <h2>
              {new Date(data.dateTime).toDateString()} -{" "}
              {new Date(data.dateTime).toLocaleTimeString()}
            </h2>
            <label className="switch">
              <input
                type="checkbox"
                name="todoStatus"
                checked={todoComplete}
                onClick={changeTodoComplete}
                onChange={changeTodoComplete}
              />
              <span className="slider round"></span>
            </label>
            <p>{data.description}. </p>
          </div>
        </div>
      </div>
      {/* <div className="todoCard">
        <div>
          <p className="todoTitle">Title 1</p>
          <p className="description">
            bdajkbkasjasjkdaskkanakndasndasdksandasns,dnasdadnsmadnamdnasmdnsam,dnasdadnsmadnamdnasmdnsam
          </p>
        </div>
        <span className="todoTime">Tue Jan 09 2024 - 3:10:30 PM</span>
        <form>
          <label class="switch">
            <input type="checkbox" name="todoStatus" id="todoStatus" />
            <span class="slider round"></span>
          </label>
        </form>
      </div> */}
    </div>
  );
};

export default Card;
