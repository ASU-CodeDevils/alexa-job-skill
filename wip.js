var Alexa = require('alexa-sdk');

var states = {
    QUERY: '_QUERYSTATE',   // User is looking for information
    REPLY: '_REPLYSTATE'    // User is receiving a response
}

var handlers = {


    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello World!');
    },

    'LaunchRequest': function () {
        this.emit('HelloWorldIntent');
    },

    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello World!');
    }

};

var newSessionHandlers = {
    // This will short-cut any incoming intent or launch requests and route them to this handler.
    'NewSession': function() {
        // Check if it's the first time the skill has been invoked
        if(Object.keys(this.attributes).length === 0) {
            this.attributes['state'] = undefined;
            this.attributes['company'] = undefined;
            this.attributes['skill'] = undefined;
            this.attributes['city'] = undefined;
        }
        this.handler.state = states.QUERY;
        this.emit(':ask', 'What state would you like to look for a job in?');
    }
};

var queryModeHandler = Alexa.CreateStateHandler(states.QUERY, {

    'NewSession': function () {
        this.handler.state = '';
        this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
    },

    'NumberGuessIntent': function() {
        var guessNum = parseInt(this.event.request.intent.slots.number.value);
        var targetNum = this.attributes['guessNumber'];

        console.log('user guessed: ' + guessNum);

        if(guessNum > targetNum){
            this.emit('TooHigh', guessNum);
        } else if( guessNum < targetNum){
            this.emit('TooLow', guessNum);
        } else if (guessNum === targetNum){
            // With a callback, use the arrow function to preserve the correct 'this' context
            this.emit('JustRight', () => {
                this.emit(':ask', guessNum.toString() + 'is correct! Would you like to play a new game?',
                'Say yes to start a new game, or no to end the game.');
        });
        } else {
            this.emit('NotANum');
        }
    },

    'AMAZON.HelpIntent': function() {
        this.emit(':ask', 'I am thinking of a number between zero and one hundred, try to guess and I will tell you' +
            ' if it is higher or lower.', 'Try saying a number.');
    },

    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.attributes['endedSessionCount'] += 1;
        this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
    },

    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
    }

});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};