import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SchoolIcon from "@material-ui/icons/School";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {config} from "../../../config";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "90%",
    paddingTop: "2em",
    width: "100%"
  },
  Title: {
    fontSize: "2em",
    fontWeight: 500,
    color: "#2643e9"
  },
  Card: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cbd2f6",
    color: "#2643e9"
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "400"
  },
  CardBody: {
    fontSize: "1em"
  },
  CardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    justifyContent: "space-evenly"
  },
  CardItem: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
}));

const TopNews = () => {
  const classes = useStyles();

  const [article1, setArticle1] = useState({article1: {}})
  const [article2, setArticle2] = useState({article2: {}})
  const [article3, setArticle3] = useState({article3: {}})
  useEffect(() => {
    // NEWS API CALL
    const url = `http://newsapi.org/v2/top-headlines?category=business&country=au&apiKey=${config.newsApiToken}`
    axios.get(url)
      .then(res => {
        setArticle1(res.data.articles[0]);
        setArticle2(res.data.articles[1]);
        setArticle3(res.data.articles[2]);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <Grid container justify="left" className={classes.page}>
      <Grid item>
      <Typography className={classes.Title} gutterBottom>
        Top News
      </Typography>
      <Typography className={classes.subtitle}>
        Your daily edit of the finance news relevant to you, powered by NewsApi
      </Typography>
      </Grid>
        <Grid item>
        <Typography gutterBottom className={classes.CardTitle}>
                <a href = {article1.url} style={{ textDecoration: 'none' }}>{article1.title}</a>
              </Typography>
              <Typography variant="caption">
                {article1.author}
              </Typography>
              <Typography className={classes.CardBody}>
                {article1.description}
              </Typography>
      </Grid>
        <Grid item>
        <Typography gutterBottom className={classes.CardTitle}>
                <a href = {article2.url} style={{ textDecoration: 'none' }}>{article2.title}</a>
              </Typography>
              <Typography variant="caption">
                {article2.author}
              </Typography>
              <Typography className={classes.CardBody}>
                {article2.description}
              </Typography>
      </Grid>
        <Grid item>
        <Typography gutterBottom className={classes.CardTitle}>
                <a href = {article3.url} style={{ textDecoration: 'none' }}>{article3.title}</a>
              </Typography>
              <Typography variant="caption">
                {article3.author}
              </Typography>
              <Typography className={classes.CardBody}>
                {article3.description}
              </Typography>
        </Grid>
    </Grid>
  );
};

export default TopNews;
