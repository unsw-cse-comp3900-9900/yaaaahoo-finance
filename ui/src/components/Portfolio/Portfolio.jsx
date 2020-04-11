import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";

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
      paddingBottom: "2em",
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
  CardContent: {
    padding: "3em",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  },
  delete: {
    cursor: "pointer",
    marginLeft: "auto",
    color: "#f4433687",
    "&:hover": {
      opacity: "0.5",
    },
    fontSize: "3em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
  },
}));

const Portfolio = ({
  portfolio,
  recommendation,
  openEditModal,
  openDeleteModal,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.header}>
        <Typography className={classes.title}>
          {portfolio.name}{" "}
          <EditIcon className={classes.editButton} onClick={openEditModal} />
        </Typography>
        <DeleteIcon className={classes.delete} onClick={openDeleteModal} />
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
            <Button variant="contained" className={classes.button}>
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

export default Portfolio;
