import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Doughnut } from "react-chartjs-2";
import recommendationsContent from "./recommendations.json";

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
    height: "500px",
    [theme.breakpoints.down("sm")]: {
      height: "400px",
    },
  },
  HoldingCard: {
    extend: "Card",
    height: "120px",
    [theme.breakpoints.down("sm")]: {
      height: "120px",
    },
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "400",
  },
  HoldingCardHeading: {
    fontSize: "1.5em",
    fontWeight: "400",
  },
  HoldingCardTitle: {
    fontSize: "1.5em",
    fontWeight: "500",
    textDecoration: "underline",
    color: "#2643e9",
    "&:hover": {
      opacity: "0.5",
    },
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  HoldingCardContent: {
    extend: "CardContent",
    flexDirection: "row",
    padding: "1em",
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
  removeIcon: {
    cursor: "pointer",
    "&:hover": {
      opacity: "0.5",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:focus": {
      outline: "none",
    },
    outline: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    maxWidth: "60%",
    minHeight: "60%",
    minWidth: "50%",
    alignItems: "center",
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none",
    },
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
      minHeight: "90%",
    },
  },
  submitButton: {
    extend: "button",
    color: "#fff",
    backgroundColor: "#2643e9",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: "1.5em",
    fontWeight: 500,
  },
  summary: {
    fontStyle: "italic",
    fontSize: "1.2em",
  },
  description: {
    fontSize: "1em",
    maxWidth: "80%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
}));

const Portfolio = ({
  portfolio,
  recommendation,
  openEditModal,
  openDeleteModal,
  openAddHoldingsModal,
  openRemoveHoldingsModal,
  getHoldingsInfo,
}) => {
  const classes = useStyles();
  const [holdings, setHoldings] = useState(null);
  const [holdingsData, setHoldingsData] = useState(null);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [recommendContent, setRecommendContent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSubmit = (holdingId) => {
    openRemoveHoldingsModal(holdingId, portfolio.id);
  };

  const getHoldingsData = async () => {
    const result = await getHoldingsInfo(Object.values(portfolio.holdings));
    setHoldings(result.holdingsList);
    setEstimatedEarnings(result.earnings);
  };

  useEffect(() => {
    if (portfolio.holdings) {
      getHoldingsData();
    } else {
      setHoldings(null);
      setEstimatedEarnings(0);
      for (let content of recommendationsContent) {
        if (content.type === recommendation) {
          setRecommendContent(content);
          break;
        }
      }
    }
  }, [portfolio]);

  useEffect(() => {
    getContent();
  }, [holdings]);

  const getContent = async () => {
    if (!holdings) {
      setHoldingsData(null);
      setEstimatedEarnings(0);
      return;
    }
    const holdingsContent = [];
    for (const holding of holdings) {
      const holdingId = holding.id;
      const styleColor =
        holding.currentPercentage < 0
          ? "#fb6340"
          : holding.currentPercentage > 0
          ? "#2dce89"
          : "inherit";
      holdingsContent.push(
        <div className={classes.CardItem} key={holdingId}>
          <Card className={classes.HoldingCard}>
            <CardContent
              className={classes.HoldingCardContent}
              style={{ paddingBottom: "1em" }}
            >
              <Typography
                component={Link}
                to={`/company/${holding.symbol}`}
                className={classes.HoldingCardTitle}
              >
                {holding.symbol}
              </Typography>
              <Typography className={classes.HoldingCardHeading}>
                {holding.currentPrice}
              </Typography>
              <Typography
                className={classes.HoldingCardHeading}
                style={{ color: styleColor }}
              >
                {holding.currentPercentage}%
              </Typography>
              <RemoveCircleIcon
                value={holding.id}
                className={classes.removeIcon}
                onClick={() => handleSubmit(holdingId)}
              />
            </CardContent>
          </Card>
        </div>
      );
    }
    setHoldingsData(holdingsContent);
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const styleColor =
    estimatedEarnings < 0
      ? "#fb6340"
      : estimatedEarnings > 0
      ? "#2dce89"
      : "inherit";

  return (
    <Fragment>
      <div className={classes.header}>
        <Typography className={classes.title}>
          {portfolio.name}{" "}
          <EditIcon
            className={classes.editButton}
            onClick={() => openEditModal(portfolio.id)}
          />
        </Typography>
        <DeleteIcon
          className={classes.delete}
          onClick={() => openDeleteModal(portfolio.id)}
        />
      </div>
      <div className={classes.summary}>
        <Typography className={classes.sumHeading2}>
          Estimated earnings today
        </Typography>
        <Typography
          className={classes.sumHeading1}
          style={{ color: styleColor }}
        >
          ${estimatedEarnings.toFixed(2)}
        </Typography>
      </div>
      <Typography className={classes.heading1}>
        <AddCircleIcon
          className={classes.addIcon}
          onClick={() => openAddHoldingsModal(portfolio.id)}
        />{" "}
        Add Holdings
      </Typography>
      {!portfolio.holdings && recommendContent && (
        <div className={classes.CardItem}>
          <Card className={classes.Card}>
            <CardContent className={classes.CardContent}>
              <Typography gutterBottom className={classes.CardTitle}>
                Based on your profile we recommend building a{" "}
                <span style={{ fontWeight: 500 }}>
                  {recommendation} Portfolio
                </span>
                .
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50%",
                  width: "100%",
                }}
              >
                <Doughnut options={options} data={recommendContent.chart} />
              </div>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOpenModal}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {holdingsData}
      {openModal && recommendContent && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              <Typography className={classes.heading}>
                {recommendContent.title}
              </Typography>
              <Typography className={classes.summary}>
                {recommendContent.summary}
              </Typography>
              <Typography className={classes.description}>
                {recommendContent.description}
              </Typography>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                className={classes.submitButton}
              >
                Close
              </Button>
            </div>
          </Fade>
        </Modal>
      )}
    </Fragment>
  );
};

export default Portfolio;
