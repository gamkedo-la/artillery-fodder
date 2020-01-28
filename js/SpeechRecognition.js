// uses anyang, a 2k speech recognition api wrapper
// please see https://talater.com/annyang/ for docs
// github repo: https://github.com/TalAter/annyang

function SpeechRecognitionEngine() {
    
    function speechError() {
        debugSpeech("Speech recognition ERROR!");
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
    }

    function speechCommandPause() {
        debugSpeech("Speech recognition command: PAUSE!");
    }

    function speechCommandHelp() {
        debugSpeech("Speech recognition command: HELP!");
    }

    function speechCommandAim(angle) {
        debugSpeech("Speech recognition command: AIM! at " + angle);
    }

    function debugSpeech(txt) {
        
        console.log(txt);
        
        // maybe show it on screen
        var ele = document.getElementById('speechRecognitionDisplay');
        if (ele) ele.innerHTML = txt;
    }

    this.init = function() {
        

        // init speech recognition
        if (annyang) {
            
            debugSpeech("Speech recognition is enabled!");

            // attach functions to speech regocnition results
            var commands = {
            'fire (at) *deets': speechCommandFire,
            'pause': speechCommandPause,
            '(please) help (me)': speechCommandHelp,
            'aim (at) :angle (degrees)': speechCommandAim
            };

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