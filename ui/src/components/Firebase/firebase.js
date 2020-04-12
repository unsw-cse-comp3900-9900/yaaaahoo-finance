import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { config } from "../../config";

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
      .then(() => {
        return this.initializePortfolio("My Portfolio");
      })
      .catch((error) => console.log(error));

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  getUserData = async () => {
    const userId = await this.auth.currentUser.uid;
    return await this.db
      .ref("/users/" + userId)
      .once("value")
      .then((snapshot) => snapshot.val());
  };

  initializePortfolio = async (portfolioName) => {
    const userId = await this.auth.currentUser.uid;
    const userPortfolioRef = this.db.ref("/users/" + userId + "/portfolios");
    const newPortfolioRef = userPortfolioRef.push();
    const portfolioId = newPortfolioRef.key;
    return await newPortfolioRef.set({
      name: portfolioName,
      id: portfolioId,
    });
  };

  deletePortfolio = async (portfolioId) => {
    const userId = await this.auth.currentUser.uid;
    return await this.db
      .ref("/users/" + userId + "/portfolios/" + portfolioId)
      .remove()
      .then(function() {
        console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  };

  editPortfolioName = async (portfolioName, portfolioId) => {
    const userId = await this.auth.currentUser.uid;
    return await this.db
      .ref("/users/" + userId + "/portfolios/" + portfolioId)
      .update({
        name: portfolioName,
      });
  };

  addHolding = async (portfolioId, form) => {
    const userId = this.auth.currentUser.uid;
    const userHoldingsRef = this.db.ref(
      "/users/" + userId + "/portfolios/" + portfolioId + "/holdings"
    );
    const newHoldingsRef = userHoldingsRef.push();
    const holdingId = newHoldingsRef.key;
    const result = {...form};
    result.id = holdingId;
    return await (await newHoldingsRef).set(result);
  };

  removeHolding = async (portfolioId, holdingId) => {
    const userId = await this.auth.currentUser.uid;
    return await this.db
      .ref(
        "/users/" +
          userId +
          "/portfolios/" +
          portfolioId +
          "/holdings/" +
          holdingId
      )
      .remove()
      .then(function() {
        console.log("Remove succeeded.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  };

  doAddInvestmentToPortfolio = (
    index,
    symbol,
    companyName,
    numberOfUnits,
    costPerUnit,
    tradeDate
  ) => {
    const userId = this.auth.currentUser.uid;
    return this.db.ref("/users/" + userId.portfolio).set({
      index: index,
      symbol: symbol,
      companyName: companyName,
      numberOfUnits: numberOfUnits,
      costPerUnit: costPerUnit,
      tradeDate: tradeDate,
    });
  };
}
export default Firebase;
