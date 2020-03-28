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

const AboutUs = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container item justify="center">
        <Grid item className={classes.gridItem}>
          <Typography variant="h2" className={classes.title}>
            What we do
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <Typography variant="h4" className={classes.title}>
          Intelligent recommendations
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Our recommendations and insights are powered by "always-on" artificial intelligence and machine learning
          algorithms. For any stock in your portfolio, receive daily recommendations on whether to buy, sell, or hold;
          future price predictions; and the latest sentiment analysis.
        </Typography>
        <Typography variant="h4" className={classes.title}>
          Your portfolio, your way
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          You're not a beginner investor.  We know you want to invest in more than just ETFs, so we give you the option
          to add any kind of investment to your portfolio.  Shares, bonds, cryptocurrencies - your porfolio, your way.
        </Typography>
        <Typography variant="h4" className={classes.title}>
          Simple to use
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          We only provide the features you need to manage your investments.  No overly complicated details
          that you need a degree in finance to understand!
        </Typography>
      </Grid>
      <Grid item className={classes.lastGridItem}>
        <Divider className={classes.divider} />
      </Grid>
    </Fragment>
  );
};

export default AboutUs;
