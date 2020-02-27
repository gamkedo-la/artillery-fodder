// Main Menu




function modeMainMenu(frameTime) {




    Space_key=imageLoader.getImage("space_key")

	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");
	colorText("MAIN MENU", canvas.width/2, 100, "White", "50px Arial");



	btnManager.gameButton.draw()
	btnManager.playerSelectionButton.draw()
	btnManager.weaponInventoryButton.draw()
	btnManager.terrainScreenButton.draw()
	btnManager.controlsButton.draw()
	btnManager.optionsButton.draw()
	btnManager.creditsButton.draw()
	btnManager.campaignButton.draw()




}
