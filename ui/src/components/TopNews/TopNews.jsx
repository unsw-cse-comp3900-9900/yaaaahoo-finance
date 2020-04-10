/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { config } from "../../config";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  Page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "90%",
    paddingTop: "2em",
    width: "100%",
  },
  Title: {
    fontSize: "2em",
    fontWeight: 500,
    color: "#2643e9",
  },
  Subtitle: {
    fontSize: "1.3em",
    marginBottom: "1em",
  },
  Card: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  CardTitle: {
    fontSize: "1.5em",
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
  },
  CardBody: {
    fontSize: "1.2em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  CardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },
  CardItem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  CardImage: {
    marginRight: "1em",
    marginBottom: "1em",
    marginTop: "1em",
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      width: "80%",
    },
  },
}));

const TopNews = ({ title, subtitle, titleColor }) => {
  const classes = useStyles();
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    // NEWS API CALL
    // To-Do: handle cancelToken when component dismounted
    const url = `http://newsapi.org/v2/top-headlines?category=business&country=au&apiKey=${config.newsApiToken}`;
    axios
      .get(url)
      .then(({ data }) => {
        setNewsData(data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.Page}>
      <Typography
        style={{ color: titleColor }}
        className={classes.Title}
        gutterBottom
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography className={classes.Subtitle} gutterBottom>
          {subtitle}
        </Typography>
      )}
      <div
        style={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {newsData &&
          newsData.map((article, index) => {
            if (!article.urlToImage) {
              return null;
            }
            return (
              <div className={classes.CardContainer} key={`article-${index}`}>
                <div className={classes.CardItem}>
                  <img className={classes.CardImage} src={article.urlToImage} />
                  <Card className={classes.Card}>
                    <CardContent>
                      <Typography gutterBottom className={classes.CardTitle}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </Typography>
                      <Typography className={classes.CardBody}>
                        {article.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopNews;
