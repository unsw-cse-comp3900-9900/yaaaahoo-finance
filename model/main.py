from flask import Flask
from flask import jsonify, request
from flask_cors import CORS, cross_origin
from transformers import pipeline

import searchtweets
import json
import tensorflow as tf
import numpy as np
import sklearn

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def home():
    return "please use an endpoint"

@app.route('/prediction',methods=['POST'])
def prediction():
    days = int(request.get_json()['days'])
    company = request.get_json()['company']
    model = tf.keras.models.load_model('model_{}.h5'.format(days))
    x = request.get_json()['historicalData']

    #### TO-DO check if company is cached if historicalData is empty
    if (len(x) == 0):
        print("No historical data provided")
        return jsonify([])

    #### TO-DO model to accept one dimensional array (300, 1)
    try:
        preds = model.predict(x)
    except Exception as e:
        return jsonify([])
    
    ayaya = scalers[0].inverse_transform(preds)
    previous = x[:,:,0].reshape(-1)
    final = np.concatenate((previous[-days*2:], ayaya[0]))
    return jsonify(final.tolist())

# TO-DO: If searchtweets api limit call reached for demo company,
# read backup tweets stored for that demo company.
@app.route('/sentiment/<company>')
def sentiment(company):
    # print("Getting tweets....")
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
    return '{"sentiment":"'+result+'"}'

if __name__ == '__main__':
    app.run()
