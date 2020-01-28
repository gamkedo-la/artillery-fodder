//Credit Screen

function modeCredits(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorText("CREDITS SCREEN", canvas.width/2 - 225, canvas.height/2, "White", "50px Arial");
	colorText("[Space Bar] MAIN MENU", canvas.width/2 - 150, canvas.height/2 + 200, "white", "20px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = MAIN_MENU;
	}
}