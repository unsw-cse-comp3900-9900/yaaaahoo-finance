import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SchoolIcon from "@material-ui/icons/School";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
const useStyles = makeStyles((theme) => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    width: "100%",
    minHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "inherit",
    },
  },
  Title: {
    fontSize: "2em",
    fontWeight: 500,
    color: "#2643e9",
    marginBottom: "1em",
  },
  Card: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cbd2f6",
    color: "#2643e9",
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
}));

const AboutUs = () => {
  const classes = useStyles();
  return (
    <div className={classes.Page}>
      <Typography className={classes.Title}>What we do</Typography>
      <div className={classes.CardContainer}>
        <div className={classes.CardItem}>
          <SchoolIcon
            style={{ fontSize: "5em", color: "#6b7aea", marginBottom: "0.2em" }}
          />
          <Card className={classes.Card}>
            <CardContent>
              <Typography gutterBottom className={classes.CardTitle}>
                Intelligent recommendations
              </Typography>
              <Typography className={classes.CardBody}>
                Our recommendations and insights are powered by "always-on"
                artificial intelligence and machine learning algorithms. For any
                stock in your portfolio, receive daily recommendations on
                whether to buy, sell, or hold; future price predictions; and the
                latest sentiment analysis.
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={classes.CardItem}>
          <PersonOutlineIcon
            style={{ fontSize: "5em", color: "#6b7aea", marginBottom: "0.2em" }}
          />
          <Card className={classes.Card}>
            <CardContent>
              <Typography gutterBottom className={classes.CardTitle}>
                Your portfolio, your way
              </Typography>
              <Typography className={classes.CardBody}>
                You're not a beginner investor. We know you want to invest in
                more than just ETFs, so we give you the option to add any kind
                of investment to your portfolio. Shares, bonds, cryptocurrencies
                - your porfolio, your way.
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className={classes.CardItem}>
          <MonetizationOnIcon
            style={{ fontSize: "5em", color: "#6b7aea", marginBottom: "0.2em" }}
          />
          <Card className={classes.Card}>
            <CardContent>
              <Typography gutterBottom className={classes.CardTitle}>
                Simple to use
              </Typography>
              <Typography className={classes.CardBody}>
                We only provide the features you need to manage your
                investments. No overly complicated details that you need a
                degree in finance to understand!
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
