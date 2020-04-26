# Group Name: Yaaaahoo! Finance
A Stock Portfolio Management System

## Group Members:
- Anna Zhang: z5114663
- Anupam Chakraborty: z5197405
- Mehri Amin: z5113067
- Oscar Fan: z5114679
- Rachael Carson-Graham: z5079853

### This application requires Python 3.6, pip >= 19.0, (we recommend installing virtualenv for this), and node.js (recommended version: 12.16.2).

## How to run:
  1. Ensure all tokens have been declared in config.js (ui directory) and test.yaml (model directory). More details on tokens further below.
  
  2. Open up the model directory in a terminal. Ensure you are in a **Python3.6 environment** to use Tensorflow. If you have issues with installing the transformers package you may need to explicitly set the version to **2.4.1**. Below are the commands to run the Flask application on a **Mac OS**.
  
  ``` 
  python3.6 -m venv venv
  . venv/bin/activate
  pip install -r requirements.txt
  FLASK_APP=main.py flask run --host="localhost" --port=8080
  ```

  3. Open up the ui directory in a terminal. Ensure you have node.js installed on your computer:  https://nodejs.org/en/download/. Below are the commands to run the React application on a **Mac OS**.
  
  ``` 
  npm i
  npm start
  ```
  
  4. React application will run on localhost:3000, Flask application will run on localhost:8080.
  
## API tokens required (We provide ours, but in case you face api limits):

### React Application
Ensure in /ui/config.js file these tokens are filled:
```
export const config = {
    // NewsApi
    "newsApiToken": "",
    // AlphaVantage
    "alphaVantageApiToken" : "",
    // WorldTradingData
    "worldTradingApiToken" : "",
    // IEX
    "iexCloudApiToken" : "",
    // Firebase
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": "",
    "measurementId": ""
};
```
- https://newsapi.org/
- https://www.alphavantage.co/
- https://www.worldtradingdata.com/
- https://iexcloud.io/
- https://firebase.google.com/

### Flask Application
Ensure in /model/test.yaml file these tokens are filled:
```
---
search_tweets_api:
  account_type: premium
  endpoint: 
  consumer_key: 
  consumer_secret: 
```

- https://developer.twitter.com/en


## Screenshots
<img src="/screenshots/Landing.png" width="50%" />
<img src="/screenshots/AddHoldings.png" width="50%" />
<img src="/screenshots/RelatedNews.png" width="50%" />
<img src="/screenshots/Company.png" width="50%" />
<img src="/screenshots/Analysis.png" width="50%" />


