//Credit Screen

var voiceRecognition = false;
var yesNo;

function modeOptions(frameTime) {

	

	//screen background
	colorRect(0, 0, canvas.width, canvas.height, "red");
	colorText("OPTIONS SCREEN", canvas.width/2, 100, "White", "50px Arial");

	if (isMouseInArea(canvas.width/2 - 100, canvas.height/2 - 20, 270, 40) && mousePressed) {
		voiceRecognition = !voiceRecognition;
	}
	if (voiceRecognition) {
			yesNo = "Yes";
		} 
	if (voiceRecognition == false) { 
		yesNo = "No";
	}


	colorRect(canvas.width/2 - 100, canvas.height/2 - 20, 200, 40, "white");
	colorText("Voice Recognition?", canvas.width/2 , canvas.height/2 + 10 , "black", "20px Arial");

	colorRect(canvas.width/2 + 110, canvas.height/2 - 20, 50, 40, "white");
	colorText(yesNo, canvas.width/2 + 135, canvas.height/2 + 10 , "black", "20px Arial");

	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height/2 + 200, "white", "20px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = MAIN_MENU;
	}
}