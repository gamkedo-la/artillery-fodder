// Main Menu

function modeMainMenu(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");	
	colorText("MAIN MENU", canvas.width/2, 100, "White", "50px Arial");

	colorText("Press [Space Bar] to START GAME", canvas.width/2, canvas.height/2, "Black", "20px Arial");

	colorText("Press [P] for PLAYER SCREEN", canvas.width/2, canvas.height/2 + 30, "Black", "20px Arial");

	colorText("Press [I] for WEAPON INVENTORY", canvas.width/2, canvas.height/2 + 60, "Black", "20px Arial");
	
	colorText("Press [T] for TERRAIN SCREEN", canvas.width/2, canvas.height/2 + 90, "Black", "20px Arial");

	colorText("Press [C] for CONTROLS", canvas.width/2, canvas.height/2 + 120, "Black", "20px Arial");

	colorText("Press [O] for OPTIONS", canvas.width/2, canvas.height/2 + 150, "Black", "20px Arial");

	colorText("Press [R] for CREDITS", canvas.width/2, canvas.height/2 + 180, "Black", "20px Arial");

    if (Key.isJustPressed(Key.SPACE) 
        || SpeechRecognition.pendingStartCommand()
        || mousePressed
        ){
		mode = GAME_MODE;
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
	}
	if (Key.isJustPressed(Key.o)){
		mode = OPTIONS_SCREEN;
	}
	if (Key.isJustPressed(Key.i)){
		mode = INVENTORY_SCREEN;
	}
	//eliminate G shortcut after implementing win conditions and screen
	if (Key.isJustPressed(Key.g)){
		mode = WIN_SCREEN;
	}
}