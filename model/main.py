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

@app.route('/historical/<company>', methods=['GET'])
def get_historical(company):
    print("Retrieving historical data....")
    # Get backed up data
    with open('backup_data.json', "r") as backup_data_file:
        backup_data = json.load(backup_data_file)
    if company in backup_data:
        return jsonify(backup_data[company]['historical_data'])
    else:
        return jsonify([])

@app.route('/prediction',methods=['POST'])
def prediction():
    days = int(request.get_json()['days'])
    company = request.get_json()['company']
    model = tf.keras.models.load_model('model_{}.h5'.format(days))
    x = request.get_json()['predictionInput']
    historicalData = request.get_json()['historicalData']

    # Get backed up data
    with open('backup_data.json', "r") as backup_data_file:
        backup_data = json.load(backup_data_file)
    
    if (len(x) == 0):
        print("No historical data provided, reading from backed up data")
        # Check if we have company info backed up
        if company in backup_data:
           if backup_data[company]["prediction_input"]:
               x = backup_data[company]["prediction_input"]
               print("retrieve prediction input from backed up data")
        else: return jsonify([])
    else:
        print("backed up data updated with latest historical data info")
        if company in backup_data:
            backup_data[company]["prediction_input"] = x
            backup_data[company]["historical_data"] = historicalData
        else:
            backup_data[company] = {
                "prediction_input": x,
                "historical_data": historicalData
            }
        with open('backup_data.json', 'w') as f:
            json.dump(backup_data, f)
    x = pd.DataFrame(x, columns = ['Close', 'Volume'])
    lags = 100 if days >= 10 else days * 10
    get_technical_analysis(x)
    x = x[-lags:]
    x = x.to_numpy().reshape((1, x.shape[0], x.shape[1]))
    scaled_x = np.zeros(x.shape)
    feature_sets = x.shape[2]
    scalers = [sklearn.preprocessing.MinMaxScaler() for a in range(feature_sets)]
    for feature_num in range(feature_sets):
        scaled = scalers[feature_num].fit_transform(x[:, :, feature_num].reshape(-1, 1))
        scaled_x[:,:,feature_num] = scaled.reshape(-1)

    try:
        preds = model.predict(scaled_x)
    except Exception as e:
        print(e)
        return jsonify([])
    ayaya = scalers[0].inverse_transform(preds)
    previous = x[:,:,0].reshape(-1)
    final = np.concatenate((previous[-days*2:], ayaya[0]))
    return jsonify(final.tolist())


# read backup tweets stored for that demo company.
@app.route('/sentiment/<company>')
def sentiment(company):
    # Get backed up data
    with open('backup_data.json') as backup_data_file:
        backup_data = json.loads(backup_data_file.read())
    try:
        creds = searchtweets.load_credentials(filename='test.yaml')
        rule = searchtweets.gen_rule_payload(company, results_per_call=30)
        json_results = searchtweets.collect_results(rule, max_results=30,result_stream_args=creds)
        tweets = [tweet.all_text for tweet in json_results]
    except Exception as e:
        print("429 Error, getting back up data for tweets...")
        if company in backup_data:
            if "tweets" in backup_data[company]:
                tweets = backup_data[company]["tweets"]
        else:
            return '{"sentiment": "N/A"}'
        
    print("backed up data updated with latest twitter info")
    if company in backup_data:
        backup_data[company]["tweets"] = tweets
    else:
        backup_data[company] = {
            "tweets": tweets,
        }
    with open('backup_data.json', 'w') as f:
        json.dump(backup_data, f)

    sentiment = pipeline("sentiment-analysis")
    positive = 0
    aggregated_sentiment = 0
    for tweet in tweets:
        analysis = sentiment(tweet)
        if analysis[0]['label'] == "POSITIVE":
            positive += 1
        else:
            positive -= 1
    if positive > 0: aggregated_sentiment = 1
    elif positive < 0: aggregated_sentiment = -1
    result = str(aggregated_sentiment)
    return '{"sentiment":"'+result+'"}'

if __name__ == '__main__':
    app.run()
