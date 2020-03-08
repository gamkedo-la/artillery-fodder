//Credit Screen

// todo: load from localstorage at startup, and save when changed
var speechRecognitionEnabled = false;

function modeOptions(frameTime) {

	//screen background
	
	colorRect(0, 0, canvas.width, canvas.height, "Darkred");
	drawBg(0.5,"BgTileWhite")

	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height);
	gradient.addColorStop(0, "black");
	gradient.addColorStop(0.2, "#00000000");
	gradient.addColorStop(0.9, "#00000000");
	gradient.addColorStop(1, "black");
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	//colorRect(0, 150, canvas.width,350, "Darkred");
	gradient = canvasContext.createLinearGradient(0,150,0,500);
	gradient.addColorStop(0,  "#00000000");
	gradient.addColorStop(0.1,"#8B0000FF");
	gradient.addColorStop(0.9,"#8B0000FF");
	gradient.addColorStop(1,  "#00000000");
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	canvasContext.drawImage(imageLoader.getImage("ST-Audio"),canvas.width/2-85,42);
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



	//toggle button
	speechRecognitionEnabled=btnManager.speechToggle.getValue()
	//console.log(speechRecognitionEnabled)
	
	
	

	btnManager.mainMenuButton.draw()
	btnManager.musicSlider.draw()
	btnManager.effectsSlider.draw()
	btnManager.speechToggle.draw()
}
