import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import SVG from "react-inlinesvg";
import NeutralSentiment from "../../assets/neutral-sentiment.svg";
import SadSentiment from "../../assets/sad-sentiment.svg";
import HappySentiment from "../../assets/happy-sentiment.svg";

const Analysis = ({ company, classes, companyData, historicalData }) => {
  const [graphData, setGraphData] = useState(null);
  const [startDayPrice, setStartDayPrice] = useState(0);
  const [finalDayPrice, setFinalDayPrice] = useState(0);
  const [sentimentString, setSentimentString] = useState(null);
  const [sentiment, setSentiment] = useState(
    <CircularProgress
      size="1.2em"
      style={{ marginLeft: "1em", color: "#2643e9" }}
    />
  );
  const [recommendation, setRecommendation] = useState(
    <CircularProgress
      size="1.2em"
      style={{ marginLeft: "1em", color: "#2643e9" }}
    />
  );

  const [predictionName, setPredictionName] = useState(
    "Our 1 Month Prediction"
  );
  const lineRef = useRef(null);
  const cancelToken = useRef(null);

  const getPredictions = async (days) => {
    cancelToken.current = axios.CancelToken.source();
    var predictions = [];
    var prev = [];
    const today = new Date();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      cancelToken: cancelToken.current.token,
    };

    if (days < 5) {
      setPredictionName("Our " + days + "Day Prediction");
    } else if (days == 5) {
      setPredictionName("Our 1 Week Prediction");
    } else if (days == 10) {
      setPredictionName("Our 2 Week Prediction");
    } else if (days == 20) {
      setPredictionName("Our 1 Month Prediction");
    }

    return await axios
      .post(
        `http://localhost:8080/prediction`,
        { historicalData, days, company },
        config
      )
      .then(({ data }) => {
        const prev_cut = (data.length * 2) / 3;
        for (var i = 0; i < data.length; i++) {
          const currentDate = today.setDate(today.getDate() + 1);
          if (i < prev_cut) {
            prev.push({
              x: currentDate,
              y: data[i],
            });
          } else if (i == prev_cut) {
            prev.push({
              x: currentDate,
              y: data[i],
            });
            predictions.push({
              x: currentDate,
              y: data[i],
            });
          } else {
            predictions.push({
              x: currentDate,
              y: data[i],
            });
          }
        }
        const initialData = {
          datasets: [
            {
              label: company + " predictions",
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
              data: predictions,
            },
            {
              label: company,
              lineTension: 0.1,
              backgroundColor: "rgba(235, 82, 82,0.4)",
              borderColor: "rgba(235, 82, 82,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(235, 82, 82,1)",
              pointBackgroundColor: "#000",
              pointBorderWidth: 1,
              pointHoverBackgroundColor: "rgba(235, 82, 82,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              data: prev,
            },
          ],
        };
        setGraphData(initialData);

        if (lineRef.current) {
          let lineChart = lineRef.current.chartInstance;
          lineChart.update();
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      });
  };

  const getSentiment = async () => {
    return await axios
      .get(`http://localhost:8080/sentiment/${company}`, {
        cancelToken: cancelToken.current.token,
      })
      .then(({ data }) => {
        if (data.sentiment === "N/A") setSentimentString("0");
        setSentiment(
          <span
            style={{
              marginLeft: "0.3em",
              fontWeight: 500,
              fontSize: "1.2em",
            }}
          >
            N/A
          </span>
        );
        if (data.sentiment === "1") setSentimentString("1");
        setSentiment(
          <SVG
            style={{ marginLeft: "0.3em", fontSize: "3em" }}
            src={HappySentiment}
            className="positive"
          />
        );
        if (data.sentiment === "-1") setSentimentString("-1");
        setSentiment(
          <SVG
            style={{ marginLeft: "0.3em", fontSize: "3em" }}
            src={SadSentiment}
            className="negative"
          />
        );
        if (data.sentiment === "0") setSentimentString("0");
        setSentiment(
          <SVG
            style={{ marginLeft: "0.3em", fontSize: "3em" }}
            src={NeutralSentiment}
            className="neutral"
          />
        );
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
        setSentimentString("N/A");
        setSentiment("N/A");
      });
  };

  useEffect(() => {
    if (!graphData) return;
    const { datasets } = graphData;
    const [firstElem, secondElem] = datasets;
    if (firstElem.data && firstElem.data.length > 0) {
      // changed so it is second last because the last day is actually just for visual effect
      const startPrice = secondElem.data[secondElem.data.length - 2].y;
      const lastPrice = firstElem.data[firstElem.data.length - 1].y;
      setStartDayPrice(startPrice);
      setFinalDayPrice(lastPrice);
    }
  }, [graphData]);

  useEffect(() => {
    const difference = finalDayPrice - startDayPrice;
    if (!sentimentString)
      setRecommendation(
        <CircularProgress
          size="1.2em"
          style={{ marginLeft: "1em", color: "#2643e9" }}
        />
      );

    if (sentimentString === "1") {
      if (difference < 0) setRecommendation("Hold");
      if (difference >= 0) setRecommendation("Buy");
    } else if (sentimentString === "-1") {
      if (difference < 0) setRecommendation("Sell");
      if (difference >= 0) setRecommendation("Hold");
    } else if (sentimentString === "0") {
      if (difference === 0) setRecommendation("Sell");
      if (difference > 0) setRecommendation("Buy");
      if (difference < 0) setRecommendation("Hold");
    } else if (sentimentString === "N/A") {
      setRecommendation("N/A");
    }
  }, [sentiment]);

  useEffect(() => {
    if (cancelToken.current) {
      cancelToken.current.cancel("Component unmounted");
    }
    getPredictions(20);
    getSentiment();
    return () => {
      if (cancelToken.current) {
        cancelToken.current.cancel("Component unmounted");
      }
    };
  }, []);

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              day: "D MMM YYYY",
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const difference = (((finalDayPrice - startDayPrice)/startDayPrice) * 100).toFixed(2);
  const styleColor =
    difference < 0
      ? "#fb6340"
      : difference > 0
      ? "#2dce89"
      : "inherit";

  return (
    <Fragment>
      {graphData ? (
        <Fragment>
          <Typography style={{ color: "#444444" }} className={classes.Heading2}>
            {predictionName}
          </Typography>
          <Typography className={classes.Heading2}>
            {finalDayPrice ? finalDayPrice.toFixed(2) : "N/A"}
          </Typography>
          <Typography
            style={{ color: styleColor }}
            className={classes.Heading4}
          >
            {difference || "N/A"}%
          </Typography>
          <div
            className={classes.Heading5}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Sentimental Analysis: {sentiment}
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
              {recommendation}
            </span>
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={() => getPredictions(1)}>1 day</Button>
            <Button onClick={() => getPredictions(2)}>2 days</Button>
            <Button onClick={() => getPredictions(3)}>3 days</Button>
            <Button onClick={() => getPredictions(5)}>1 week</Button>
            <Button onClick={() => getPredictions(10)}>2 weeks</Button>
            <Button onClick={() => getPredictions(20)}>1 month</Button>
          </div>
          <div style={{ marginBottom: "3em" }}>
            <Line ref={lineRef} data={graphData} options={options} />
          </div>
        </Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress style={{ color: "#cbd2f6" }} />
        </div>
      )}
    </Fragment>
  );
};

export default Analysis;
