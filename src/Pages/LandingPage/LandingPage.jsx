import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoIosCloseCircle } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

import Input from "../../Components/Input/Input";
import Card from "../../Components/Card/Card";

import "./LandingPage.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  boxShadow: 24,
  backgroundColor: "#2a2b38",
  backgroundImage:
    "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')",
  backgroundPosition: "bottom center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "300%",
  borderRadius: "6px",
};

function addHours(date, hours) {
  date.setHours(date.getHours() + hours);

  return date;
}

const LandingPage = ({ idb }) => {
  const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
    "loggedInUser",
  ]);

  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

  const [todos, setTodos] = useState([]);
  const changeTodos = (data) => {
    setTodos(data);
  };

  useEffect(() => {
    // fetch("https://dummyjson.com/todos")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     changeTodos(res.todos);
    //   });
    changeTodos(cookies.loggedInUser.todos);
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const changeDateTime = (e) => {
    setDateTime(e.target.value);
  };

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);

  const changeTitleError = (value) => setTitleError(value);
  const changeDescriptionError = (value) => setDescriptionError(value);
  const changeDateTimeError = (value) => setDateTimeError(value);

  const handleAddTodo = (e) => {
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

      //add todo
      const v4Id = uuidv4();
      const todo = {
        id: v4Id,
        title,
        description,
        dateTime,
        completed: false,
      };
      const updatedUser = cookies.loggedInUser;
      updatedUser.todos.push(todo);

      // console.log("updatedUser", updatedUser);
      // console.log(cookies.loggedInUser.email);

      // const user = userData.put(cookies.loggedInUser.email);
      const user = userData.put(updatedUser);
      user.onsuccess = (query) => {
        console.log("Todo added");
        const date = new Date();

        const newDate = addHours(date, 1);
        // console.log("before: ", cookies.loggedInUser);
        setCookie("loggedInUser", updatedUser, {
          expires: newDate,
        });
        // console.log("after: ", cookies.loggedInUser);
      };
      user.onerror = (query) => {
        console.log("Todo adding failed");
      };

      tx.oncomplete = function () {
        // console.log("User found");
        handleClose();
        db.close();
      };
    };

    e.preventDefault();
  };

  return (
    <div>
      {/* Add todo Modal  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="modal">
              <section className="modalHeader">
                <p id="modal-title">Add Todo</p>
                <span id="cross-button" onClick={handleClose}>
                  {" "}
                  <IoIosCloseCircle />{" "}
                </span>
              </section>
              <section className="modalBody">
                <form onSubmit={handleAddTodo}>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    error={titleError}
                    errorMessage="Kindly enter title!"
                    data={title}
                    changeData={changeTitle}
                    icon="MdFormatQuote"
                  />
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Description"
                    error={descriptionError}
                    errorMessage="Kindly enter description!"
                    data={description}
                    changeData={changeDescription}
                    icon="MdTextFormat"
                  />
                  <Input
                    type="datetime-local"
                    name="dateTime"
                    id="dateTime"
                    placeholder="Date and Time"
                    error={dateTimeError}
                    errorMessage="Kindly enter the Date and time!"
                    data={dateTime}
                    changeData={changeDateTime}
                    icon="MdLockClock"
                  />
                  <Input type="submit" />
                </form>
              </section>
            </div>
          </Box>
        </Fade>
      </Modal>
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
            <button className="addTodoButton" onClick={handleOpen}>
              Add Todo
            </button>
          </div>

          <div className="todoButtons">
            <a href="/logout">
              <button className="logoutButton addTodoButton">Logout</button>
            </a>
          </div>
        </div>
      </section>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <section className="todoContainer">
          {todos.length > 0
            ? todos.map((todo, key) => <Card key={key} data={todo} idb={idb} />)
            : null}
          {/* {cookies.loggedInUser.todos.map((item) => (
          <Card />
        ))} */}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
