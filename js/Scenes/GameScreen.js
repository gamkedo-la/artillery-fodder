

function modeGame(frameTime) {

	//Draw Sky
	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height - UI_HEIGHT);
	gradient.addColorStop(0, skyColor);
	gradient.addColorStop(1, skyColorGradient);
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	//stars 
	nightSky();
	
	//cloud movement & cycling
	for (let i=0; i<cloudPositions.length; i++) {
		let pos = cloudPositions[i];
		canvasContext.drawImage(cloudImg, pos.x, pos.y);
		pos.x += cloudSpeeds[i];

		if(pos.x >= canvas.width + 10) {
			cloudPositions[i] = {
				x: 0 - cloudImg.width,
				y: Math.floor(Math.random()*(325 - cloudImg.height))
			}
		}
	}

	//Draw ground
	map.draw();

	//draw snow particles (you can delete this, just showin off);
	particles.update(frameTime);
	particles.draw();
	
    // Draw grass/pebbles/cracks/etc
    decorations.draw();

	//Update and draw tanks
	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i].update(frameTime);
		arrayOfPlayers[i].draw(frameTime);
	}
	//Update and draw shots
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		arrayOfProjectiles[i].update(frameTime);
		arrayOfProjectiles[i].draw(frameTime);
	}
	//Update and draw explosions
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		arrayOfExplosions[i].update(frameTime);
		arrayOfExplosions[i].draw(frameTime);
	}

	//particles


	//Draw UI section
	colorRect(0, canvas.height - UI_HEIGHT, canvas.width, canvas.height, "Grey");
	colorRect(canvas.width*1/3 - 50, canvas.height - UI_HEIGHT + 20, 100, 20, "White");
	colorRect(canvas.width*2/3 - 50, canvas.height - UI_HEIGHT + 20, 100, 20, "White");
	colorRect(canvas.width*1/4 - 50, canvas.height - UI_HEIGHT + 60, 100, 20, "White");
	colorRect(canvas.width*2/4 - 50, canvas.height - UI_HEIGHT + 60, 100, 20, "White");
	colorRect(canvas.width*3/4 - 50, canvas.height - UI_HEIGHT + 60, 100, 20, "White");
	colorRect(canvas.width*3/4 - 50, canvas.height - UI_HEIGHT + 60, 100, 20, "White");
	colorText(arrayOfPlayers[playerTurn].name, canvas.width*1/3, canvas.height - UI_HEIGHT + 35, "Black", font = "15px Arial");
	colorText("Health:" + pad(Math.round(arrayOfPlayers[playerTurn].health), 3), canvas.width*2/3, canvas.height - UI_HEIGHT + 35, "Black", font = "15px Arial");
	colorText("Angle:"  + pad(Math.round(arrayOfPlayers[playerTurn].angle), 3), canvas.width*1/4, canvas.height - UI_HEIGHT + 75, "Black", font = "15px Arial");
	colorText("Power:" + pad(Math.round(arrayOfPlayers[playerTurn].power), 3), canvas.width*2/4, canvas.height - UI_HEIGHT + 75, "Black", font = "15px Arial");
	if (arrayOfPlayers[playerTurn].weaponInventory[arrayOfPlayers[playerTurn].weapon] > 0) {
		colorText(projectileNameList[arrayOfPlayers[playerTurn].weapon] + " x" + arrayOfPlayers[playerTurn].weaponInventory[arrayOfPlayers[playerTurn].weapon], 
			canvas.width*3/4, canvas.height - UI_HEIGHT + 75, "Black", font = "15px Arial");
	} else {
		colorText(projectileNameList[arrayOfPlayers[playerTurn].weapon], canvas.width*3/4, canvas.height - UI_HEIGHT + 75, "Black", font = "15px Arial");
	}

	canvasContext.drawImage(buttonImg,
		120, 0,
		20, 20,
		canvas.width*1/4 - 70, canvas.height - UI_HEIGHT + 60,
		20, 20);
	canvasContext.drawImage(buttonImg,
		140, 0,
		20, 20,
		canvas.width*1/4 + 50, canvas.height - UI_HEIGHT + 60,
		20, 20);

	canvasContext.drawImage(buttonImg,
		20, 0,
		20, 20,
		canvas.width*2/4 - 70, canvas.height - UI_HEIGHT + 60,
		20, 20);
	canvasContext.drawImage(buttonImg,
		0, 0,
		20, 20,
		canvas.width*2/4 + 50, canvas.height - UI_HEIGHT + 60,
		20, 20);

	canvasContext.drawImage(buttonImg,
		40, 0,
		20, 20,
		canvas.width*3/4 - 70, canvas.height - UI_HEIGHT + 60,
		20, 20);
	canvasContext.drawImage(buttonImg,
		60, 0,
		20, 20,
		canvas.width*3/4 + 50, canvas.height - UI_HEIGHT + 60,
		20, 20);
	

	cleanLists();
	inGameAnnoucements();
	gameClock();
	dayNight();
	skyFlickers();

	if (isMouseInArea(canvas.width*1/4 - 90, canvas.height - UI_HEIGHT + 50, 60, 60) && mousePressed) {
		arrayOfPlayers[playerTurn].angle += 45 * frameTime;
	}

	if (isMouseInArea(canvas.width*1/4 + 30, canvas.height - UI_HEIGHT + 50, 60, 60) && mousePressed) {
		arrayOfPlayers[playerTurn].angle -= 45 * frameTime;
	}

	if (isMouseInArea(canvas.width*2/4 - 90, canvas.height - UI_HEIGHT + 50, 60, 60) && mousePressed) {
		arrayOfPlayers[playerTurn].power -= 20 * frameTime;
	}

	if (isMouseInArea(canvas.width*2/4 + 30, canvas.height - UI_HEIGHT + 50, 60, 60) && mousePressed) {
		arrayOfPlayers[playerTurn].power += 20 * frameTime;
	}

	if (isMouseInArea(canvas.width*3/4 - 90, canvas.height - UI_HEIGHT + 50, 60, 60) && mouseJustPressed) {
		arrayOfPlayers[playerTurn].weapon -= 1;
		arrayOfPlayers[playerTurn].weaponIndextIncreesing = false;
	}

	if (isMouseInArea(canvas.width*3/4 + 30, canvas.height - UI_HEIGHT + 50, 60, 60) && mouseJustPressed) {
		arrayOfPlayers[playerTurn].weapon += 1;
		arrayOfPlayers[playerTurn].weaponIndextIncreesing = true;
	}

	if (isMouseInArea(0, 0, canvas.width, canvas.height - UI_HEIGHT) && mouseJustPressed) {
		arrayOfPlayers[playerTurn].fire();
	}

	if (Key.isJustPressed(Key.q)){
		mode = MAIN_MENU;
		map.init(canvas.width, canvas.height-UI_HEIGHT);
	}
	
	if (Key.isJustPressed(Key.p)){
		mode = PAUSE_SCREEN;
	}
}