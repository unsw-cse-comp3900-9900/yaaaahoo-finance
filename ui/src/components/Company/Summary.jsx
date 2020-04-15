import React, { Fragment, useState, useEffect, useRef } from "react";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const Summary = ({
  companyData,
  historicalData,
  classes,
}) => {
  const [graphData, setGraphData] = useState(null);
  const lineRef = useRef(null);

  const getHistoricalData = (days) => {
      if (!historicalData) return;
    const formatData = [];
    for (let i = 0; i < historicalData.length && i < days; i++) {
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
    getHistoricalData(7);
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
  companyData.change < 0 ? "#fb6340" : companyData.change > 0 ? "#2dce89" : "inherit";

  return (
    <Fragment>
      <Typography className={classes.Heading3}>
        {companyData.latestPrice || "N/A"}
      </Typography>
      <Typography style={{ color: styleColor }} className={classes.Heading4}>
        {companyData.change || "N/A"} ({companyData.changePercent || "N/A"}%)
      </Typography>
      <Typography className={classes.Heading5}>
        Previous Close: {companyData.previousClose || "N/A"}
      </Typography>
      <Typography className={classes.Heading5}>
        Open: {companyData.open || "N/A"}
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
            <Button
              onClick={() => getHistoricalData(7)}
            >
              1W
            </Button>
            <Button
              onClick={() => getHistoricalData(30)}
            >
              1M
            </Button>
            <Button
              onClick={() => getHistoricalData(92)}
            >
              3M
            </Button>
            <Button
              onClick={() => getHistoricalData(183)}
            >
              6M
            </Button>
            <Button
              onClick={() => getHistoricalData(365)}
            >
              1Y
            </Button>
            <Button
              onClick={() => getHistoricalData(1825)}
            >
              5Y
            </Button>
          </div>
          <div style={{marginBottom: "3em"}}>
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
