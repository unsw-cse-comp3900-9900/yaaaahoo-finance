/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef, Fragment } from "react";
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
    fontSize: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  CardItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "500px",
    margin: "1em",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
  CardImage: {
    marginBottom: "1em",
    marginTop: "1em",
    marginRight: 0,
    width: "100%",
  },
  description: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  Content: {
    display: "flex",
    flexDirection: "column",
    width: "500px",
    height: "500px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "100%",
    },
  },
}));

const TopNews = ({ title, subtitle, titleColor }) => {
  const classes = useStyles();
  const [newsData, setNewsData] = useState(null);
  const cancelToken = useRef(null);

  useEffect(() => {
    if (cancelToken.current) {
      cancelToken.current.cancel("Component unmounted");
    }
    const url = `http://newsapi.org/v2/top-headlines?category=business&country=au&apiKey=${config.newsApiToken}`;
    cancelToken.current = axios.CancelToken.source();
    axios
      .get(url, { cancelToken: cancelToken.current.token })
      .then(({ data }) => {
        setNewsData(data.articles);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      });

    return () => {
      if (cancelToken.current) {
        cancelToken.current.cancel("Component unmounted");
      }
    };
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
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {newsData &&
          newsData.map((article, index) => {
            if (!article.urlToImage) {
              return null;
            }
            return (
              <Fragment key={`article-${index}`}>
                <div className={classes.CardItem}>
                  <Card className={classes.Card}>
                    <CardContent className={classes.Content}>
                      <img
                        className={classes.CardImage}
                        src={article.urlToImage}
                      />
                      <div className={classes.description}>
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
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default TopNews;
