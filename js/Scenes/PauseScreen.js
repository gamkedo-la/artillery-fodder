//Credit Screen

var creditPosY = 200;

function modePause(frameTime) {

	colorRect(0, 0, canvas.width, canvas.height, "black");
	drawBg(0.5,"BgTileWhite")
	colorRect(0, 150, canvas.width,350, "black");
	colorText("PAUSE SCREEN", canvas.width/2, 100, "White", "50px Arial");

	//colorText("Credit Start", canvas.width/2, creditPosY, "white", "20px Arial");
	
	btnManager.unPauseButton.draw()
	btnManager.musicSlider.draw()
	btnManager.effectsSlider.draw()
	prevMode=PAUSE_SCREEN
}
