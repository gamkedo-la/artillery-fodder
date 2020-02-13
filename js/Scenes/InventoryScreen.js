//Credit Screen

function modeInventory(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "purple");
	colorText("INVENTORY SCREEN", canvas.width/2, 100, "White", "50px Arial");
	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height/2 + 200, "white", "20px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = MAIN_MENU;
	}
}