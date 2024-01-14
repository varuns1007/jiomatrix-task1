import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';
import { addTodo,search } from "../../Utils/DB_Init";

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

const notify = (msg) => toast(msg);

const LandingPage = ({ idb }) => {
  const [cookies, setCookie] = useCookies([
    "loggedInUser",
  ]);


  const [todos, setTodos] = useState([]);
  const changeTodos = (data) => {
    setTodos(data);
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchDate, setSearchDate] = useState("");
  
  var timeouts = [];
  const changeSearchKeyword = (e) => {
    const searchValue = e.target.value; 
    setSearchKeyword(searchValue);
    timeouts.push(setTimeout(function(){
      console.log("search begins");
      handleSearch(searchValue,searchDate);
      for (var i=0; i<timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
    }, 1000));
    
  };

  const changeSearchDate = (e) => {
    const searchValue = e.target.value; 
    setSearchDate(searchValue);
    timeouts.push(setTimeout(function(){
      console.log("searchDate begins");
      handleSearch(searchKeyword,searchValue);
      for (var i=0; i<timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
    }, 1000));
  };
  
  useEffect(() => {
    // fetch("https://dummyjson.com/todos")
    //   .then((res) => res.json())
    //   .then((res) => {
      //     changeTodos(res.todos);
      //   });
      // console.log(document.referrer);
      
      changeTodos(cookies.loggedInUser.todos);
      if(new Date() - new Date(cookies.loggedInUser.loginTime) <= 3000 ){
        notify("User Signed-In Successfully ✅");
      }else if(document.referrer === "http://localhost:3000/signup"){
        notify("User Registered Successfully ✅");
      }
    

  }, [cookies.loggedInUser.todos]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
    e.target.value === "" ? changeTitleError(true) : changeTitleError(false);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
    e.target.value === "" ? changeDescriptionError(true) : changeDescriptionError(false);

  };
  const changeDateTime = (e) => {
    setDateTime(e.target.value);
    e.target.value === "" ? changeDateTimeError(true) : changeDateTimeError(false);

  };

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateTimeError, setDateTimeError] = useState(false);

  const changeTitleError = (value) => setTitleError(value);
  const changeDescriptionError = (value) => setDescriptionError(value);
  const changeDateTimeError = (value) => setDateTimeError(value);

  const handleAddTodo = e=> addTodo(e,title,description,dateTime,cookies,setCookie,changeTodos,handleClose,notify);

  const handleSearch = (keyword,date) => search(keyword,date,cookies,changeTodos);

  const [sideBar,setSideBar] = useState(false);
  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <div>
      <Toaster />

        <div className="sideBar">
          <p className="title"> <span className="titleIcon"><LuListTodo /></span> Todo App</p>
          <span className="open-sideBar" onClick={handleSideBar}> {sideBar?<MdOutlineClose /> : <GiHamburgerMenu />}  </span>
      {sideBar && (
          <section className="header">

        <div className="searchBar">
          <Input
            type="search"
            icon="MdOutlineSearch"
            placeholder="Search"
            name="search"
            id="search"
            searchKeyword={searchKeyword}
            changeSearchKeyword={changeSearchKeyword}
            searchDate={searchDate}
            changeSearchDate={changeSearchDate}
          />
        </div>
          <div className="todoButtons">
            <button className="searchTodoButton addTodoButton">
              Search Todo
            </button>
            <button className="addTodoButton" onClick={handleOpen}>
              Add Todo
            </button>
              <a href="/logout">
                <button className="logoutButton addTodoButton">Logout</button>
              </a>
          </div>

      </section>
)}
        </div>

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
      <section className="header navbar">
        <p className="title"> <span className="titleIcon"><LuListTodo /></span> Todo App</p>
        <div className="searchBar">
          <Input
            type="search"
            icon="MdOutlineSearch"
            placeholder="Search"
            name="search"
            id="search"
            searchKeyword={searchKeyword}
            changeSearchKeyword={changeSearchKeyword}
            searchDate={searchDate}
            changeSearchDate={changeSearchDate}
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

        <div className="sectionTodos">
          <div className="sectionTitleContainer">
            <p className="sectionTitle underline">
              Incomplete Todos
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
        <section className="todoContainer">
          {todos.length > 0
            ? todos.map((todo, key) => !todo.completed ? <Card key={key} data={todo} idb={idb} todoStateHandler={changeTodos}/> : null)
            : <p className="emptyTodos">Sorry, no todos found!</p>}
        </section>
      </div>
        </div>

        <div className="sectionTodos">
          <div className="sectionTitleContainer">
            <p className="sectionTitle underline">
              Complete Todos
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
        <section className="todoContainer">
          {todos.length > 0
            ? todos.map((todo, key) => todo.completed ? <Card key={key} data={todo} idb={idb} todoStateHandler={changeTodos}/> : null)
            : <p className="emptyTodos">Sorry, no todos found!</p>}
        </section>
      </div>
        </div>

      
    </div>
  );
};

export default LandingPage;
