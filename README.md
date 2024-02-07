# React Task-Manager Todo App with Firebase Authentication and Real-time Database

This is a simple todo application built with React.js and Firebase, allowing users to sign up and log in to manage their todo tasks. Each user has access only to their own todo tasks.

## Features

- Firebase authentication for user signup and login.
- Real-time database to store and manage todo tasks.
- Secure access: Each user can only access their own todo tasks.
- Add, edit, and delete todo tasks.
- Mark tasks as completed.
- Responsive design for mobile and desktop.

## Installation

### 1. Clone the repository:

```
git clone https://github.com/pratikkhulge/TODO.git
```

### 2. Navigate into the project directory:
```
cd react-todo-firebase
```

### 3. Install dependencies using npm or yarn:
```
npm install
# or
yarn install

```
### 4. Set up Firebase project:

- Go to the Firebase Console and create a new project.
- Enable authentication (Email/password) in the Authentication section.
- Enable Realtime Database in the Database section.

### 5.Copy Firebase configuration:

- In your Firebase project settings, find the Firebase SDK snippet and copy the configuration object.

### 6.Create a .env file in the root directory of your project and add your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_DATABASE_URL=your-database-url
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

```
- Replace your-api-key, your-auth-domain, etc. with your Firebase project's actual values.

### 7.Start the development server:
```
npm start
# or
yarn start
```
### Usage
- Open your browser and navigate to http://localhost:3000.
- Sign up for a new account or log in with existing credentials.
- Add new todo tasks, mark tasks as completed, edit or delete tasks.
- Log out when done.

### Dependencies

This project relies on the following dependencies:

- **React**: JavaScript library for building user interfaces. [Learn more](https://reactjs.org/)
- **Firebase**: Platform for building web and mobile applications without managing infrastructure. [Learn more](https://firebase.google.com/)
- **React Router**: Declarative routing for React.js. [Learn more](https://reactrouter.com/)

You can install these dependencies using npm or yarn:

```
npm install react firebase react-router-dom
# or
yarn add react firebase react-router-dom
```

### Contributing
- Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.


### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




