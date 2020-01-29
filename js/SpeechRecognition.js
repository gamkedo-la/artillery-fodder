// uses anyang, a 2k speech recognition api wrapper
// please see https://talater.com/annyang/ for docs
// github repo: https://github.com/TalAter/annyang

function SpeechRecognitionEngine() {
    
    // attach functions to speech regocnition results
    var commands = {

        // menu commands
        '(please) help (me)': speechCommandHelp,
        'pause': speechCommandPause,
        'start (game)': speechCommandStart,
        'play (game)': speechCommandStart,

        // synonyms for commencing your attack
        'fire (at) *deets': speechCommandFire,
        'shoot (at) *deets': speechCommandFire,
        'engage': speechCommandFire,
        'make it so': speechCommandFire,
        'attack': speechCommandFire,
        'end turn': speechCommandFire,
        'ready': speechCommandFire,
        
        // synonyms for setting the aim angle
        'set (the) aim (to) :num (degrees)': speechCommandAim,
        'aim (at) :num (degrees)': speechCommandAim,
        ':num degrees': speechCommandAim,
        'set (the) angle (to) :num (degrees)': speechCommandAim,
        'angle :num (degrees)': speechCommandAim,

        // synonyms for setting the shot power
        'set (the) power (to) :num': speechCommandPower,
        'power :num': speechCommandPower,
        ':num power': speechCommandPower,
    };

    var pendingStart = false;
    var pendingFire = false;
    
    this.pendingFireCommand = function() {
        if (pendingFire) {
            // reset now that we've told the game about it
            pendingFire = false; 
            return true;
        } else {
            return false;
        }
    }
    
    this.pendingStartCommand = function() {
        if (pendingStart) {
            // reset now that we've told the game about it
            pendingstart = false; 
            return true;
        } else {
            return false;
        }
    }

    function speechError() { // generic error including unintelligible sound
        debugSpeech("Speech recognition was unable to parse that last bit.");
    }
    
    function speechErrorNetwork() {
        debugSpeech("Speech recognition ERROR: network error (internet lag?)");
    }

    function speechErrorPermissionBlocked() {
        debugSpeech("Speech recognition ERROR: permission blocked by browser!");
    }

    function speechErrorPermissionDenied() {
        debugSpeech("Speech recognition ERROR: permission denied by user!");
    }
    
    function speechResult(guesses) {
        debugSpeech("Speech recognition RESULT:");
        debugSpeech(guesses);
    }

    function speechCommandFire(deets) {
        debugSpeech("Speech recognition command: FIRE! at " + deets);
        pendingFire = true;
    }

    function speechCommandStart() {
        debugSpeech("Speech recognition command: START GAME!");
        pendingStart = true;
    }

    function speechCommandPause() {
        debugSpeech("Speech recognition command: PAUSE!");
    }

    function speechCommandHelp() {
        debugSpeech("Speech recognition command: HELP!");
    }

    function speechCommandAim(angle) {
        debugSpeech("Speech recognition command: AIM! at " + angle);
        angle = parseInt(angle); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(angle)) {
            debugSpeech("Speech could not understand the aim angle specified, ignoring command.");
            return;
        }
        // FIXME we could accept "northwest" or "10 o'clock"
        if (angle < 0) angle = 0;
        if (angle > 360) angle = 360;
        // tell the tank to use this new value
        arrayOfPlayers[playerTurn].angle = angle;
    }

    function speechCommandPower(power) {
        debugSpeech("Speech recognition command: POWER! " + power);
        power = parseInt(power); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(power)) {
            debugSpeech("Speech could not understand the power level specified, ignoring command.");
            return;
        }
        if (power < 1) power = 1;
        if (power > 100) power = 100;
        // tell the tank to use this new value
        arrayOfPlayers[playerTurn].power = power;
    }

    function debugSpeech(txt) {
        console.log(txt);
        // maybe show it on screen
        var ele = document.getElementById('speechRecognitionDisplay');
        if (ele) ele.innerHTML = ele.innerHTML + '<br>' + txt;
    }

    this.init = function() {
        

        // init speech recognition
        if (annyang) {
            
            debugSpeech("Speech recognition is enabled!");

            // track any problems
            annyang.addCallback('error', speechError);
            annyang.addCallback('errorNetwork', speechErrorNetwork);
            annyang.addCallback('errorPermissionBlocked', speechErrorPermissionBlocked);
            annyang.addCallback('errorPermissionDenied',speechErrorPermissionDenied);

            // report ANYTHING said, not just commands above
            annyang.addCallback('result', speechResult);

            annyang.addCallback('soundstart', function() {
                debugSpeech('Speech Recognition: sound detected');
              });

            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening.
            annyang.start({ autoRestart: true, continuous: true });

        } else {
            debugSpeech("Speech recognition is NOT enabled. Check your browser permissions!");
        }
    }
};