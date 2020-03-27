import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Grid } from "@material-ui/core";

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

var url = 'http://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2020-03-26&' +
          'sortBy=popularity&' +
          'apiKey=7f414417b66e4e96a7e7cec32dd96562';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })

const TopNews = () => {
  const classes = useStyles();
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
        </Grid>
      </Grid>
      <Grid item className={classes.lastGridItem}>
        <Divider className={classes.divider} />
      </Grid>
    </Fragment>
  );
};

export default TopNews;
