
import React, { Component } from "react";
import "./App.css";
import SignUp from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Form from "./Components/Form";
import swal from "sweetalert";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Navbar from "./Components/Navbar";
import { getDatabase, ref, push, onValue, remove, set } from 'firebase/database';
import { auth } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: !!localStorage.getItem('uid'),
      isSignUp: true,
      tasksObj: [],
      userName: null,
      title: '',
      description: '',
      priority: '',
      date: ''
    };
  }

  componentDidMount() {
    const { login } = this.state;
    if (login) {
      const uid = localStorage.getItem('uid');
      this.fetchUserData(uid);
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchUserData(user.uid);
        this.setState({ login: true, userName: user.displayName });
      } else {
        this.setState({ login: false, userName: null, tasksObj: [] });
      }
    });
  }

  fetchUserData(uid) {
    const db = getDatabase();
    const userRef = ref(db, `Tasks/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const TasksArray = Object.keys(data).map(key => ({ key: key, ...data[key] }));
        this.setState({ tasksObj: TasksArray });
      } else {
        this.setState({ tasksObj: [] });
      }
    });
  }

  loginHandler = async (e) => {
    e.preventDefault();
    try {
      const emailVal = this.emailVal.value;
      const passVal = this.passVal.value;
      signInWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;
          this.setState({ login: true, userName: user.displayName });
          localStorage.setItem('uid', user.uid);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("Error : " + errorMessage);
        });
    } catch (error) {
      swal({
        text: "Wrong Credentials",
        icon: "error",
        buttons: false,
        timer: 2500
      });
    }
  };

  signupHandler = async (e) => {
    e.preventDefault();
    try {
      const emailVal = this.emailVal.value;
      const passVal = this.passVal.value;
      const nameVal = this.nameVal.value;
      createUserWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameVal
          });
          this.setState({ login: false, isSignUp: false });
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("Error : " + errorMessage);
        });
    } catch (error) {
      swal({
        text: "Enter your email address",
        icon: "error",
        buttons: false,
        timer: 2500
      });
    }
  };

  toggleForm = () => {
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp
    }));
  };

  logoutHandler = () => {
    auth.signOut();
    this.setState({ login: false });
  };

  taskCreator = () => {
    const { tasksObj } = this.state; // Assuming you have a tasksObj state containing task data
    return tasksObj.map((task, index) => {
      return (
        <ul className="collection with-header hoverable z-depth-2" key={index}>
          <li className="collection-header teal white-text">
            <h4 className="center">
              {task.title}
            </h4>
            <a
              onClick={() => this.deleteFunc(task.key)} // Assuming task object has a key property
              className="btn-floating waves-effect waves-light red right"
            >
              <i className="material-icons">delete</i>
            </a>
          </li>
          <li className="collection-item">
            <span>
              <b>Description:</b> {task.description}
            </span>
          </li>
          <li className="collection-item">
            <span>
              <b>Priority:</b> {task.priority}
            </span>
          </li>
          <li className="collection-item">
            <span>
              <b>Date:</b> {task.date}
            </span>
          </li>
        </ul>
      );
    });
  };
  
  clearFormFields() {
    this.setState({
      title: '',
      description: '',
      priority: '',
      date: ''
    }, () => {
      console.log('State updated:', this.state);
    });
  }
  
  
  addFunc() {
    const title = this.title.value;
    const description = this.description.value;
    const priority = this.priority.value;
    const date = this.date.value;

    if (title && description && priority && date ) {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const db = getDatabase();
        const userRef = ref(db, `Tasks/${uid}`);
        const newTaskObj = {
          title: title,
          description: description,
          priority: priority,
          date: date
        };
        const newTaskRef = push(userRef);
        set(newTaskRef, newTaskObj)
          .then(() => {
            console.log('Data pushed to Firebase Realtime Database successfully!');
            this.clearFormFields();
          })
          .catch((error) => {
            console.error('Error pushing data to Firebase Realtime Database:', error);
          });
      }
    }
  }
  

  deleteFunc(TaskKey) {
    const confirmDelete = window.confirm("Are you sure you want to delete this Task?");
    if (confirmDelete) {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const db = getDatabase();
        const userRef = ref(db, `Tasks/${uid}/${TaskKey}`);
        remove(userRef)
          .then(() => {
            console.log('Tasks removed from database successfully!');
          })
          .catch((error) => {
            console.error('Error removing Tasks from database:', error);
          });
      } else {
        console.error('User not logged in');
      }
    }
  }

  placeHolder() {
    return (
      <div>
        <h4 className="center placeholder">Please add tasks :(</h4>
      </div>
    );
  }

  render() {
    const { login, isSignUp, tasksObj, userName } = this.state;
    return (
      <div>
        {!login && isSignUp && (
          <SignUp
            signupHandler={e => this.signupHandler(e)}
            signupCard={el => (this.signupCard = el)}
            nameVal={el => (this.nameVal = el)}
            emailVal={el => (this.emailVal = el)}
            passVal={el => (this.passVal = el)}
            switchToLogin={this.toggleForm}
          />
        )}

        {!login && !isSignUp && (
          <Login
            loginHandler={e => this.loginHandler(e)}
            loginCard={el => (this.loginCard = el)}
            emailVal={el => (this.emailVal = el)}
            passVal={el => (this.passVal = el)}
            switchToSignUp={this.toggleForm}
          />
        )}

        {login && <Navbar userName={userName} logoutHandler={this.logoutHandler} />}

        {login && <Dashboard taskCreator={this.taskCreator()} />}

        {login && tasksObj.length === 0 ? this.placeHolder() : ""}
        <Form
          addFunc={() => this.addFunc()}
          cancelFunc={() => this.clearFormFields()}
          title={el => (this.title = el)}
          description={el => (this.description = el)}
          priority={el => (this.priority = el)}
          date={el => (this.date = el)}
        />

      </div>
    );
  }
}

export default App;



