//WIN Screen

function modeWinScreen(frameTime) {
	canvasContext.drawImage (imageLoader.getImage("winScreenBackground"), 0, 0);
	//colorRect(0, 0, canvas.width, canvas.height, "blue");
	colorText("WIN SCREEN", canvas.width/2, 100, "White", "50px Arial",true);
    colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height - 50, "white", "20px Arial", true);
    
    stats.drawWinScreen();

	if (Key.isJustPressed(Key.SPACE) 
		|| Key.isJustPressed(Key.q)
		|| (isMouseInArea(0, canvas.height - 50, canvas.width, 50) && mouseJustPressed)){
        mode = MAIN_MENU;
		map.init(canvas.width, canvas.height-UI_HEIGHT);
		startMatch();
	}
}