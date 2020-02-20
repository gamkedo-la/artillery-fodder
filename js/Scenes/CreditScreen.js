//Credit Screen

var creditPosY = 200;

function modeCredits(frameTime) {

	colorRect(0, 0, canvas.width, canvas.height, "black");

	colorText("CREDITS SCREEN", canvas.width/2, 100, "White", "50px Arial");

	//colorText("Credit Start", canvas.width/2, creditPosY, "white", "20px Arial");

	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height - 50, "white", "20px Arial");


	if (Key.isJustPressed(Key.SPACE) 
		|| Key.isJustPressed(Key.q)
		|| (isMouseInArea(0, canvas.height - 50, canvas.width, 50) && mouseJustPressed)){
		mode = MAIN_MENU;
	}
}
