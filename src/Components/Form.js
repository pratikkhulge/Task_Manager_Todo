import React, { Component } from "react";
import "../App.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      priority: 1, // Default priority
      date: ""
    };   
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
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
                      ref={this.props.title}
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      id="title"
                      type="text"
                      className="validate"
                    />

                    <label htmlFor="Task">Task Title</label>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="input-field col s12">
                    <input
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                      id="last_name"
                      type="text"
                      className="validate"
                    />
                    <label htmlFor="last_name">Task Des</label>
                  </div>
                </div> */}
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      ref={this.props.description}
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
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
                      ref={this.props.priority}
                      name="priority"
                      value={this.state.priority}
                      onChange={this.handleInputChange}
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
                        ref={this.props.date}
                        name="date"
                        value={this.state.date}
                        onChange={this.handleInputChange}
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
              onClick={() => this.props.addFunc({
                title: `${this.state.Task}`,
                description: this.state.description,
                priority: parseInt(this.state.priority),
                date: this.state.date
              })}
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Add
            </button>
            <button
              onClick={this.props.cancelFunc}
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
