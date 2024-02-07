import React from "react";
import "../App.css";

const Dashboard = (props) => {
  return (
    <div>
      <div className="container">
        <h1 className="center">Task Manager</h1>
        {props.taskCreator}
      </div>
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large teal modal-trigger" href="#modal1">
          <i className="large material-icons">add</i>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
