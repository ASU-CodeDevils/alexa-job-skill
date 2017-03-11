var Alexa = require('alexa-sdk');

var states = {
    QUERY: '_QUERYMODE',    // Ask the user what they looking for. TODO: Saae the attributes to DynamoDB
    SEARCH: '_SEARCHMODE',  // Look for results in JSON
    RESULT: '_RESULTMODE'   // Build the results for the user and reply TODO: Find a heuristics to filter data.
};
var handlers = {

    'NewSessionIntent': function () {
        this.emit(':ask', 'What state would you like to look for a job? ');
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
        this.emit(':tell', 'Please try another command');
    }
    };

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};