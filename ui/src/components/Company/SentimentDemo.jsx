import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthUserContext, withAuthorization } from "../Session";

const useStyles = makeStyles(theme => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  },
  Container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    width: "100%",
    minHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "inherit"
    }
  },
  Title: {
    fontSize: "2em",
    fontWeight: 500,
    marginBottom: "1em"
  },
  Heading2: {
    fontSize: "1.3em",
    fontWeight: 400,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
}));
const SentimentDemo = ({ history }) => {
  const classes = useStyles();
  const [analysis, setAnalysis] = useState(null);
  const company = history.location.pathname.replace("/sentiment/", "");
  useEffect(() => {
    const fetchTask = async () => {
      const result = await axios.get(
        `http://localhost:8080/sentiment/${company}`
      );
      setAnalysis(result.data.sentiment === "-1" ? false : true);
    };
    fetchTask();
    return () => console.log("unmounting...");
  }, []);

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <div className={classes.Page}>
            <div className={classes.Container}>
              <Typography className={classes.Title}>{company}</Typography>
              <div className={classes.Heading2}>
                Sentimental Analysis:
                {analysis !== null && analysis ? (
                  <span style={{ color: "#2dce89", marginLeft: "1em" }}>
                    <ThumbUpAltIcon style={{ fontSize: "2em" }} />
                  </span>
                ) : analysis !== null && !analysis ? (
                  <span style={{ color: "#fb6340", marginLeft: "1em" }}>
                    <ThumbDownAltIcon style={{ fontSize: "2em" }} />
                  </span>
                ) : (
                  <CircularProgress
                    size="1.2em"
                    style={{ marginLeft: "1em", color: "#2643e9" }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};
const condition = authUser => !!authUser;

export default withAuthorization(condition)(SentimentDemo);
