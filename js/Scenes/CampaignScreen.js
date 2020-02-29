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

function startChapter(chapterNumber) {
	switch (chapterNumber) {
		case 0:
			break;
		case 1:
			//startMatch() refferenced properties
			numberOfPlayers = 2;
			map.type = 3;
			map.generateTerrain();
			weather = 0; 
			clockHour = 20;
			dayTime = false;

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[0].x = 150;
			arrayOfPlayers[0].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[0].x);
			//angles, health, weapon inventories, etc

			mode = GAME_MODE;
			break;
		case 2:
			//startMatch() refferenced properties
			numberOfPlayers = 3;
			map.type = 5;
			map.generateTerrain();
			weather = 2; 

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[0].x = 150;
			arrayOfPlayers[0].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[0].x);
			//angles, health, weapon inventories, etc

			mode = GAME_MODE;
			break;
		case 3:
			//startMatch() refferenced properties
			numberOfPlayers = 4;
			map.type = 1;
			map.generateTerrain();
			weather = 1; 

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[0].x = 150;
			arrayOfPlayers[0].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[0].x);
			//angles, health, weapon inventories, etc

			mode = GAME_MODE;
			break;

	}
}