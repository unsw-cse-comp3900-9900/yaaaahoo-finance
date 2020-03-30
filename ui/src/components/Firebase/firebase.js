import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAQe81lKS4ZELWIBPDaFqI9RSosAzlgpaI",
  authDomain: "aaaa-finance.firebaseapp.com",
  databaseURL: "https://aaaa-finance.firebaseio.com",
  projectId: "aaaa-finance",
  storageBucket: "aaaa-finance.appspot.com",
  messagingSenderId: "1075900888174",
  appId: "1:1075900888174:web:9890fafcd1071a1502227f",
  measurementId: "G-MVFVD7BDXP"
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
