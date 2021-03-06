from flask import Flask
from flask import jsonify, request
from flask_cors import CORS, cross_origin
from transformers import pipeline

import searchtweets
import json
import tensorflow as tf
import numpy as np
import sklearn
import pandas as pd
import datetime

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def home():
    return "please use an endpoint"

def get_technical_analysis(dataset):
    dataset['MA 7'] = dataset['Close'].rolling(window=7).mean()
    dataset['MA 20'] = dataset['Close'].rolling(window=20).mean()
    dataset['MA 50'] = dataset['Close'].rolling(window=50).mean()
    dataset['MA 200'] = dataset['Close'].rolling(window=200).mean()
    dataset['EMA 20'] = dataset['Close'].ewm(span=20).mean()
    dataset['EMA 50'] = dataset['Close'].ewm(span=50).mean()
    dataset['EMA 200'] = dataset['Close'].ewm(span=200).mean()
    dataset['EMA 12'] = dataset['Close'].ewm(span=12).mean()
    dataset['EMA 26'] = dataset['Close'].ewm(span=26).mean()
    dataset['MACD'] = dataset['EMA 12'] - dataset['EMA 26']


@app.route('/prediction', methods=['POST'])
def prediction():
    days = int(request.get_json()['days'])
    x = list(reversed(request.get_json()['predictionInput']))
    model = tf.keras.models.load_model('model_{}.h5'.format(days))

    if (len(x) == 0):
        return jsonify([])

    x = pd.DataFrame(x, columns=['Close', 'Volume', 'Date'])
    lags = 100 if days >= 10 else days * 10
    get_technical_analysis(x)
    x = x[-lags:]
    dates = x['Date'].to_numpy()
    x = x.drop('Date', axis=1)
    x = x.to_numpy().reshape((1, x.shape[0], x.shape[1]))
    scaled_x = np.zeros(x.shape)
    feature_sets = x.shape[2]
    scalers = [sklearn.preprocessing.MinMaxScaler() for a in range(feature_sets)]
    for feature_num in range(feature_sets):
        scaled = scalers[feature_num].fit_transform(x[:, :, feature_num].reshape(-1, 1))
        scaled_x[:, :, feature_num] = scaled.reshape(-1)

    try:
        preds = model.predict(scaled_x)
    except Exception as e:
        return jsonify([])
    ayaya = scalers[0].inverse_transform(preds)
    previous = x[:, :, 0].reshape(-1)
    prev_dates = dates[-days * 2:]
    prev_date = datetime.date(int(dates[-1][:4]), int(dates[-1][5:7]), int(dates[-1][-2:]))
    pred_dates = []
    for i in range(1, days + 1):
        prev_date += datetime.timedelta(days=1)
        if (prev_date.weekday() >= 5):
            prev_date += datetime.timedelta(days=2)
        pred_dates.extend([prev_date.strftime('%Y-%m-%d')])
    final_dates = np.concatenate((prev_dates, pred_dates))
    final = np.concatenate((previous[-days * 2:], ayaya[0]))
    return {'prices': final.tolist(), 'dates': final_dates.tolist()}


@app.route('/sentiment', methods=['POST'])
def sentiment():
    company = request.get_json()['company']
    backup_tweets = request.get_json()['tweets']
    try:
        creds = searchtweets.load_credentials(filename='test.yaml')
        rule = searchtweets.gen_rule_payload(company, results_per_call=30)
        json_results = searchtweets.collect_results(rule, max_results=30, result_stream_args=creds)
        tweets = [tweet.all_text for tweet in json_results]
    except Exception as e:
        if len(backup_tweets) > 0:
            tweets = backup_tweets
        else:
            result = {
                "sentiment": "N/A"
            }
            return jsonify(result)

    sentiment = pipeline("sentiment-analysis")
    positive = 0
    aggregated_sentiment = 0
    for tweet in tweets:
        analysis = sentiment(tweet)
        if analysis[0]['label'] == "POSITIVE":
            positive += 1
        else:
            positive -= 1
    if positive > 0:
        aggregated_sentiment = 1
    elif positive < 0:
        aggregated_sentiment = -1
    result = {
        "sentiment": str(aggregated_sentiment),
        "tweets": tweets
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run()
