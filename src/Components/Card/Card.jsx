import React from "react";
import { Navigate } from "react-router-dom";
import "./Card.css";

const Card = ({ data }) => {
  return (
    <div>
      <div class="wrapper">
        <div class="product-info">
          <div class="product-text">
            <h1>Title 1</h1>
            <h2>Tue Jan 09 2024 - 3:10:30 PM</h2>
            <label class="switch">
              <input type="checkbox" name="todoStatus" id="todoStatus" />
              <span class="slider round"></span>
            </label>
            <p>
              Harvest Vases are a reinterpretation of peeled fruits and
              vegetables as functional objects. The surfaces appear to be sliced
              and pulled aside, allowing room for growth.{" "}
            </p>
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
