import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  PageContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em",
    },
  },
  ContentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    width: "100%",
    minHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "inherit",
    },
  },
}));

const Analysis = ({ company, classes }) => {
  const [data, setData] = useState({
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [startDayPrice, setStartDayPrice] = useState(0);
  const [finalDayPrice, setFinalDayPrice] = useState(0);

  const lineRef = useRef(null);

  const getPredictions = async (days) => {
    const rands = [];
    const nums = await axios.get(
      `http://localhost:8080/prediction/${days}/${company}`
    );
    const preds = nums["data"];

    const initialData = {
      datasets: [
        {
          label: company,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          data: nums["data"],
        },
      ],
    };
    setData(initialData);

    for (let i = 0; i < days; i++) {
      rands.push({
        x: i + 1,
        y: preds[i],
      });
    }

    const numbers = rands;

    data["datasets"][0]["data"] = numbers;

    let lineChart = lineRef.current.chartInstance;
    lineChart.update();
    return numbers;
  };

  useEffect(() => {
    if (!data) return;
    const { datasets } = data;
    const [firstElem] = datasets;
    if (firstElem.data && firstElem.data.length > 0) {
      console.log(firstElem.data[firstElem.data.length - 1]);
      const startPrice = firstElem.data[0].y;
      const lastPrice = firstElem.data[firstElem.data.length - 1].y;
      setStartDayPrice(startPrice);
      setFinalDayPrice(lastPrice);
    }
  }, [data]);

  useEffect(() => {
    getPredictions(20);
  }, []);

  const options = {
    scales: {
      xAxes: [
        {
          type: "linear",
        },
      ],
    },
  };

  const difference = finalDayPrice - startDayPrice;
  const differencePercentage = (finalDayPrice - startDayPrice) / startDayPrice;
  const styleColor =
    difference < 0 ? "#fb6340" : difference > 0 ? "#2dce89" : "inherit";
  return (
    <Fragment>
      <Typography style={{ color: "#444444" }} className={classes.Heading2}>
        Our 30-Day Prediction
      </Typography>
      <Typography className={classes.Heading2}>
        {finalDayPrice ? finalDayPrice.toFixed(2) : "N/A"}
      </Typography>
      <Typography style={{ color: styleColor }} className={classes.Heading4}>
        {difference
          ? `${difference.toFixed(2)} ${differencePercentage.toFixed(2)}%`
          : "N/A"}
      </Typography>
      <div
        className={classes.Heading5}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        Sentimental Analysis:{" "}
        {difference > 0 ? (
          <span style={{ color: "#2dce89", marginLeft: "1em" }}>
            <ThumbUpAltIcon style={{ fontSize: "2em" }} />
          </span>
        ) : difference < 0 ? (
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
      <Typography className={classes.Heading5}>
        Our Recommendation:{" "}
        <span
          style={{
            color: styleColor,
            marginLeft: "0.3em",
            fontWeight: 500,
            fontSize: "1.2em",
          }}
        >
          N/A
        </span>
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button onClick={() => getPredictions(1)}>1 day</Button>
        <Button onClick={() => getPredictions(2)}>2 days</Button>
        <Button onClick={() => getPredictions(3)}>3 days</Button>
        <Button onClick={() => getPredictions(5)}>1 week</Button>
        <Button onClick={() => getPredictions(10)}>2 weeks</Button>
        <Button onClick={() => getPredictions(20)}>1 month</Button>
      </div>
      <div className={classes.ContentContainer}>
        <Line ref={lineRef} data={data} options={options} />
      </div>
    </Fragment>
  );
};

export default Analysis;
