import React, { Fragment, useState, useEffect, useRef } from "react";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";
const Summary = ({ companyData, historicalData, classes }) => {
  const [graphData, setGraphData] = useState(null);
  const lineRef = useRef(null);
  const [days, setDays] = useState(30);
  const [daysGain, setDaysGain] = useState("N/A");
  const [daysPerc, setDaysPerc] = useState("N/A");
  const [prevClose, setPrevClose] = useState("N/A");
  const [prevOpen, setPrevOpen] = useState("N/A");

  const getHistoricalData = () => {
    if (!historicalData) return;
    const formatData = [];
    let count = 1;
    for (let i = 0; i < historicalData.length - 1; i++) {
      if (count > days) break;
      count++;
      const data = {
        x: new Date(historicalData[i].date),
        y: historicalData[i].close,
      };
      formatData.push(data);
    }
    const initialData = {
      datasets: [
        {
          label: "Closing Price",
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
          data: formatData,
        },
      ],
    };
    setGraphData(initialData);
  };

  useEffect(() => {
    getHistoricalData();
  }, [days]);

  useEffect(() => {
    getHistoricalData();
    if (historicalData && historicalData.length > 0) {
      const previousClose = historicalData[0].close;
      const previousOpen = historicalData[0].open;
      setPrevOpen(previousOpen);
      setPrevClose(previousClose);
      setDaysGain((companyData.latestPrice - previousClose).toFixed(2));
      setDaysPerc(
        (
          ((companyData.latestPrice - previousClose) / previousClose) *
          100
        ).toFixed(2)
      );
    }
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

  const styleColor =
    daysGain < 0 ? "#fb6340" : daysGain > 0 ? "#2dce89" : "inherit";

  return (
    <Fragment>
      <Typography className={classes.Heading3}>
        {companyData.latestPrice || "N/A"}
      </Typography>
      <Typography style={{ color: styleColor }} className={classes.Heading4}>
        {daysGain || "N/A"} ({daysPerc || "N/A"}%)
      </Typography>
      <Typography className={classes.Heading5}>
        Previous Close: {prevClose || "N/A"}
      </Typography>
      <Typography className={classes.Heading5}>
        Open: {companyData.open || prevOpen}
      </Typography>
      {graphData ? (
        <Fragment>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button color={days === 7 ? "primary" : "inherit"} onClick={() => setDays(7)}>1W</Button>
            <Button color={days === 30 ? "primary" : "inherit"} onClick={() => setDays(30)}>1M</Button>
            <Button color={days === 92 ? "primary" : "inherit"} onClick={() => setDays(92)}>3M</Button>
            <Button color={days === 183 ? "primary" : "inherit"} onClick={() => setDays(183)}>6M</Button>
            <Button color={days === 365 ? "primary" : "inherit"} onClick={() => setDays(365)}>1Y</Button>
            <Button color={days === 1825 ? "primary" : "inherit"} onClick={() => setDays(1825)}>5Y</Button>
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

export default Summary;
