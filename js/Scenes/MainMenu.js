// Main Menu

function modeMainMenu(frameTime) {

 
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");
	drawBg(0.5,"BgTile")

	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height);
	gradient.addColorStop(0, "black");
	gradient.addColorStop(0.5, "#00000000");
	gradient.addColorStop(1, "black");
	colorRect(0, 0, canvas.width, canvas.height, gradient);



	var gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop(0, "#00000000");
	gradient.addColorStop(0.275, "#00000000");
	gradient.addColorStop(0.325, "LightGrey");
	gradient.addColorStop(0.675, "LightGrey");
	gradient.addColorStop(0.725, "#00000000");
	gradient.addColorStop(1, "#00000000");
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	canvasContext.drawImage(imageLoader.getImage("ST-MainMenu"),canvas.width/2-150,50);

	btnManager.gameButton.draw()
	btnManager.campaignButton.draw()
	btnManager.playerSelectionButton.draw()
	btnManager.weaponInventoryButton.draw()
	btnManager.terrainScreenButton.draw()
	btnManager.controlsButton.draw()
	btnManager.optionsButton.draw()
	btnManager.creditsButton.draw()





}
