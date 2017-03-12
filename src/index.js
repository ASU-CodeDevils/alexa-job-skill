var Alexa = require('alexa-sdk');
var http = require('http');
var AppID = "amzn1.ask.skill.fd6e06df-7335-4be7-84a7-6292055fee0b";
var baseUrl = 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?';
var states = {

    DEFAULT: 'DEFAULT MODE',
    QUERY:   'QUERY MODE',    // Ask the user what they looking for. TODO: Saae the attributes to DynamoDB
    SEARCH:  'SEARCH MODE',   // Look for results in JSON
    RESULT:  'RESULT MODE'    // Build the results for the user and reply TODO: Find a heuristics to filter data.

};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = AppID;
    alexa.registerHandlers(newSessionHandlers, defaultHandlers, queryHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    'NewSessionIntent': function () {
        this.handler.state = states.DEFAULT;
        this.emit(':ask', 'Welcome to Job Dog, What state would you like to look for a job?')
        // this.emitWithState(':ask', 'Welcome to Job Dog, What state would you like to look for a job?', true);
    },
    'WithStateIntent': function () {
        this.emit(':ask', 'Great, do you want to add a zipcode?');
    },
    'WithCityIntent': function () {
        this.emit(':ask', 'is there a job title you want to use?');
    },
    'LaunchRequest': function () {
        this.emit('NewSessionIntent');
    },
    'SessionEndRequest' : function () {
        this.emit(':tell', 'Thanks for using Job Finder');
    },
    'Unhandled' : function () {
        this.emit(':ask ', 'Please try another command');
    },
    'GetStateIntent' : function() {
          var slotValue = this.event.request.intent.slots.state.value;
          this.emit(':ask', 'so you want to work in '+ slotValue);
    }
  };

var defaultHandlers = Alexa.CreateStateHandler(states.DEFAULT, {
      'YesIntent' : function() {
        this.emit(':ask', 'was there a zip code that you wanted to work with?');
      },
      'NoIntent' : function() {
        this.emit(':ask', 'Would you like me to perform the search now?' );
        this.handler.state = states.QUERY;
      },
      'WithStateIntent': function () {
          this.emit(':ask', 'Great, do you want to add a zipcode?');
      },
      'WithCityIntent': function () {
          this.emit(':ask', 'is there a job title you want to use?');
      },
      'SessionEndRequest' : function () {
          this.emit(':tell', 'Thanks for using Job Finder');
      },
        'YesIntent' : function() {
          this.handler.state = states.QUERY;
          this.emit(':ask', 'Awesome, let me run that search for you');
      },
        'Unhandled' : function () {
          this.emit(':ask ', 'Please try another command');
      },
      'GetStateIntent' : function() {
            var slotValue = this.event.request.intent.slots.state.value;
            this.handler.state = states.QUERY;
            this.emit(':ask', 'so you want to work in Nantuket');
      }
  });

  var queryHandlers = Alexa.CreateStateHandler(states.QUERY, {
      'NoIntent' : function() {
        this.emit(':ask', 'Was there something else you wanted to add to the search parameter?');
      },
      'YesIntent' : function() {
          http.get(baseUrl, function(res){
            var body = '';

            res.on('data', function(data){
              body += data;
            });
            res.on('end', function(){
              var result = JSON.parse(body);
              this.emit(':tell', 'there are ' + result.count + ' number of results');
            });
          }).on('error', function(e){
            console.log('Error: ' + e);
          });
        },
      'DefaultIntent' : function() {
        this.emit(':tell', 'Made it to Query State');
      }
});
