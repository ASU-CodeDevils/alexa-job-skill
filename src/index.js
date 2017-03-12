var Alexa = require('alexa-sdk');

var states = {
    QUERY: '_QUERYMODE',    // Ask the user what they looking for. TODO: Saae the attributes to DynamoDB
    SEARCH: '_SEARCHMODE',  // Look for results in JSON
    RESULT: '_RESULTMODE'   // Build the results for the user and reply TODO: Find a heuristics to filter data.
};


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};


var handlers = {

    'NewSessionIntent': function () {
        this.emit(':ask', 'Welcome to Job Dog, What state would you like to look for a job?');
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
    'PizzaBox' : function () {
        this.emit(':tell', 'Ren is a bully');
    },
    'GetStateIntent' : function() {
          var slotValue = this.event.request.intent.slots.state.value;
          this.emit(':ask', 'so you want to work in '+ slotValue);
    }
    };
