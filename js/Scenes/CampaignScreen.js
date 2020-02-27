// Campaign Mode Screen


function modeCampaign(frameTime) {
	//title & background screen
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");
	colorText("CAMPAIGN", canvas.width/2, 100, "White", "50px Arial");

	//campaign buttons
	btnManager.chapter01.draw()
	btnManager.chapter02.draw()
	btnManager.chapter03.draw()

	btnManager.mainMenuButton.draw()


}
