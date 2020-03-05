// Main Menu

function modeMainMenu(frameTime) {

 
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");
	drawBg(0.5,"BgTile")
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
