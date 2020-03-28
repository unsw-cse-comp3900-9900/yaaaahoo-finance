import React, {Fragment, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Grid } from "@material-ui/core";
import { config } from '../../config';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  gridItem: {
    marginBottom: "2em",
    width: "100%"
  },
  lastGridItem: {
    width: "100%"
  },
  title: {
    color: "#2643e9",
    fontWeighst: 400
  },
  subtitle: {
    maxWidth: "65%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "50%"
    }
  },
  divider: {
    border: "0.5px solid #2643e9"
  }
}));

const TopNews = () => {
  const classes = useStyles();
  const [article1, setArticle1] = useState({article1: {}})
  const [article2, setArticle2] = useState({article3: {}})
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
    <Fragment>
      <Grid container item justify="center">
        <Grid item className={classes.gridItem}>
          <Typography variant="h2" className={classes.title}>
            Top News
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Your daily edit of the finance news relevant to you, powered by NewsApi
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <a href = {article1.url} style={{ textDecoration: 'none' }}>
              {article1.title}
            </a>
          </Typography>
          <Typography variant="caption">
            {article1.author}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {article1.description}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <a href = {article2.url} style={{ textDecoration: 'none' }}>
              {article2.title}
            </a>
          </Typography>
          <Typography variant="caption">
            {article2.author}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {article2.description}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <a href = {article3.url} style={{ textDecoration: 'none' }}>
              {article3.title}
            </a>
          </Typography>
          <Typography variant="caption">
            {article3.author}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {article3.description}
          </Typography>
        </Grid>
      </Grid>
      <Grid item className={classes.lastGridItem}>
        <Divider className={classes.divider} />
      </Grid>
    </Fragment>
  );
};

export default TopNews;
