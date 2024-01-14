import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { MdDelete,MdEdit  } from "react-icons/md";
import { IconContext } from "react-icons";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoIosCloseCircle } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { markTodoComplete,editTodo, deleteTodo } from "../../Utils/DB_Init";

import Input from "../../Components/Input/Input";
import "./Card.css";

const notify = (msg) => toast(msg);

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

const Card = ({ data, idb,todoStateHandler }) => {
  const [cookies, setCookie] = useCookies([
    "loggedInUser",
  ]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [dateTime, setDateTime] = useState(data.dateTime);

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

  const [todoComplete, setTodoComplete] = useState(data.completed);
  const changeTodoComplete = () => {
    setTodoComplete(!todoComplete);
    // handleTodoComplete();
  };


  const handleTodoComplete = () => markTodoComplete(notify,cookies,data,setCookie);

  const handleEditTodo = () => editTodo(notify,cookies,data,title,todoComplete,description,dateTime,setCookie);

  const handleDeleteTodo = e => deleteTodo(e,notify,cookies,data,setCookie,todoStateHandler);


  return (
    <div>
      <Toaster />

      {/* Edit todo Modal  */}
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
                <p id="modal-title">Edit Todo</p>
                <span id="cross-button" onClick={handleClose}>
                  {" "}
                  <IoIosCloseCircle />{" "}
                </span>
              </section>
              <section className="modalBody">
                <form onSubmit={handleEditTodo}>
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
                    existingValue={data.dateTime}

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
                onClick={handleTodoComplete}
                onChange={changeTodoComplete}
              />
              <span className="slider round"></span>
            </label>
            <div className="editTodo" onClick={handleOpen}>
            <IconContext.Provider value={{ className: "editTodoIcon" }}>
              <MdEdit />
            </IconContext.Provider>
            </div>
            <div className="deleteTodo" onClick={handleDeleteTodo}>
            <IconContext.Provider value={{ className: "deleteTodoIcon" }}>
              <MdDelete />
            </IconContext.Provider>
            </div>

            <p>{data.description}. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
