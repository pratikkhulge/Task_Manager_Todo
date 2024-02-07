import React, { useState, useEffect } from "react";
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

const App = () => {
  const [login, setLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [tasksObj, setTasksObj] = useState([]);
  const [userName, setUserName] = useState(null);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    priority: '',
    date: ''
  });

  useEffect(() => {
    auth.signOut();
    setLogin(false);
    setIsSignUp(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid);
        setLogin(true);
        setUserName(user.displayName);
      } else {
        setLogin(false);
        setUserName(null);
        setTasksObj([]);
      }
    });
  }, []);

  const fetchUserData = (uid) => {
    const db = getDatabase();
    const userRef = ref(db, `Tasks/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const TasksArray = Object.keys(data).map(key => ({ key: key, ...data[key] }));
        setTasksObj(TasksArray);
      } else {
        setTasksObj([]);
      }
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const emailVal = e.target.emailVal.value;
      const passVal = e.target.passVal.value;
      signInWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;
          setLogin(true);
          setUserName(user.displayName);
          swal("Success", `Welcome, ${user.displayName}! You have successfully logged in.`, "success");
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

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const emailVal = e.target.emailVal.value;
      const passVal = e.target.passVal.value;
      const nameVal = e.target.nameVal.value;
      createUserWithEmailAndPassword(auth, emailVal, passVal)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nameVal
          });
          swal("Success", `Welcome, ${nameVal}! You have successfully registered.`, "success");
          setLogin(false);
          setIsSignUp(false);
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

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const logoutHandler = () => {
    auth.signOut();
    setLogin(false);
  };

  const clearFormFields = () => {
    setFormState({
      title: '',
      description: '',
      priority: '',
      date: ''
    });
  };

  const addFunc = () => {
    const { title, description, priority, date } = formState;
    if (title && description && priority && date) {
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
            setFormState(prevState => ({
              ...prevState,
              title: '',
              description: '',
              priority: '',
              date: ''
            }));
            fetchUserData(uid);
          })
          .catch((error) => {
            console.error('Error pushing data to Firebase Realtime Database:', error);
          });
      } else {
        console.error('User not logged in');
      }
    } else {
      console.error('Please fill in all fields');
    }
  };
  
  const deleteFunc = (TaskKey) => {
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
  };

  const taskCreator = () => {
    return tasksObj.map((task, index) => (
      <ul className="collection with-header hoverable z-depth-2" key={index}>
        <li className="collection-header teal white-text">
          <h4 className="center">{task.title}</h4>
          <a
            onClick={() => deleteFunc(task.key)}
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
    ));
  };

  const placeHolder = () => {
    return (
      <div>
        <h4 className="center placeholder">Please add tasks :(</h4>
      </div>
    );
  };

  return (
    <div>
      {!login && isSignUp && (
        <SignUp
          signupHandler={signupHandler}
          switchToLogin={toggleForm}
        />
      )}

      {!login && !isSignUp && (
        <Login
          loginHandler={loginHandler}
          switchToSignUp={toggleForm}
        />
      )}

      {login && (
        <>
          <Navbar userName={userName} logoutHandler={logoutHandler} />
          <Dashboard taskCreator={taskCreator()} />
          {tasksObj.length === 0 && placeHolder()}
        </>
      )}

      <Form
        addFunc={addFunc}
        cancelFunc={clearFormFields}
        formData={formState}
        setFormData={setFormState}
      />
    </div>
  );
};

export default App;
