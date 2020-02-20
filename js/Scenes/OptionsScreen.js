//Credit Screen

// todo: load from localstorage at startup, and save when changed
var speechRecognitionEnabled = true; 

function modeOptions(frameTime) {

	//screen background
	colorRect(0, 0, canvas.width, canvas.height, "red");
	colorText("OPTIONS SCREEN", canvas.width/2, 100, "White", "50px Arial");

	if (isMouseInArea(canvas.width/2 - 100, canvas.height/2 - 20, 270, 40) && mousePressed) {
        speechRecognitionEnabled = !speechRecognitionEnabled;
        console.log("Option setting changed: Speech Recognition Enabled set to " + speechRecognitionEnabled);
        if (SpeechRecognition) // does an initialized object exist?
            SpeechRecognition.setEnabled(speechRecognitionEnabled); // tell it about the change
	}

	colorRect(canvas.width/2 - 100, canvas.height/2 - 20, 200, 40, "white");
	colorText("Speech Recognition?", canvas.width/2 , canvas.height/2 + 10 , "black", "20px Arial");

	colorRect(canvas.width/2 + 110, canvas.height/2 - 20, 50, 40, "white");
	colorText(speechRecognitionEnabled?"yes":"no", canvas.width/2 + 135, canvas.height/2 + 10 , "black", "20px Arial");

	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height/2 + 200, "white", "20px Arial");

	if (Key.isJustPressed(Key.SPACE) || Key.isJustPressed(Key.q)){
		mode = MAIN_MENU;
	}
}