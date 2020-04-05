from flask import Flask
from flask_cors import CORS, cross_origin
from transformers import pipeline

import searchtweets
import json
import tensorflow as tf

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def home():
    return "please use an endpoint"

@app.route('/sentiment/<company>')
def sentiment(company):
    print("Getting tweets....")
    creds = searchtweets.load_credentials(filename='test.yaml')
    rule = searchtweets.gen_rule_payload(company, results_per_call=30)
    # with open('tttt.json', 'r') as j:
    #     json_results = json.loads(j.read())  

    json_results = searchtweets.collect_results(rule, max_results=30,result_stream_args=creds)
    with open('tttt.json', 'w+') as f:
        f.write('[')
        for index in range(len(json_results)):
            result = json_results[index]
            f.write(json.dumps(result))
            if index < len(json_results) - 1:
                f.write(',\n')
        f.write(']')
    

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
        print(analysis)
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
