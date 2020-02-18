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
        'spacebar': speechCommandStart, // is this a bad idea? or good?
        'space bar': speechCommandStart,
        'play (game)': speechCommandStart,
        'begin (game)': speechCommandStart,

        // synonyms for commencing your attack
        'fire (at) *deets': speechCommandFire,
        'shoot (at) *deets': speechCommandFire,
        'engage': speechCommandFire,
        'make it so': speechCommandFire,
        'attack': speechCommandFire,
        'end turn': speechCommandFire,
        'ready': speechCommandFire,
        
        // relative adjustments to angle
        '(angle) (aim) plus :num (degrees)': speechCommandAimAdd,
        '(angle) (aim) add :num (degrees)': speechCommandAimAdd,
        '(turn) (rotate) right :num (degrees)': speechCommandAimAdd,
        '(turn) (rotate) clockwise :num (degrees)': speechCommandAimAdd,
        '(angle) (aim) minus :num (degrees)': speechCommandAimSubtract,
        '(angle) (aim) subtract :num (degrees)': speechCommandAimSubtract,
        '(turn) (rotate) left :num (degrees)': speechCommandAimSubtract,
        '(turn) (rotate) counterclockwise :num (degrees)': speechCommandAimSubtract,
        'right': speechCommandAimAdd,
        'left': speechCommandAimSubtract,

        // relative adjustments to power
        'power plus :num': speechCommandPowerAdd,
        'plus :num (to) power': speechCommandPowerAdd,
        'add :num (to) power': speechCommandPowerAdd,
        'increase power (by) :num': speechCommandPowerAdd,
        'power minus :num': speechCommandPowerSubtract,
        'minus :num (to) power': speechCommandPowerSubtract,
        'subtract :num (to) power': speechCommandPowerSubtract,
        'decrease power (by) :num': speechCommandPowerSubtract,
        'up': speechCommandPowerAdd,
        'down': speechCommandPowerSubtract,

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

        // weapon changing commands
        'next (weapon)': speechCommandNext,
        'previous (weapon)': speechCommandPrev,
        'weapon plus :num': speechCommandNext,
        'weapon minus :num': speechCommandNext,
        'comma': speechCommandPrev, // lol why not!
        'period': speechCommandNext,
        'change': speechCommandNext,
        'switch' : speechCommandNext,
        'weapon': speechCommandNext, // fixme? ok?
        'weapon :num': speechCommandWeapon,
        'select :num': speechCommandWeapon

        // TODO: hardcoded specific weapons eg:
        //'rain shot': speechCommandRainShot
        // FIXME: iterate through projectileNameList[] global array

    };

    var pendingStart = false;
    var pendingFire = false;
    var pendingNext = false;
    var pendingPrev = false;
    var pendingWeaponChange = false; // FIXME: unimplemented
    var pendingWeaponNumber = 0;
    
    this.pendingWeaponChange = function() {
        if (pendingWeaponChange) {
            // reset now that we've told the game about it
            pendingWeaponChange = false; 
            // FIXME
            return pendingWeaponNumber;
        } else {
            return false;
        }        
    }

    this.pendingNextCommand = function() {
        if (pendingNext) {
            // reset now that we've told the game about it
            pendingNext = false; 
            return true;
        } else {
            return false;
        }        
    }
    
    this.pendingPrevCommand = function() {
        if (pendingPrev) {
            // reset now that we've told the game about it
            pendingPrev = false; 
            return true;
        } else {
            return false;
        }        
    }

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
        //debugSpeech("Speech recognition was unable to parse that last bit.");
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
    
    // this contains ALL recorded speech guesses, match or no match
    function speechResult(guesses) {
        //debugSpeech("Speech recognition RESULT:");
        //debugSpeech(guesses);
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

    function txt2num(txt) {
        switch (txt) {
            case 'zero' : txt = 0;
            case 'one' : txt = 1;
            case 'two' : txt = 2;
            case 'to' : txt = 2;
            case 'three' : txt = 3;
            case 'four' : txt = 4;
            case 'for' : txt = 4;
            case 'five' : txt = 5;
            case 'six' : txt = 6;
            case 'seven' : txt = 7;
            case 'eight' : txt = 8;
            case 'nine' : txt = 9;
            case 'ten' : txt = 10;
        }
        return parseInt(txt);
    }

    function speechCommandNext() {
        debugSpeech("Speech recognition command: NEXT!");
        pendingNext = true;
    }

    function speechCommandPrev() {
        debugSpeech("Speech recognition command: PREV!");
        pendingPrev = true;
    }

    function speechCommandWeapon(num) {
        debugSpeech("Speech recognition command: WEAPON: " + num);
        num = txt2num(num); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(num)) {
            debugSpeech("Speech could not understand the weapon specified, ignoring command.");
            return;
        }
        pendingWeaponChange = true;
        pendingWeaponNumber = num;
        // FIXME: unimplemented, so let's advance the wepon just to do something
        pendingNext = true;
    }

    function speechCommandAim(angle) {
        
        debugSpeech("Speech recognition command: AIM! at " + angle);
        angle = txt2num(angle); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(angle)) {
            debugSpeech("Speech could not understand the aim angle specified, ignoring command.");
            return;
        }

        // edge case, sometimes we get AIM at -15 which is actually
        // the player trying to adjust decrementally
        if (angle<0) { speechCommandAimSubtract(Math.abs(angle)); return; }

        // FIXME we could accept "northwest" or "10 o'clock"
        //if (angle < 0) angle = 0;
        if (angle > 360) angle = 360;
        // tell the tank to use this new value
        arrayOfPlayers[playerTurn].angle = angle;
    }

    function speechCommandAimAdd(angle) {
        debugSpeech("Speech recognition command: AIM ADD " + angle);
        angle = txt2num(angle); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(angle)) {
            debugSpeech("Speech could not understand the aim angle specified: assuming +5");
            angle = 5;
        }
        // tell the tank to ADD this new value
        arrayOfPlayers[playerTurn].angle += angle;
        arrayOfPlayers[playerTurn].angle = arrayOfPlayers[playerTurn].angle % 360;
    }

    function speechCommandAimSubtract(angle) {
        debugSpeech("Speech recognition command: AIM SUBTRACT " + angle);
        angle = txt2num(angle); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(angle)) {
            debugSpeech("Speech could not understand the aim angle specified: assuming -5");
            angle = 5;
        }
        // tell the tank to SUBTRACT this new value
        arrayOfPlayers[playerTurn].angle -= angle;
        arrayOfPlayers[playerTurn].angle = arrayOfPlayers[playerTurn].angle % 360;
    }

    function speechCommandPower(power) {
        debugSpeech("Speech recognition command: POWER! " + power);
        power = txt2num(power); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(power)) {
            debugSpeech("Speech could not understand the power level specified, ignoring command.");
            return;
        }
        // edge case: -15 is actually meant to be relative
        if (power < 0) { speechCommandPowerSubtract(power); return; }
        
        if (power < 1) power = 1;
        if (power > 100) power = 100;
        // tell the tank to use this new value
        arrayOfPlayers[playerTurn].power = power;
    }

    function speechCommandPowerAdd(power) {
        debugSpeech("Speech recognition command: POWER ADD " + power);
        power = txt2num(power); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(power)) {
            debugSpeech("Speech could not understand the power specified, assuming +1");
            power = 1;
        }
        // tell the tank to ADD this new value
        arrayOfPlayers[playerTurn].power += power;
        if (arrayOfPlayers[playerTurn].power<1) arrayOfPlayers[playerTurn].power = 1;
        if (arrayOfPlayers[playerTurn].power>100) arrayOfPlayers[playerTurn].power = 100;
    }

    function speechCommandPowerSubtract(power) {
        debugSpeech("Speech recognition command: POWER SUBTRACT " + power);
        power = txt2num(power); // force integer just in case
        // ignore unknown numbers - just leave the angle alone
        if (isNaN(power)) {
            debugSpeech("Speech could not understand the power specified, assuming -1");
            power = 1;
        }
        // tell the tank to SUBTRACT this new value
        arrayOfPlayers[playerTurn].power -= power;
        if (arrayOfPlayers[playerTurn].power<1) arrayOfPlayers[playerTurn].power = 1;
        if (arrayOfPlayers[playerTurn].power>100) arrayOfPlayers[playerTurn].power = 100;
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

            //annyang.addCallback('soundstart', function() { debugSpeech('Speech Recognition: sound detected'); });

            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening.
            annyang.start({ autoRestart: true, continuous: true });

        } else {
            debugSpeech("Speech recognition is NOT enabled. Check your browser permissions!");
        }
    }

    this.stop = function() {
        debugSpeech("Speech recognition STOPPING.");
        annyang.abort(); // this stops the mic from being used
    }

    this.start = function() {
        debugSpeech("Speech recognition RESTARTING.");
        annyang.resume(); // resumed and turns mic back on
        // FIXME: can we get init or permission errors here?
        // probably: if the user just changed browser settings or unplugged hw?
    }

    this.setEnabled = function(yes) {
        if (yes)
            this.start();
        else
            this.stop();
    }
};