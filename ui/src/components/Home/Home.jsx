/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "../Session";
import { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TopNews from "../TopNews/TopNews";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    paddingTop: "10em",
    paddingBottom: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em",
      paddingTop: "2em",
      paddingBottom: "2em"
    },
  },
  title: {
    fontSize: "3em",
    fontWeight: "500",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
    marginRight: "auto",
  },
  editButton: {
    cursor: "pointer",
    fontSize: "0.8em",
    "&:hover": {
      color: "#2643e9",
    },
  },
  searchButton: {
    cursor: "pointer",
    color: "#2643e9",
    marginLeft: "auto",
    "&:hover": {
      opacity: "0.5",
    },
    fontSize: "3em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
  },
  addIcon: {
    margin: "1em 0",
    fontSize: "1.5em",
    marginRight: "0.3em",
    "&:hover": {
      opacity: "0.5",
    },
    cursor: "pointer",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  summary: {
    color: "#a9a9a9",
    display: "flex",
    flexDirection: "column",
    marginTop: "1em",
  },
  sumHeading1: {
    fontSize: "1.8em",
  },
  sumHeading2: {
    fontSize: "1.5em",
  },
  heading1: {
    fontSize: "1.3em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Card: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    height: "200px",
    [theme.breakpoints.down("sm")]: {
      height: "400px",
    },
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "400",
  },
  CardBody: {
    fontSize: "1em",
  },
  CardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    justifyContent: "space-around",
  },
  CardItem: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "3em",
  },
  CardContent:{
    padding: "3em",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  link: {
    textDecoration: "underline",
    color: "#2643e9",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.5",
    },
  },
  button: {
    height: "3em",
    color: "#fff",
    borderColor: "#2643e9",
    backgroundColor: "#2643e9",
    width: "200px",
  }
}));
const Home = ({ firebase }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const calcRecommendation = () => {
    if (!userData) return;
    const { risk, age } = userData;
    if (risk && age) {
      if (age === "Young") {
        if (risk === "High") setRecommendation("Wealth Maximiser");
        if (risk === "Balanced") setRecommendation("Wealth Builder");
        else setRecommendation("Stable Wealth");
      } else if (age === "Middle-aged") {
        if (risk === "High") setRecommendation("Wealth Builder");
        if (risk === "Balanced") setRecommendation("Stable Wealth");
        else setRecommendation("Wealth Secure");
      } else if (age === "Retiree") {
        if (risk === "High") setRecommendation("Wealth Secure");
        else setRecommendation("Income Generator");
      }
    }
  };

  useEffect(() => {
    calcRecommendation();
  }, [userData]);

  useEffect(() => {
    firebase.getUserData().then((res) => setUserData(res));
  }, []);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return (
          <div className={classes.page}>
            {userData && recommendation && (
              <Fragment>
                <div className={classes.header}>
                  <Typography className={classes.title}>
                    My Portfolio <EditIcon className={classes.editButton} />
                  </Typography>
                  <SearchIcon className={classes.searchButton} />
                </div>
                <div className={classes.summary}>
                  <Typography className={classes.sumHeading2}>
                    Estimated earnings today
                  </Typography>
                  <Typography className={classes.sumHeading1}>$0.00</Typography>
                </div>
                <Typography className={classes.heading1}>
                  <AddCircleIcon className={classes.addIcon} /> Add Holdings
                </Typography>
                <div className={classes.CardItem}>
                  <Card className={classes.Card}>
                    <CardContent className={classes.CardContent}>
                      <Typography gutterBottom className={classes.CardTitle}>
                        Based on your profile we recommend building a{" "}
                        <span className={classes.link}>{recommendation} Portfolio</span>.
                      </Typography>
                      <Button variant="contained" className={classes.button}>Learn More</Button>
                    </CardContent>
                  </Card>
                </div>
                <TopNews title="Top News" titleColor="#000000de" />
              </Fragment>
            )}
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Home);
