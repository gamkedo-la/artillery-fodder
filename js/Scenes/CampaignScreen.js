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
			numberOfPlayers = 2; // 1 enemy
			map.type = 0; // standard terrain type
			map.generateTerrain();
			weather = 0; // clear weather
			clockHour = 10; // mid morning

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
			numberOfPlayers = 3; // two enemies
			map.type = 2; // uphill terrain type
			map.generateTerrain();
			weather = 1; // rainy weather
			clockHour = 15; // mid afternoon

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[2].usesAI = true;
			arrayOfPlayers[0].x = 150;
			arrayOfPlayers[0].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[0].x);
			//angles, health, weapon inventories, etc

			mode = GAME_MODE;
			break;
		case 3:
			//startMatch() refferenced properties
			numberOfPlayers = 4; // 3 enemies
			map.type = 1; // tower terrain type
			map.generateTerrain();
			weather = 0; // clear weather 
			clockHour = 20; // night

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[2].usesAI = true;
			arrayOfPlayers[3].usesAI = true;
			arrayOfPlayers[0].x = 150;
			arrayOfPlayers[0].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[0].x);
			//angles, health, weapon inventories, etc

			mode = GAME_MODE;
			break;

	}
}