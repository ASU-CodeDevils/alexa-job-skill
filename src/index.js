var Alexa = require('alexa-sdk');
var appId = 'amzn1.ask.skill.931dfa46-f79a-48ac-875d-c963fd55dfef'; //'amzn1.echo-sdk-ams.app.your-skill-id';

var states = {
    QUERYSTATE:  '_STATEMODE',
    QUERYCITY:   '_CITYMODE',
    QUERYCO:     '_COMPMODE',
    QUERYSKILL:  '_SKILLMODE',
    SEARCH:      '_SEARCHMODE',  // Look for results in JSON
    RESULT:      '_RESULTMODE'   // Build the results for the user and reply      TODO: Find a heuristics to filter data.

    };
var basicHandler = {

    'NewSessionIntent': function () {
        this.emit(':ask', 'Hi, I\'m Job Patrol; I will help you find a job wherever you want. \n' +
            'What state do you want to look for a job?');
    },

    'LaunchRequest': function () {
        this.emit('NewSessionIntent');
    },

    'SessionEndRequest' : function () {
        this.emit(':tell', 'Thanks for using Job Finder');
    },

    'YesIntent' : function () {
      this.emit(':tell', 'YesIntent')
    },

    'NoIntent' : function() {
      this.emit(':tell', 'NoIntent')
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

var stateModeHandlers =  Alexa.CreateStateHandler(states._STATEMODE, {
    // This set of handlers will deal with incorporating new data and existing data.
    'GetStateIntent': function() {
    {
        var inputState = parseString(this.event.request.intent.slots.state.value);
        this.attributes['state'] = inputState;
        console.log(inputState + " - inputState");
        this.emit(':tell','Alright we will use ' + inputState);
        }
    this.handler.state = states._CITYMODE;
    }
});

var cityModeHandlers = Alexa.CreateStateHandler(states._STATEMODE, {
  'GetCityIntent' : function() {
    if (this.handler.state === states._CITYMODE) {
      this.emit(':ask','What zip code area are you trying to find a job in?');
      var inputCity = parseString(this.event.request.intent.slots.city.value);
      this.attributes['city'] = inputCity;
      console.log(inputCity + " - inputCity");
      this.emit(':tell','I we\'ll use' + inputCity);
    }
      this.handler.state = states._SKILLMODE;
  }
});

var skillModeHandlers = Alexa.CreateStateHandler(states._SKILLMODE, {
  'GetSkillIntent' : function() {
    if (this.handler.state === states._SKILLMODE) {
        this.emit(':ask','What job type are you looking for?');
        var inputSkill = parseString(this.event.request.intent.slots.skill.value);
        this.attributes['skill'] = inputSkill;
        console.log(inputSkill + " - inputSkill");
        this.emit(':tell','Ok, we\'ll look for jobs under the name' + inputSkill);
    }
    this.handler.state = states._SEARCHMODE;
  }
});


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(basicHandler, stateModeHandlers, cityModeHandlers, skillModeHandlers, sessionHandlers);
    alexa.execute();
};
