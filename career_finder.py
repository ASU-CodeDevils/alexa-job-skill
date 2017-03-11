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
    baseUrl = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?"
    url = baseUrl + "state=arizona&city=85258"
    html = sess.get(url)
    data = json.loads(html.content.decode('utf-8'))
    return data

@ask.launch
def start_skill():
    welcome_message = "Hello there, would you like me to list the companies"
    return question(welcome_message)

@ask.intent("YesIntent")
def yes_intent():
    #result = get_company_names()
    #companies_msg = 'Here are the companies near you that are looking to hire {}'.format(result)
    bye_text = 'I am not sure why you asked me to run then , but okay...bye'
    return statement(bye_text)

@ask.intent("NoIntent")
def no_intent():
    bye_text = 'I am not sure why you asked me to run then , but okay...bye'
    return statement(bye_text)

if __name__ == '__main__':
    app.run(debug=True)
