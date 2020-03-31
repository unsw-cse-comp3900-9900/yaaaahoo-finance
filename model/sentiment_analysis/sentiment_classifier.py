import searchtweets
import json
from transformers import pipeline
import tensorflow as tf
# gets most recent tweets
def get_tweets(company):
    # company = "beyonce"
    print("Getting tweets....")
    creds = searchtweets.load_credentials(filename='test.yaml')
    rule = searchtweets.gen_rule_payload(company, results_per_call=100)
    json_results = searchtweets.collect_results(rule, max_results=100,result_stream_args=creds)
    with open('tttt.json', 'w+') as f:
        f.write('[')
        for index in range(len(json_results)):
            result = json_results[index]
            f.write(json.dumps(result))
            if index < len(json_results) - 1:
                f.write(',\n')
        f.write(']')
    
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
    return aggregated_sentiment