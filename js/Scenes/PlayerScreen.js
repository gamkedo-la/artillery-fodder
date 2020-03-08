const MAX_SKIN = 9;

var arrayOfPlayerBlocks = [];
var page = 0;

var playerTypeIndex = ["Human",
					   "Computer 1",
					   "Computer 2",
					   "Computer 3"]

function modePlayer(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "orange");
	
	drawBg(0.5,"BgTile")  // draw BG

	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height);
	gradient.addColorStop(0, "black");
	gradient.addColorStop(0.5, "#00000000");
	gradient.addColorStop(1, "black");
	colorRect(0, 0, canvas.width, canvas.height, gradient);
	
	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayerBlocks[i].update();
		arrayOfPlayerBlocks[i].draw();
	}

	//Titles
	//colorRect(0, 0, canvas.width, 150, "orange");
	//colorRect(0, canvas.height - 75, canvas.width, 75, "orange");
	
	colorText("PLAYER SELECTION", canvas.width/2, 100, "White", "50px Arial");


	//Player numbers buttons
	colorRect(canvas.width - 70, 120, 60, 20, "White");
	colorText(numberOfPlayers, canvas.width - 40,135, "Black", font = "15px Arial")
	canvasContext.drawImage(buttonImg,
		0, 0,
		20, 20,
		canvas.width - 30, 120,
		20, 20);
	canvasContext.drawImage(buttonImg,
		20, 0,
		20, 20,
		canvas.width - 70, 120,
		20, 20);
	//Page buttons
	colorRect(canvas.width - 70, canvas.height - 75, 60, 20, "White");
	colorText(page, canvas.width - 40,canvas.height - 60, "Black", font = "15px Arial")
	canvasContext.drawImage(buttonImg,
		60, 0,
		20, 20,
		canvas.width - 30, canvas.height - 75,
		20, 20);
	canvasContext.drawImage(buttonImg,
		40, 0,
		20, 20,
		canvas.width - 70, canvas.height - 75,
		20, 20);


	//Subtract players
	if (isMouseInArea(canvas.width - 70, 120, 30, 20) && mouseJustPressed) {
		numberOfPlayers -= 1;
		if (numberOfPlayers <= 1) {
			numberOfPlayers = 2;
		}
		changePage()
	}

	//Add players
	if (isMouseInArea(canvas.width - 40, 120, 30, 20) && mouseJustPressed) {
		numberOfPlayers += 1;

		if (arrayOfPlayers[numberOfPlayers-1] == null) {
			var newTank = new tankPlayerClass();

			newTank.name = "Player " + pad(i+1, 2);
			newTank.x = lerp(0, canvas.width, (i+1)/(numberOfPlayers+1));
			newTank.y = canvas.height - UI_HEIGHT - map.getHeightAtX(newTank.x);
			newTank.angle = lerp(45, 135, i/(numberOfPlayers-1));
			newTank.color = rndFloat(359);
			newTank.tankSkinIndex = rndInt(0, MAX_SKIN);
			newTank.imageLookupOffset = numberOfPlayers - 1;

			arrayOfPlayers.push(newTank);
			populatePlayerScreen();
			buildTankSkinsSheet();
		}
	}

	//Subtract page
	if (isMouseInArea(canvas.width - 70, canvas.height - 75, 30, 20) && mouseJustPressed) {
		page--;
		changePage();
	}
	//Add page
	if (isMouseInArea(canvas.width - 40, canvas.height - 75, 30, 20) && mouseJustPressed) {
		page++;
		changePage();
	}

	btnManager.mainMenuButton.draw()
}

function populatePlayerScreen() {
	var numberAcross = 3;
	var yOffset = 1;
	for (var i = 0; i < numberOfPlayers; i++) {
		if (arrayOfPlayerBlocks[i] == null) {
			arrayOfPlayerBlocks[i] =  new playerBlock(arrayOfPlayers[i]);
		}
		arrayOfPlayerBlocks[i].x = 150 + 250*(i%3);
		arrayOfPlayerBlocks[i].y = 25 + yOffset*125 - page*125*3;
		if (i%3 == 2) {
			yOffset += 1;
		}
	}
}

