import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCRl9wcdACPQhPgRA3QD-EQ9rXwnsyKeY8",
  authDomain: "yaaaahoo-finance.firebaseapp.com",
  databaseURL: "https://yaaaahoo-finance.firebaseio.com",
  projectId: "yaaaahoo-finance",
  storageBucket: "yaaaahoo-finance.appspot.com",
  messagingSenderId: "236123170521",
  appId: "1:236123170521:web:7bc52dd0dd71617e7b80c8",
  measurementId: "G-XH5T7EN0SX"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }
  getCurrentUser = () => this.auth.currentUser;

  doCreateUserWithEmailAndPassword = (email, password, profileData) =>
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        return this.db.ref("users/" + user.uid).set(profileData);
      })
      .catch(error => console.log(error));

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  getUserData = async () => {
    const userId = await this.auth.currentUser.uid;
    return await this.db
      .ref("/users/" + userId)
      .once("value")
      .then(snapshot => snapshot.val());
  };

  doAddInvestmentToPortfolio = (index, symbol, companyName, numberOfUnits, costPerUnit, tradeDate) => {
      const userId = this.auth.currentUser.uid;
      return this.db
          .ref("/users/" + userId.portfolio).set({
              index: index,
              symbol: symbol,
              companyName: companyName,
              numberOfUnits: numberOfUnits,
              costPerUnit: costPerUnit,
              tradeDate: tradeDate
            });
          }
}
export default Firebase;
