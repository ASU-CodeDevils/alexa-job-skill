from flask import Flask
from flask_ask import Ask, statement, question, session
import json
import requests
import time
import unidecode

app = Flask(__name__)
ask = Ask(app, "/career_finder")

def get_company_names():
    sess = requests.Session()
    url = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?state=arizona"
    html = sess.get(url)
    data = json.loads(html.content.decode('utf-8'))
    # companies = [unidecode.unidecode(listing['data']['title']) for listing in data['data']['children']]
    # companies = '... '.join([i for i in companies])
    return data

@app.route('/')
def homepage():
    return "hi there, how ya doin?"

@ask.launch
def start_skill():
    welcome_message = "Hello there, would you like me to list the companies"
    return question(welcome_message)

@ask.intent("YesIntent")
def share_companies():
    result = get_company_names()
    # companies_msg = 'Here are the companies near you that are looking to hire'.format(result)
    return statement(result)

@ask.intent("NoIntent")
def no_intent():
    bye_text = 'I am not sure why you asked me to run then , but okay...bye'
    return statement(bye_text)

if __name__ == '__main__':
    app.run(debug=True)
