//Credit Screen

function modeControls(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "blue");
	drawBg(0.5,"BgTileWhite")
	colorText("MOUSE CONTROLS", canvas.width/2, canvas.height/2-100, "White", "50px Arial", true);
	//colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height/2 - 50, "white", "20px Arial", true);


	btnManager.controlMouseHoverClick.draw()
	btnManager.controlLuckReflex.draw()
	btnManager.mainMenuButton.draw()

}
