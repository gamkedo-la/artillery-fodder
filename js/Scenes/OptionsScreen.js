//Credit Screen

// todo: load from localstorage at startup, and save when changed
var speechRecognitionEnabled = false;

function modeOptions(frameTime) {

	//screen background
	colorRect(0, 0, canvas.width, canvas.height, "Darkred");

/*
    // if we JUST pressed the mouse button, maybe create or toggle existing speech recognition
    if (isMouseInArea(canvas.width/2 - 100, canvas.height/2 - 20, 270, 40) && mouseJustPressed) {
        speechRecognitionEnabled = !speechRecognitionEnabled;
        console.log("Option setting changed: Speech Recognition Enabled set to " + speechRecognitionEnabled);
        if (SpeechRecognition != null) { // does an initialized object exist?
            SpeechRecognition.setEnabled(speechRecognitionEnabled); // tell it about the change
        } else if (speechRecognitionEnabled && SpeechRecognition == null) {
        	SpeechRecognition = new SpeechRecognitionEngine(); // create a new one now! 
        	SpeechRecognition.init(); // ask permission for mic input of game actions
        }
	}

	colorRect(canvas.width/2 - 100, canvas.height/2 - 20, 200, 40, "white");
	colorText("Speech Recognition?", canvas.width/2 , canvas.height/2 + 10 , "black", "20px Arial");

	colorRect(canvas.width/2 + 110, canvas.height/2 - 20, 50, 40, "white");
	colorText(speechRecognitionEnabled?"yes":"no", canvas.width/2 + 135, canvas.height/2 + 10 , "black", "20px Arial");
*/
	btnManager.mainMenuButton.draw()
	btnManager.musicSlider.draw()
	btnManager.effectsSlider.draw()

}
