import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Card.css";

const Card = ({ data }) => {
  const [todoComplete, setTodoComplete] = useState(data.completed);
  const changeTodoComplete = () => {
    setTodoComplete(!todoComplete);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="product-info">
          <div className="product-text">
            <h1>Title 1</h1>
            <h2>Tue Jan 09 2024 - 3:10:30 PM</h2>
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
            <p>{data.todo}. </p>
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
