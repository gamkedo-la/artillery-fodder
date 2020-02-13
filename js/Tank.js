const WEAPON_LIST_MAX = 9
var projectileNameList = ["Basic Shot",
						  "Three Shot",
						  "Sniper Shot",
						  "Hop",
						  "Teleport Shot",
						  "Big Shot",
						  "Roller",
						  "Crazy Bomb",
						  "Meteor Clash",
						  "Rain Shot"];
var weaponInventoryMaster = [-1,//Basic Shot
							 -1,//Three Shot
							 1,//Sniper Shot
							 2,//Hop
							 2,//Teleport Shot
							 3,//Big Shot
							 3,//Roller
							 1,//Crazy Bomb
							 2, //Meteor Clash
							 1] // Rain Shot

function tankPlayerClass() {
	this.x = 400;
	this.y = 300;
	this.angle = 90;
	this.power = 75;
	this.health = 100;
	this.name = "Player";

	var w = 20;
	var h = 10;
	var xVel = 0;
	var yVel = 0;

	this.myTurn = false;
	this.active = true;

	this.tankSkinIndex = 0;
	this.color = 0;
	this.imageLookupOffset = 0;

	this.weapon = 0;
	this.weaponInventory = weaponInventoryMaster;
	var weaponIndextIncreesing = true;

	this.update = function update(frameTime) {

		//Keep tank in canvas
		if (Math.floor(this.y) >= mapHeight) {
			this.y = mapHeight;
		}
		if (this.x > canvas.width-1) {
			this.x = canvas.width-1;
			xVel = 0;
		}
		if (this.x < 0) {
			this.x = 0;
			xVel = 0;
		}

		//Dampens to zero
		if (Math.abs(xVel) < 0.1) {xVel = 0;}
		if (Math.abs(yVel) < 0.1) {yVel = 0;}

		//Physics vs ground
		var mapHeight = canvas.height - UI_HEIGHT - map.getHeightAtX(this.x);
		if (this.y < mapHeight) {
			yVel += 90 * frameTime;
			this.x += xVel * frameTime;
			this.y += yVel * frameTime;
		}else if (Math.floor(this.y) == mapHeight) {
			this.y = mapHeight;
			yVel *= -0.5;
		} else if (this.y > mapHeight) {
			this.y = mapHeight;
			xVel *= -0.5;
			yVel *= -0.5;
		}

		if (this.myTurn) {
			if (this.active) {
				//Input
                if (Key.isJustPressed(Key.SPACE) || SpeechRecognition.pendingFireCommand()){
					if(this.weaponInventory[this.weapon] != 0) {
						this.fire();
					}
				}
				if (Key.isDown(Key.LEFT)){
					this.angle += 45 * frameTime;
				}
				if (Key.isDown(Key.RIGHT)){
					this.angle -= 45 * frameTime;
				}
				if (Key.isDown(Key.UP)){
					this.power += 20 * frameTime;
				}
				if (Key.isDown(Key.DOWN)){
					this.power -= 20 * frameTime;
				}
				if (Key.isJustPressed(Key.COMMA) || SpeechRecognition.pendingPrevCommand()){
					this.weapon--;
					weaponIndextIncreesing = false;
				}
				if (Key.isJustPressed(Key.PERIOD) || SpeechRecognition.pendingNextCommand()){
					this.weapon++;
					weaponIndextIncreesing = true;
				}

				//Range checks
				if (this.angle >= 360) {
					this.angle -= 360;
				} else if (this.angle <= 0) {
					this.angle += 360;
				}

				if (this.power > 100) {
					this.power = 100;
				} else if (this.power < 1) {
					this.power = 1;
				}

				if (this.weaponInventory[this.weapon] == 0 && weaponIndextIncreesing == true) {
					this.weapon++;
				} else if (this.weaponInventory[this.weapon] == 0) {
					this.weapon--;
				}

				if (this.weapon > WEAPON_LIST_MAX) {
					this.weapon = 0;
				} else if (this.weapon < 0) {
					this.weapon = WEAPON_LIST_MAX;
				}
			} else {
				incrementTurn = true;
			}
		}
				//cheat code
		if (Key.isJustPressed(Key.f)){
			this.health = 0;
		}
	}

	this.draw = function draw(frameTime) {
		//Draw body
		canvasContext.drawImage(tankSkinCanvas, 
			this.imageLookupOffset * 20, 0, 
			20, 10, 
			this.x-w/2, this.y-h,  
			w, h);

		//Draw Cannon
		var cannonX, cannonY, radians;
		radians = degreesToRadians(this.angle);
		cannonX = Math.cos(radians) * 10;
		cannonY = -Math.sin(radians) * 10;
		canvasContext.save();
		canvasContext.translate(this.x,this.y-h);
		canvasContext.rotate(-radians);
		canvasContext.drawImage(tankSkinCanvas, 
			this.imageLookupOffset * 20, 10, 
			20, 10, 
			-w/2, -h/2,  
			w, h);
		canvasContext.restore();
	}

	this.isPointColliding = function isPointColliding(x, y) {
		if (x >= this.x - w/2 && x <= this.x + w/2 &&
			y >= this.y - h && y <= this.y) {
			return true;
		} else {
			return false;
		}
	}

	this.takeDamage = function takeDamage(amount, angle = 270) {
		this.health -= amount;

		//Kick
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * amount;
		yVel = -Math.sin(radians) * amount;

		soundHit.play();

		if (this.health <= 0) {
			this.destroy();
		}
	}

	this.destroy = function destroy() {
		if (this.active) {
			this.active = false;
			buildTankSkinsSheet();
			console.log("Destroyed " + this.name);
			destroyedHeadline = true;

		}
	}

	this.fire = function fire() {
		var newProjectile;
		switch (this.weapon) {
			case 0://Basic Shot
				newProjectile = new basicShotClass();
				break;
			case 1://Three Shot
				newProjectile = new threeShotClass();
				break;
			case 2://Sniper Shot
				newProjectile = new sniperShotClass();
				break;
			case 3://Hop
				newProjectile = new empty();
				var radians = degreesToRadians(this.angle);
				xVel += Math.cos(radians) * this.power;
				yVel += -Math.sin(radians) * this.power;
				this.y -= 1;
				break;
			case 4://Teleport Shot
				newProjectile = new teleportShot();
				break;
			case 5://Big Shot
				newProjectile = new basicShotClass();
				newProjectile.size = 50;
				break;
			case 6://Roller
				newProjectile = new rollShotClass();
				break;
			case 7://Crazy Bomb
				newProjectile = new crazyBombShotClass();
				break;
			case 8://Meteor Clash
				newProjectile = new meteorClashClass();
				break;
			case 9://Rain Shot
				newProjectile = new rainShot();
				break;
		}

		this.weaponInventory[this.weapon] -= 1;

		newProjectile.x = this.x;
		newProjectile.y = this.y - 10;
		newProjectile.tank = this;
		newProjectile.launch(this.angle, this.power*2.65);
		arrayOfProjectiles.push(newProjectile);

		soundFire.play();

		this.myTurn = false;
	}

}