function changePage() {
	if (page < 0) {
		page = 0;
	} else if (page > Math.floor((numberOfPlayers-1)/9)) {
		page = Math.floor((numberOfPlayers-1)/9);
	}
	var yOffset = 1;
	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayerBlocks[i].y = 25 + yOffset*125 - page*125*3;
		if (i%3 == 2) {
			yOffset += 1;
		}
	}
}

function playerBlock(tankClass) {
	this.x = 0;
	this.y = 0;
	this.tank = tankClass;

	var w = 200;
	var h = 100;

	var name = this.tank.name;
	var color = this.tank.color;
	var tankSkinIndex = this.tank.tankSkinIndex;
	var imageLookupOffset = this.tank.imageLookupOffset;
	var playerType = 0;

	this.update = function update() {

		if (isMouseInArea(this.x - w/2 + 25, this.y +25, 25, 50) && mouseJustPressed) {
			this.tank.tankSkinIndex -= 1;
			if (this.tank.tankSkinIndex < 0) this.tank.tankSkinIndex = MAX_SKIN;
			buildTankSkinsSheet();
		}

		if (isMouseInArea(this.x - w/2 + 50, this.y +25, 25, 50) && mouseJustPressed) {
			this.tank.tankSkinIndex += 1;
			if (this.tank.tankSkinIndex > MAX_SKIN) this.tank.tankSkinIndex = 0;
			buildTankSkinsSheet();
		}

		if (isMouseInArea(this.x, this.y + 40, 75, 20) && mouseJustPressed) {
			color = (mouseX - this.x) * 4.8;
			this.tank.color = color;
			buildTankSkinsSheet();
		}

		if (isMouseInArea(this.x, this.y + 65, 36, 20) && mouseJustPressed) {
			playerType--;
			if (playerType < 0) {
				playerType = playerTypeIndex.length-1;
			}
			this.setNewPlayerType();
		}

		if (isMouseInArea(this.x + 37, this.y + 65, 36, 20) && mouseJustPressed) {
			playerType++;
			if (playerType >= playerTypeIndex.length) {
				playerType = 0;
			}
			this.setNewPlayerType();
		}
	}

	this.draw = function draw() {
		colorRect(this.x - w/2, this.y, w, h, "Grey");
		colorRect(this.x - w/2 + 25, this.y +25, 50, 50, "White");

		//Draw tank
		canvasContext.drawImage(tankSkinCanvas,
			imageLookupOffset * 30, 20,
			30, 20,
			this.x - w/2 + 25, this.y + 40,
			50, 34);
		var radians;
		radians = degreesToRadians(playerScreenWave);
		canvasContext.save();
		canvasContext.translate(this.x - 50, this.y + 50);
		canvasContext.rotate(-radians);
		canvasContext.drawImage(tankSkinCanvas,
			imageLookupOffset * 30, 40,
			30, 20,
			-25, -17,
			50, 34);
		canvasContext.restore();

		colorRect(this.x, this.y + 15, 75, 20, "White");
		colorText(this.tank.name, this.x + 37, this.y + 30, "Black", "15px Arial");

		colorRect(this.x, this.y + 40, 75, 20, "White");
		colorText("Color", this.x + 37, this.y + 55, "Black", "15px Arial");

		colorRect(this.x, this.y + 65, 75, 20, "White");
		colorText(playerTypeIndex[playerType], this.x + 37, this.y + 80, "Black", "15px Arial");
	}

	this.setNewPlayerType = function() {
		var newTank = new tankPlayerClass();
        newTank.name = name;
		newTank.color = color;
		newTank.tankSkinIndex = tankSkinIndex;
		newTank.imageLookupOffset = imageLookupOffset;
        
        arrayOfPlayers[imageLookupOffset] = newTank;
        this.tank = newTank;
        
        switch (playerType) {
			case 0:
				arrayOfPlayers[imageLookupOffset].usesAI = false;
				break;
			case 1:
				arrayOfPlayers[imageLookupOffset].usesAI = true;
				arrayOfPlayers[imageLookupOffset].aiType = 0;
				break;
			case 2:
				arrayOfPlayers[imageLookupOffset].usesAI = true;
				arrayOfPlayers[imageLookupOffset].aiType = 1;
				break;
			case 3:
				arrayOfPlayers[imageLookupOffset].usesAI = true;
				arrayOfPlayers[imageLookupOffset].aiType = 2;
				break;
		}
	}
}
