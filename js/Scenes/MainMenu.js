// Main Menu

function modeMainMenu(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");	
	colorText("MAIN MENU", canvas.width/2, 100, "White", "50px Arial");

	colorRect(canvas.width/2 - 200, canvas.height/2 - 20, 400, 27, "Blue")
	colorText("Press [Space Bar] to START GAME", canvas.width/2, canvas.height/2, "White", "20px Arial");

	colorRect(canvas.width/2 - 200, canvas.height/2 + 10, 400, 27, "Blue")
	colorText("[P]LAYER SCREEN", canvas.width/2, canvas.height/2 + 30, "White", "20px Arial");

	colorRect(canvas.width/2 - 200, canvas.height/2 + 40, 400, 27, "Blue")
	colorText("WEAPON [I]NVENTORY", canvas.width/2, canvas.height/2 + 60, "White", "20px Arial");
	
	colorRect(canvas.width/2 - 200, canvas.height/2 + 70, 400, 27, "Blue")
	colorText("[T]ERRAIN SCREEN", canvas.width/2, canvas.height/2 + 90, "White", "20px Arial");

	colorRect(canvas.width/2 - 200, canvas.height/2 + 100, 400, 27, "Blue")
	colorText("[C]ONTROLS", canvas.width/2, canvas.height/2 + 120, "White", "20px Arial");

	colorRect(canvas.width/2 - 200, canvas.height/2 + 130, 400, 27, "Blue")
	colorText("[O]PTIONS", canvas.width/2, canvas.height/2 + 150, "White", "20px Arial");

	colorRect(canvas.width/2 - 200, canvas.height/2 + 160, 400, 27, "Blue")
	colorText("C[R]EDITS", canvas.width/2, canvas.height/2 + 180, "White", "20px Arial");

	if (isMouseInArea(0, 0, canvas.width, canvas.height/2 + 7) && mousePressed) {
		mode = GAME_MODE;
		startMatch();
	}
	
	if (isMouseInArea(canvas.width/2 - 200, canvas.height/2 + 10, 400, 27) && mousePressed) {
		mode = PLAYER_SCREEN;
		populatePlayerScreen();
	}
	
	if (isMouseInArea(canvas.width/2 - 200, canvas.height/2 + 40, 400, 27) && mousePressed) {
		mode = INVENTORY_SCREEN;
		populateInventoryScreen();
	}
	
	if (isMouseInArea(canvas.width/2 - 200, canvas.height/2 + 70, 400, 27) && mousePressed) {
		mode = TERRAIN_SCREEN;
	}
	
	if (isMouseInArea(canvas.width/2 - 200, canvas.height/2 + 100, 400, 27) && mousePressed) {
		mode = CONTROLS_SCREEN;
	}
	
	if (isMouseInArea(canvas.width/2 - 200, canvas.height/2 + 130, 400, 27) && mousePressed) {
		mode = OPTIONS_SCREEN;
	}
	
	if (isMouseInArea(canvas.width/2 - 200, canvas.height/2 + 160, 400, 27) && mousePressed) {
		mode = CREDITS_SCREEN;
	}

    if (Key.isJustPressed(Key.SPACE) 
        || SpeechRecognition.pendingStartCommand()
        ){
		mode = GAME_MODE;
		startMatch();
	}
	if (Key.isJustPressed(Key.r)){
		mode = CREDITS_SCREEN;
	}
	if (Key.isJustPressed(Key.c)){
		mode = CONTROLS_SCREEN;
	}
	if (Key.isJustPressed(Key.t)){
		mode = TERRAIN_SCREEN;
	}
	if (Key.isJustPressed(Key.p)){
		mode = PLAYER_SCREEN;
		populatePlayerScreen();
	}
	if (Key.isJustPressed(Key.o)){
		mode = OPTIONS_SCREEN;
	}
	if (Key.isJustPressed(Key.i)){
		mode = INVENTORY_SCREEN;
		populateInventoryScreen();
	}
}