function tankDummyClass() {
	this.x = 400;
	this.y = 300;
	this.angle = 90;
	this.power = 75;
	this.health = 100;
	this.name = "Player";

	var w = 20;
	var h = 10;
	var xVel = 0;
	var yVel = 0;

	this.myTurn = false;
	this.active = true;

	this.tankSkinIndex = 0;
	this.color = 0;
	this.imageLookupOffset = 0;

	this.weapon = 0;
	this.weaponInventory = weaponInventoryMaster;

	var countDown = 2;

	this.update = function update(frameTime) {

		//Keep tank in canvas
		if (Math.floor(this.y) >= mapHeight) {
			this.y = mapHeight;
		}
		if (this.x > canvas.width-1) {
			this.x = canvas.width-1;
			xVel = 0;
		}
		if (this.x < 0) {
			this.x = 0;
			xVel = 0;
		}

		//Dampens to zero
		if (Math.abs(xVel) < 0.1) {xVel = 0;}
		if (Math.abs(yVel) < 0.1) {yVel = 0;}

		//Physics vs ground
		var mapHeight = canvas.height - UI_HEIGHT - map.getHeightAtX(this.x);
		if (this.y < mapHeight) {
			yVel += 90 * frameTime;
			this.x += xVel * frameTime;
			this.y += yVel * frameTime;
		}else if (Math.floor(this.y) == mapHeight) {
			this.y = mapHeight;
			yVel *= -0.5;
		} else if (this.y > mapHeight) {
			this.y = mapHeight;
			xVel *= -0.5;
			yVel *= -0.5;
		}

		if (this.myTurn) {
			if (this.active) {
				if (countDown <= 0) {
					countDown = 2;
					this.fire();
				} else {
					countDown -= frameTime;
				}
			} else {
				incrementTurn = true;
			}
		}
				//cheat code
		if (Key.isJustPressed(Key.f)){
			this.health = 0;
		}
	}

	this.draw = function draw(frameTime) {
		//Draw body
		canvasContext.drawImage(tankSkinCanvas, 
			this.imageLookupOffset * 20, 0, 
			20, 10, 
			this.x-w/2, this.y-h,  
			w, h);

		//Draw Cannon
		var cannonX, cannonY, radians;
		radians = degreesToRadians(this.angle);
		cannonX = Math.cos(radians) * 10;
		cannonY = -Math.sin(radians) * 10;
		canvasContext.save();
		canvasContext.translate(this.x,this.y-h);
		canvasContext.rotate(-radians);
		canvasContext.drawImage(tankSkinCanvas, 
			this.imageLookupOffset * 20, 10, 
			20, 10, 
			-w/2, -h/2,  
			w, h);
		canvasContext.restore();
	}

	this.isPointColliding = function isPointColliding(x, y) {
		if (x >= this.x - w/2 && x <= this.x + w/2 &&
			y >= this.y - h && y <= this.y) {
			return true;
		} else {
			return false;
		}
	}

	this.takeDamage = function takeDamage(amount, angle = 270) {
		this.health -= amount;

		//Kick
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * amount;
		yVel = -Math.sin(radians) * amount;

		soundHit.play();

		if (this.health <= 0) {
			this.destroy();
		}
	}

	this.destroy = function destroy() {
		if (this.active) {
			this.active = false;
			buildTankSkinsSheet();
			console.log("Destroyed " + this.name);
			destroyedHeadline = true;

		}
	}

	this.fire = function fire() {
		this.myTurn = false;
	}

}