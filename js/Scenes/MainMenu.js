// Main Menu

function modeMainMenu(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");	
	colorText("MAIN MENU", canvas.width/2 - 160, 100, "White", "50px Arial");
	colorText("Press [Space Bar] to START GAME", canvas.width/2 - 150, canvas.height/2, "Black", "20px Arial");
	colorText("Press [C] for CREDITS", canvas.width/2 - 150, canvas.height/2 + 30, "Black", "20px Arial");
	//colorText("Press [A] for CONTROLS", canvas.width/2 - 150, canvas.height/2 + 60, "Black", "20px Arial");
	//colorText("Press [T] for TERRAIN SCREEN", canvas.width/2 - 150, canvas.height/2 + 60, "Black", "20px Arial");
	//colorText("Press [P] for PLAYER SCREEN", canvas.width/2 - 150, canvas.height/2 + 60, "Black", "20px Arial");
	//colorText("Press [P] for OPTIONS", canvas.width/2 - 150, canvas.height/2 + 60, "Black", "20px Arial");
	//colorText("Press [P] for WEAPON INVENTORY", canvas.width/2 - 150, canvas.height/2 + 60, "Black", "20px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = GAME_MODE;
	}
	if (Key.isJustPressed(Key.CREDITS)){
		mode = CREDITS_SCREEN;
	}
}