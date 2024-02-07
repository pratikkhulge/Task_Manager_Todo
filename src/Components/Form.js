import React, { useState } from "react";
import "../App.css";

const Form = (props) => {
  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    props.setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4 className="center">New Task</h4>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="title"
                    value={props.formData.title}
                    onChange={handleInputChange}
                    id="title"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="Task">Task Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="description"
                    value={props.formData.description}
                    onChange={handleInputChange}
                    id="description"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="description">Title Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="priority"
                    value={props.formData.priority}
                    onChange={handleInputChange}
                    id="priority"
                    type="number"
                    min="1"
                    max="5"
                    className="validate"
                  />
                  <label htmlFor="Priority">Priority (1-5)</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  Task Date:
                  <div className="input-field">
                    <input
                      name="date"
                      value={props.formData.date}
                      onChange={handleInputChange}
                      id="date"
                      type="date"
                      className="validate"
                    />
                    <label htmlFor="date" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={() =>
              props.addFunc({
                title: props.formData.title,
                description: props.formData.description,
                priority: parseInt(props.formData.priority),
                date: props.formData.date
              })
            }
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Add
          </button>
          
          <button
            onClick={props.cancelFunc}
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
