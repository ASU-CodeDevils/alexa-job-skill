var Alexa = require('alexa-sdk');

var states = {
    QUERYSTATE:  '_STATEMODE',
    QUERYCITY:   '_CITYMODE',
    QUERYCO:     '_COMPMODE',
    QUERYSKILL:  '_SKILLMODE',
    SEARCH:      '_SEARCHMODE',  // Look for results in JSON
    RESULT:      '_RESULTMODE'   // Build the results for the user and reply      TODO: Find a heuristics to filter data.

    };
var handlers = {

    'NewSessionIntent': function () {
        this.emit(':ask', 'Hi, I\'m Job Patrol; I will help you find a job wherever you want. \n' +
            'What state do you want to look for a job?');
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

var newSessionHandlers = {
    // This will stop any other requests and blank out the requests

    'NewSession': function() {
        if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
            this.attributes['state']     = undefined;
            this.attributes['city']      = undefined;
            this.attributes['company']   = undefined;
            this.attributes['skill']     = undefined;
        }
        this.handler.state = states._STATEMODE;
        this.emit('NewSessionIntent');
    }

};

var sessionHandlers = {
    // This set of handlers will deal with incorporating new data and existing data.
    'GetStateIntent': function() {
        if (this.handler.state === states._STATEMODE) {
        var inputState = parseString(this.event.request.intent.slots.state.value);
        this.attributes['state'] = inputState;
        console.log(inputState + " - inputState");
        this.emit(':tell','Alright we will use ' + inputState);)
        }
    this.handler.state = states._CITYMODE;
    }
  },
  'GetCityIntent' : function() {
    if (this.handler.state === states._CITYMODE) {
      var inputState
    }
  }
}
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
