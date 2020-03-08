//Control Screen

function modeControls(frameTime) {
	
	colorRect(0, 0, canvas.width, canvas.height, "blue");
	drawBg(0.5,"BgTileWhite")

	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height);
	gradient.addColorStop(0, "black");
	gradient.addColorStop(0.5, "#00000000");
	gradient.addColorStop(1, "black");
	colorRect(0, 0, canvas.width, canvas.height, gradient);
	
	colorText("CONTROLS", canvas.width/2, 100, "White", "50px Arial", true);

	
	btnManager.controlOptions.draw()

	btnManager.mainMenuButton.draw()

}
