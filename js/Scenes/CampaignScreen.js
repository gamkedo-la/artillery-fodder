// Campaign Mode Screen


function modeCampaign(frameTime) {
	//title & background screen
	//colorRect(0, 0, canvas.width, canvas.height, "LightGrey");
	
	canvasContext.drawImage(imageLoader.getImage("map"),0,0);
	canvasContext.drawImage(imageLoader.getImage("ST-Campaign"),canvas.width/2-134,48);

	//campaign buttons
	btnManager.chapter01.draw()
	btnManager.chapter02.draw()
	btnManager.chapter03.draw()

	btnManager.mainMenuButton.draw()

	weaponManagement();


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
			weaponTier = 1;
			weaponInventoryMaster = [-1,2,0,-1,0,1,2,0,0,0,0,0,0,0]; // weapons available for player use 

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[1].tankSkinIndex = 14;
			arrayOfPlayers[1].targetTank = arrayOfPlayers[0];
			arrayOfPlayers[1].aiType = 2;
			buildTankSkinsSheet();
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
			weaponTier = 2;
			weaponInventoryMaster = [-1,3,2,4,2,0,0,0,0,2,2,2,0,0]; // weapons available for player use 

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[2].usesAI = true;
			arrayOfPlayers[1].tankSkinIndex = 15;
			arrayOfPlayers[2].tankSkinIndex = 15;
			arrayOfPlayers[1].targetTank = arrayOfPlayers[0];
			arrayOfPlayers[2].targetTank = arrayOfPlayers[0];
			arrayOfPlayers[1].aiType = 2;
			arrayOfPlayers[2].aiType = 2;
			arrayOfPlayers[1].angle = 135;
			arrayOfPlayers[2].angle = 135;
			buildTankSkinsSheet();
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
			weaponTier = 3;
			weaponInventoryMaster = [-1,2,2,2,2,2,2,2,2,0,0,0,2,0]; // weapons available for player use 

			startMatch();

			//startMatch() set properties
			arrayOfPlayers[0].usesAI = false;
			arrayOfPlayers[1].usesAI = true;
			arrayOfPlayers[2].usesAI = true;
			arrayOfPlayers[3].usesAI = true;
			arrayOfPlayers[1].tankSkinIndex = 13;
			arrayOfPlayers[2].tankSkinIndex = 13;
			arrayOfPlayers[3].tankSkinIndex = 17;
			arrayOfPlayers[1].targetTank = arrayOfPlayers[0];
			arrayOfPlayers[2].targetTank = arrayOfPlayers[0];
			arrayOfPlayers[3].targetTank = arrayOfPlayers[0];
			arrayOfPlayers[1].aiType = 2;
			arrayOfPlayers[2].aiType = 2;
			arrayOfPlayers[3].aiType = 2;
			arrayOfPlayers[1].angle = 135;
			arrayOfPlayers[2].angle = 135;
			arrayOfPlayers[3].angle = 135;
			buildTankSkinsSheet();
			arrayOfPlayers[0].x = 150;
			arrayOfPlayers[0].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[0].x);
			//angles, health, weapon inventories, etc

			mode = GAME_MODE;
			break;

	}
}