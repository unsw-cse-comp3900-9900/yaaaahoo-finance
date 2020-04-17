from flask import Flask
from flask import jsonify, request
from flask_cors import CORS, cross_origin
from transformers import pipeline
from tinydb import TinyDB, Query

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

@app.route('/prediction',methods=['POST'])
def prediction():
    days = int(request.get_json()['days'])
    company = request.get_json()['company']

    if (use_backup):
        return prediction_db.get(User.companydays == company+days)['result']

    model = tf.keras.models.load_model('model_{}.h5'.format(days))
    x = request.get_json()['historicalData']
    x = pd.DataFrame(x, columns = ['Close', 'Volume'])
    lags = 100 if days >= 10 else days * 10
    
    #### TO-DO check if company is cached if historicalData is empty
    if (len(x) == 0):
        print("No historical data provided")
        return jsonify([])

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

    json_string = jsonify(final.tolist())
    sentiment_db.insert({'companydays': company+days, 'result': json_string})

    return json_string

# TO-DO: If searchtweets api limit call reached for demo company,
# read backup tweets stored for that demo company.
@app.route('/sentiment/<company>')
def sentiment(company):
    print("Getting tweets....")
    try:
        creds = searchtweets.load_credentials(filename='test.yaml')
        rule = searchtweets.gen_rule_payload(company, results_per_call=30)
        json_results = searchtweets.collect_results(rule, max_results=30,result_stream_args=creds)
    except Exception as e:
        return '{"sentiment": "N/A"}'

    ### Commented out code for backing up demo data
    # with open('tttt.json', 'r') as j:
    #     json_results = json.loads(j.read())     

    # with open('tttt.json', 'w+') as f:
    #     f.write('[')
    #     for index in range(len(json_results)):
    #         result = json_results[index]
    #         f.write(json.dumps(result))
    #         if index < len(json_results) - 1:
    #             f.write(',\n')
    #     f.write(']')
    
    # tweets = []

    # for tweet in json_results:
    #     tweet_text = None
    #     tweet_text = tweet['text']
    #     tweets.append(tweet_text)
    
    tweets = [tweet.all_text for tweet in json_results]
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
    
    json_string = '{"sentiment":"'+result+'"}'
    sentiment_db.insert({'company': company, 'result': json_string})
    
    return '{"sentiment":"'+result+'"}'

if __name__ == '__main__':
    prediction_db = TinyDB('prediction_db.json')
    sentiment_db = TinyDB('sentiment_db.json')
    User = Query()
    use_backup = input('use backup? (true/false): ')
    app.run()
