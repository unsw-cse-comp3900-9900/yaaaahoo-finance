import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chart from 'chart.js';
import axios from "axios";
// import * as tf from '@tensorflow/tfjs';
import {Line} from 'react-chartjs-2';
import { Button } from "@material-ui/core";

// Create styling function.
const useStyles = makeStyles(theme => ({
  PageContainer: {
    display: "flex",
    flexDirection: "column", // Child elements placed in column direction
    flexGrow: 1, // fill parent's width/height
    overflowY: "auto", // scroll y axis if contents overflow height
    marginTop: "64px", // to not be covered by the navigation bar
    paddingLeft: "10em", 
    paddingRight: "10em",
    // If screen is mobile size
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em"
    }
  },
  ContentContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2em",
    width: "100%",
    minHeight: "90%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "inherit"
    }
  }
}));

var company = 'CBA';
// var days = 20;
// function setDays(setDays) {
//   days = setDays;
// }
const fetchTask = async (days) => {
  console.log("AAAAHHHHHH");
  console.log(days);
  const result = await axios.get(
    `http://localhost:8080/prediction/${days}/${company}`
  );
  console.log(result);
  return result;
};



const data = {
    // labels: ['cba', 'dsad']
    // labels: Array.from({length: 20}, () => Math.floor(Math.random() * 20)),
    datasets: [
      {
        label: company,
        lineTension: 0.1,
        backgroundColor: 'rgba(235, 82, 82,0.4)',
        borderColor: 'rgba(235, 82, 82,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(235, 82, 82,1)',
        pointBackgroundColor: '#000',
        pointBorderWidth: 1,
        // pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(235, 82, 82,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        data: []
      },
      {
        label: company + " predictions",
        // fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#000',
        pointBorderWidth: 1,
        // pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        data: getPredictions(20)
      }
    ]
  };
const options = {
  scales: {
    xAxes: [{
      type: 'linear',
      // ticks: {
      //   min: 0,
      // },
      // time: {
      //   unit: 'millisecond'
      // }
      // distribution: 'linear'
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
}

var lineRef = {};

async function getPredictions(days) {
  var rands = [];
  // fetchTask();
  // const nums = await fetchTask()['data'];
  const nums = await axios.get(
    `http://localhost:8080/prediction/${days}/${company}`
  );
  console.log(nums['data']);
  const info = nums['data']

  var predictions = [];
  var prev = [];

  console.log(info.length)
  const prev_cut = info.length * 2/3

  for(var i=0; i<info.length; i++) {
    if(i<prev_cut) {
      prev.push({
        x: i,
        y: info[i]
      })
    } else if(i == prev_cut) {
      prev.push({
        x: i,
        y: info[i]
      })
      predictions.push({
        x: i,
        y: info[i]
      })
    } else {
      predictions.push({
        x: i,
        y: info[i]
      })
    }
  }

  // for(var i=30; i<30+days;i++) {
  //   rands.push({
  //     x: i,
  //     y: info[i-30]
  //   })
  // }
  // var rands2 = []
  // for(var i=0; i<days;i++) {
  //   rands2.push({
  //     x: i,
  //     y: info[i]
  //   })
  // }
  // console.log(rands);
  // const numbers = rands;
  // data['datasets'][0]['data'] = rands2;
  // data['datasets'][1]['data'] = numbers;
  data['datasets'][0]['data'] = prev;
  data['datasets'][1]['data'] = predictions
  // console.log(data['datasets'][0]['data']);
  
  let lineChart = lineRef.chartInstance
  lineChart.update();
  // return (numbers);
};
const Page = () => {
  // Use styling function above so you can call
  // it inside your react component
  
  const classes = useStyles();
  getPredictions();
  return (
    <div className={classes.PageContainer}>
      <Button onClick={()=>getPredictions(1)}>1 day</Button>
      <Button onClick={()=>getPredictions(2)}>2 days</Button>
      <Button onClick={()=>getPredictions(3)}>3 days</Button>
      <Button onClick={()=>getPredictions(5)}>1 week</Button>
      <Button onClick={()=>getPredictions(10)}>2 weeks</Button>
      <Button onClick={()=>getPredictions(20)}>1 month</Button>
      <div className={classes.ContentContainer}>
        <Line ref = {(reference) => lineRef = reference} data={data} options={options} />
      </div>
    </div>
  );
};




export default Page;