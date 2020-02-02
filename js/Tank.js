function tankClass() {
	this.x = 400;
	this.y = 300;
	this.angle = 90;
	this.power = 75;
	this.health = 100;
	this.color = "White";
	this.name = "Player";
	this.weapon = 0;

	var w = 20;
	var h = 10;
	var xVel = 0;
	var yVel = 0;

	this.myTurn = false;
	this.active = true;

	this.update = function update(frameTime) {

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

		yVel += 90 * frameTime;
		this.x += xVel * frameTime;
		this.y += yVel * frameTime;

		if (xVel < 0.1) {xVel = 0;}
		if (yVel < 0.1) {yVel = 0;}

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
                if (Key.isJustPressed(Key.SPACE) || 
                    SpeechRecognition.pendingFireCommand()
                    ){
					var newProjectile;
					switch (this.weapon) {
						case 0:
							newProjectile = new basicShotClass();
							break;
						case 1:
							newProjectile = new threeShotClass();
							break;
						case 2:
							newProjectile = new sniperShotClass();
							break;
						case 3:
							newProjectile = new empty();
							var radians = degreesToRadians(this.angle);
							xVel += Math.cos(radians) * this.power*10;
							yVel += -Math.sin(radians) * this.power*10;
							break;
						case 4:
							newProjectile = new teleportShot();
							break;
						case 5:
							newProjectile = new basicShotClass();
							newProjectile.size = 50;
							break;
						case 6:
							newProjectile = new rollShotClass();
							break;
						case 7:
							newProjectile = new crazyBombShotClass();
							break;
					}
					newProjectile.x = this.x;
					newProjectile.y = this.y - 10;
					newProjectile.tank = this;
					newProjectile.launch(this.angle, this.power*2.65);
					arrayOfProjectiles.push(newProjectile);

					this.myTurn = false;
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
				if (Key.isJustPressed(Key.COMMA)){
					this.weapon--;
				}
				if (Key.isJustPressed(Key.PERIOD)){
					this.weapon++;
				}

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

				if (this.weapon > 7) {
					this.weapon = 0;
				} else if (this.weapon < 0) {
					this.weapon = 7;
				}
			} else {
				incrementTurn = true;
			}
		}
				//cheat code
		if (Key.isJustPressed(Key.f)){
			this.health = 0;
			//this.destroy();
		}
	}

	this.draw = function draw(frameTime) {
		colorRect(this.x-w/2, this.y-h, w, h+2, "Black");
		colorRect(this.x-w/2+1, this.y-h+1, w-2, h, this.color);
		var cannonX, cannonY, radians;
		radians = degreesToRadians(this.angle);
		cannonX = Math.cos(radians) * 10;
		cannonY = -Math.sin(radians) * 10;
		colorLine(this.x, this.y - h, this.x + cannonX, this.y + cannonY - 10, 5, "Black");
		colorLine(this.x, this.y - h, this.x + cannonX, this.y + cannonY - 10, 3, this.color);

		this.destroyedTankHeadline();
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

		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * amount * 20;
		yVel = -Math.sin(radians) * amount * 20;

		if (this.health <= 0) {
			this.destroy();
		}
	}

	this.destroy = function destroy() {
		if (this.active) {
			this.color = "Black"
			this.active = false;
			console.log("Destroy Player " + (playerTurn+2));
			destroyedHeadline = true;

		}
	}

	this.destroyedTankHeadline = function destroyedTankHeadline() {
		if(destroyedHeadline) {
			colorText(this.name + ", Destroyed!", canvas.width/2 - 200, 150, 'white', "50px Arial");
			runTimerHeadlineDestroyed ++;
			console.log ("working");

			if(runTimerHeadlineDestroyed >= 60) {
				fadeVariable -= 0.05;
			}		
			if(runTimerHeadlineDestroyed >= 180) {
				destroyedHeadline = false;
			}			
		}
	}

}