//Credit Screen

function modeOptions(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "red");
	colorText("OPTIONS SCREEN", canvas.width/2, canvas.height/2, "White", "50px Arial");
	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height/2 + 200, "white", "20px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = MAIN_MENU;
	}
}