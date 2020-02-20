//Credit Screen

function modeWinScreen(frameTime) {

	colorRect(0, 0, canvas.width, canvas.height, "blue");
	colorText("WIN SCREEN", canvas.width/2, 100, "White", "50px Arial");
	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height - 50, "white", "20px Arial");

	if (Key.isJustPressed(Key.SPACE) 
		|| Key.isJustPressed(Key.q)
		|| (isMouseInArea(0, canvas.height - 50, canvas.width, 50) && mousePressed)){
		mode = MAIN_MENU;
		map.init(canvas.width, canvas.height-UI_HEIGHT);
		startMatch();
	}
}