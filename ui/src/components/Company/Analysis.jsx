/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import SVG from "react-inlinesvg";
import NeutralSentiment from "../../assets/neutral-sentiment.svg";
import SadSentiment from "../../assets/sad-sentiment.svg";
import HappySentiment from "../../assets/happy-sentiment.svg";

const Analysis = ({
  company,
  classes,
  historicalData,
  predictionInput,
  companyData,
  updateCompany,
  tweets,
}) => {
  const [graphData, setGraphData] = useState(null);
  const [days, setDays] = useState(20);
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

  const getPredictions = async () => {
    cancelToken.current = axios.CancelToken.source();
    var predictions = [];
    var prev = [];

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      cancelToken: cancelToken.current.token,
    };

    if (days < 5) {
      setPredictionName("Our " + days + " Day Prediction");
    } else if (days === 5) {
      setPredictionName("Our 1 Week Prediction");
    } else if (days === 10) {
      setPredictionName("Our 2 Week Prediction");
    } else if (days === 20) {
      setPredictionName("Our 1 Month Prediction");
    }

    return await axios
      .post(
        `http://localhost:8080/prediction`,
        { predictionInput, days },
        config
      )
      .then(({ data }) => {
        const price_data = data['prices'];
        const date_data = data['dates'];
        const prev_cut = (price_data.length * 2) / 3;
        for (var i = 0; i < price_data.length; i++) {
          let price = price_data[i].toFixed(2);
          if (i < prev_cut) {
            prev.push({
              x: date_data[i],
              y: price,
            });
          } else if (i === prev_cut) {
            prev.push({
              x: date_data[i],
              y: price,
            });
            predictions.push({
              x: date_data[i],
              y: price,
            });
          } else {
            predictions.push({
              x: date_data[i],
              y: price,
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
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      cancelToken: cancelToken.current.token,
    };
    return await axios
      .post(
        `http://localhost:8080/sentiment`,
        {
          tweets,
          company: companyData.companyName,
        },
        config
      )
      .then(({ data }) => {
        if (data.tweets && data.tweets.length > 0) {
          updateCompany(data.tweets);
        }
        if (data.sentiment === "N/A") {
          setSentimentString("0");
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
        }
        if (data.sentiment === "1") {
          setSentimentString("1");
          setSentiment(
            <SVG
              style={{ marginLeft: "0.3em", fontSize: "3em" }}
              src={HappySentiment}
            />
          );
        }
        if (data.sentiment === "-1") {
          setSentimentString("-1");
          setSentiment(
            <SVG
              style={{ marginLeft: "0.3em", fontSize: "3em" }}
              src={SadSentiment}
            />
          );
        }
        if (data.sentiment === "0") {
          setSentimentString("0");
          setSentiment(
            <SVG
              style={{ marginLeft: "0.3em", fontSize: "3em" }}
              src={NeutralSentiment}
            />
          );
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setSentimentString("N/A");
          setSentiment("N/A");
          console.log(error);
        }
      });
  };

  useEffect(() => {
    getPredictions();
  }, [days]);

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
  }, [finalDayPrice, sentiment]);

  useEffect(() => {
    if (cancelToken.current) {
      cancelToken.current.cancel("Component unmounted");
    }
    if (historicalData) {
      getPredictions(20);
      getSentiment();
    }
    return () => {
      if (cancelToken.current) {
        cancelToken.current.cancel("Component unmounted");
      }
    };
  }, [historicalData]);

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

  const difference = (
    ((finalDayPrice - startDayPrice) / startDayPrice) *
    100
  ).toFixed(2);
  const styleColor =
    difference < 0 ? "#fb6340" : difference > 0 ? "#2dce89" : "inherit";

  return (
    <Fragment>
      {graphData ? (
        <Fragment>
          <Typography style={{ color: "#444444" }} className={classes.Heading2}>
            {predictionName}
          </Typography>
          <Typography className={classes.Heading2}>
            {finalDayPrice ? finalDayPrice : "N/A"}
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
          <div className={classes.Heading5}>
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button color={days === 1 ? "primary" : "inherit"} onClick={() => setDays(1)}>1D</Button>
            <Button color={days === 2 ? "primary" : "inherit"} onClick={() => setDays(2)}>2D</Button>
            <Button color={days === 3 ? "primary" : "inherit"} onClick={() => setDays(3)}>3D</Button>
            <Button color={days === 5 ? "primary" : "inherit"} onClick={() => setDays(5)}>1W</Button>
            <Button color={days === 10 ? "primary" : "inherit"} onClick={() => setDays(10)}>2W</Button>
            <Button color={days === 20 ? "primary" : "inherit"} onClick={() => setDays(20)}>1M</Button>
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
