import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAQGsevLr-DxFvRSEn9WHUsy0FRXR8K9EQ",
  authDomain: "finance-3a76e.firebaseapp.com",
  databaseURL: "https://finance-3a76e.firebaseio.com",
  projectId: "finance-3a76e",
  storageBucket: "finance-3a76e.appspot.com",
  messagingSenderId: "1004372558258",
  appId: "1:1004372558258:web:964664e91f28fda0fda4ab",
  measurementId: "G-RF0S5VWRNS"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  getCurrentUser = () => this.auth.currentUser;

  doCreateUserWithEmailAndPassword = (username, email, password) =>
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.auth.currentUser.updateProfile({
          displayName: username
        })
        .then(() => user)
      })
      .catch(error => console.log(error));

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}
export default Firebase;
