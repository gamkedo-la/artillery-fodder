//Credit Screen

var creditPosY = 200;

function modeCredits(frameTime) {

	colorRect(0, 0, canvas.width, canvas.height, "black");

	colorText("CREDITS SCREEN", canvas.width/2, 100, "White", "50px Arial");

	//colorText("Credit Start", canvas.width/2, creditPosY, "white", "20px Arial");

	btnManager.mainMenuButton.draw()
}
