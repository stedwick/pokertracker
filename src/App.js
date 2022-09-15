import logo from './logo.svg';
import './App.css';
import React from "react";
import {signInWithRedirect, signOut, getRedirectResult, onAuthStateChanged, GoogleAuthProvider} from "firebase/auth";
import {auth, authGoogle} from "./utils/firebase";

var currentUser = false;

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         currentUser = user;
//         // ...
//     } else {
//         // User is signed out
//         // ...
//     }
// });

function pokerSignIn() {
  signInWithRedirect(auth, authGoogle);
}

function pokerSignOut() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

class CurrentUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myUser: currentUser};
  }

  render() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        this.setState({myUser: user});
        // ...
      } else {
        this.setState({myUser: null});
        // User is signed out
        // ...
      }
    });
    if (this.state.myUser) {
      return (
        <p>Welcome {this.state.myUser.email}!</p>
      );
    } else {
      return (
        <p>Nobody logged in.</p>
      );
    }
  }
}

function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const apiKey = urlParams.get('apiKey');
  if (apiKey) {
    getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      currentUser = result.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // alert(errorMessage);
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <button onClick={pokerSignIn}>
          ✅ Activate Lasers
        </button>
        <button onClick={pokerSignOut}>
          🚪 Sign Out
        </button>
        <CurrentUser/>
        <p>
          Philip's app! ⭐ Bingo. Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
