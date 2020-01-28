//Credit Screen

function modeCredits(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorText("CREDITS SCREEN", canvas.width/2 - 225, canvas.height/2, "White", "50px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = GAME_MODE;
	}
	if (Key.isJustPressed(Key.t)){
		mode = TITLE_SCREEN;
	}
}