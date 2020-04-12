import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { config } from "../../config";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
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
}));

const Portfolio = ({
  portfolio,
  recommendation,
  openEditModal,
  openDeleteModal,
  openAddHoldingsModal,
  openRemoveHoldingsModal,
  updateEarningsInfo,
}) => {
  const classes = useStyles();
  const [holdings, setHoldings] = useState(null);
  const [holdingsData, setHoldingsData] = useState(null);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const handleSubmit = (holdingId) => {
    openRemoveHoldingsModal(holdingId);
  };
  const getHoldingInfo = async (holding) => {
    // const url = `https://cloud.iexapis.com/v1/stock/${holding.symbol}/quote?token=${config.iexCloudApiToken}`;
    // return await axios
    //   .get(url)
    //   .then(({ data }) => {
    //     const currentPrice = data.latestPrice || "N/A";
    //     const currentPercentage =
    //       data.latestPrice && data.open
    //         ? (data.latestPrice / data.open).toFixed(3)
    //         : "N/A";
    //     const different =
    //       data.latestPrice && data.open
    //         ? (data.latestPrice - data.open) * holding.numberOfUnits
    //         : 0;
    //     if (different !== 0){
    //       const price = estimatedEarnings + different;
    //       setEstimatedEarnings(price);
    //     }
    //     return { currentPrice, currentPercentage };
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return { currentPrice: "N/A", currentPercentage: "N/A" };
    //   });
      return { currentPrice: "N/A", currentPercentage: "N/A" };
  };

  useEffect(() => {
    if (portfolio.holdings) {
      setHoldings(Object.values(portfolio.holdings));
    } else {
      setHoldings(null);
    }
  }, [portfolio]);

  useEffect(() => {
    getContent();
  }, [holdings]);

  const getContent = async () => {
    if (!holdings) {
      setHoldingsData(null);
      setEstimatedEarnings(0)
      return;
    }
    const holdingsContent = [];
    for (const holding of holdings) {
      const holdingId = holding.id;
      const currentInfo = await getHoldingInfo(holding);
      const styleColor =
        currentInfo.currentPercentage < 0
          ? "#fb6340"
          : currentInfo.currentPercentage > 0
          ? "#2dce89"
          : "inherit";
      holdingsContent.push(
        <div className={classes.CardItem} key={holding.id}>
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
                {currentInfo.currentPrice}
              </Typography>
              <Typography
                className={classes.HoldingCardHeading}
                style={{ color: styleColor }}
              >
                {currentInfo.currentPercentage}%
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
          <EditIcon className={classes.editButton} onClick={openEditModal} />
        </Typography>
        <DeleteIcon className={classes.delete} onClick={openDeleteModal} />
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
          onClick={openAddHoldingsModal}
        />{" "}
        Add Holdings
      </Typography>
      {!portfolio.holdings && (
        <div className={classes.CardItem}>
          <Card className={classes.Card}>
            <CardContent className={classes.CardContent}>
              <Typography gutterBottom className={classes.CardTitle}>
                Based on your profile we recommend building a{" "}
                <span className={classes.link}>{recommendation} Portfolio</span>
                .
              </Typography>
              <Button variant="contained" className={classes.button}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {holdingsData}
    </Fragment>
  );
};

export default Portfolio;
