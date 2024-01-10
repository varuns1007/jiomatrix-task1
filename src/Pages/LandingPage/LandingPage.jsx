import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Input from "../../Components/Input/Input";
import Card from "../../Components/Card/Card";

import "./LandingPage.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  // border: "2px s olid #000",
  boxShadow: 24,
  p: 4,
};

const LandingPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedInUser"]);

  const [search, setSearch] = useState("");
  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

  const [todos, setTodos] = useState([]);
  const changeTodos = (data) => {
    setTodos(data);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((res) => {
        changeTodos(res.todos);
      });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
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
          {todos.map((todo, key) => (
            <Card key={key} data={todo} />
          ))}
          {/* {cookies.loggedInUser.todos.map((item) => (
          <Card />
        ))} */}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
