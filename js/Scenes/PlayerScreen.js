var arrayOfPlayerBlocks = [];

function modePlayer(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "orange");
	

	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayerBlocks[i].update();
		arrayOfPlayerBlocks[i].draw();
	}

	colorRect(0, 0, canvas.width, 150, "orange");
	colorRect(0, canvas.height - 75, canvas.width, 75, "orange");
	colorText("PLAYER SCREEN", canvas.width/2, 100, "White", "50px Arial");
	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height - 50, "white", "20px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = MAIN_MENU;
	}
}

function populatePlayerScreen() {
	var numberAcross = 3;
	var yOffset = 1;
	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayerBlocks[i] =  new playerBlock(arrayOfPlayers[i]);
		arrayOfPlayerBlocks[i].x = 150 + 250*(i%3);
		arrayOfPlayerBlocks[i].y = 25 + yOffset*125;
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

	this.update = function update() {
		if (isMouseInArea(this.x - w/2 + 25, this.y +25, 25, 50) && mousePressed) {
			this.tank.tankSkinIndex -= 1;
			buildTankSkinsSheet();
		}
		if (isMouseInArea(this.x - w/2 + 50, this.y +25, 25, 50) && mousePressed) {
			this.tank.tankSkinIndex += 1;
			buildTankSkinsSheet();
		}
	}

	this.draw = function draw() {
		colorRect(this.x - w/2, this.y, w, h, "Grey");
		colorRect(this.x - w/2 + 25, this.y +25, 50, 50, "White");

		//Draw tank
		canvasContext.drawImage(tankSkinCanvas, 
			imageLookupOffset * 20, 0, 
			20, 10, 
			this.x - w/2 + 40, this.y +45,  
			20, 10);
		canvasContext.drawImage(tankSkinCanvas, 
			imageLookupOffset * 20, 10, 
			20, 10, 
			this.x - w/2 + 40, this.y +40,  
			20, 10);

		colorRect(this.x, this.y + 25, 75, 20, "White");
		colorText(this.tank.name, this.x + 37, this.y + 40, "Black", font = "15px Arial");

	}
}