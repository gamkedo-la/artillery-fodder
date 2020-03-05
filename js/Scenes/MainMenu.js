// Main Menu

function modeMainMenu(frameTime) {

 
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");
	drawBg(0.5,"BgTile")

	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height);
	gradient.addColorStop(0, "black");
	gradient.addColorStop(0.5, "#00000000");
	gradient.addColorStop(1, "black");
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	colorRect(300, 0, 200, canvas.height, "LightGrey");
	colorText("MAIN MENU", canvas.width/2, 100, "White", "50px Arial", true);

	btnManager.gameButton.draw()
	btnManager.campaignButton.draw()
	btnManager.playerSelectionButton.draw()
	btnManager.weaponInventoryButton.draw()
	btnManager.terrainScreenButton.draw()
	btnManager.controlsButton.draw()
	btnManager.optionsButton.draw()
	btnManager.creditsButton.draw()





}
