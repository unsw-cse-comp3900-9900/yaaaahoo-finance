### Requires Python 3.6 and pip >= 19.0

### ```python3.6 -m venv venv```

### ```. venv/bin/activate``` 

### ```pip install -r requirements.txt```

### ```FLASK_APP=main.py flask run --host="localhost" --port=8080```

Will run on http://localhost:8080/

### API Endpoints

#### Sentimental Analysis
```/sentiment/<company>```

``` E.g. http://localhost:8080/sentiment/Commonwealth%20Bank%20of%20Australia```
