function empty() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {
			this.active = false;
			incrementTurn = true;
		}
	}

	this.draw = function draw(frameTime) {
		return;
	}

	this.launch = function launch(angle, power) {
		this.active = true;
		incrementTurn = true;
	}

	this.hit = function hit() {
		return;
	}
}

function basicShotClass() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	this.active = false;
	this.tail = true;

	this.update = function update(frameTime) {
		if (this.active) {
			yVel += 90 * frameTime;

			this.x += xVel * frameTime;
			this.y += yVel * frameTime;

			if (this.tail) {
				let splodes = 2;
				while(--splodes){
					particles.spawn(this.x, this.y, rndFloat(-5,5), rndFloat(-10,-20), 2, 2, 40, 0 )
				}
			}

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				this.hit();
			} else if (this.y >= canvas.height - UI_HEIGHT) {
				this.hit();
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Gray");
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		this.active = false;

		var newExplosion = new basicExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = this.damage;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		newExplosion.particles = this.tail;
		arrayOfTemporaryObjects.push(newExplosion);

		incrementTurn = true;
	}
}

function multiShotClass() {
  this.x = 0;
  this.y = 0;
  this.size = 10;
  this.damage = 10;
  this.tank;
  this.numberOfShots = 3;
  this.distanceBetweenShots = 5;
  this.active = false;

  this.update = function update(frameTime) {
	if (this.active) {
	  this.active = false;
	}
  }

  this.draw = function draw(frameTime) {
	return;
  }

  this.launch = function launch(angle, power) {
	for (let i=0; i<this.numberOfShots; i++) {
	  let projectile = new basicShotClass();
	  projectile.x = this.x;
	  projectile.y = this.y;
	  projectile.size = this.size;
	  projectile.tank = this.tank;
	  let offsetAngle = angle - this.distanceBetweenShots*(this.numberOfShots - i);
	  projectile.launch(offsetAngle, power);
	  arrayOfTemporaryObjects.push(projectile);
	}
  }
}

function sniperShotClass() {
	this.x = 0;
	this.y = 0;
	this.size = 0;
	this.damage = 50;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {
			yVel += 90 * frameTime;

			this.x += xVel * frameTime;
			this.y += yVel * frameTime;

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						var angle = angleBetween2Points(this, this.tank);
						arrayOfPlayers[i].takeDamage(this.damage, angle);
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				this.hit();
			} else if (this.y >= canvas.height - UI_HEIGHT) {
				this.hit();
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 1, "Black");
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		incrementTurn = true;
		this.active = false;
	}
}

function teleportShot() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {
			yVel += 90 * frameTime;

			this.x += xVel * frameTime;
			this.y += yVel * frameTime;

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						var xNew = arrayOfPlayers[i].x;
						var yNew = arrayOfPlayers[i].y;

						arrayOfPlayers[i].x = this.tank.x;
						arrayOfPlayers[i].y = this.tank.y;

						this.active = false;
						incrementTurn = true;

						this.tank.x = xNew;
						this.tank.y = yNew;
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				this.hit();
			} else if (this.y >= canvas.height - UI_HEIGHT) {
				this.hit();
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Blue");
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		this.active = false;
		incrementTurn = true;

		this.tank.x = this.x;
		this.tank.y = this.y;
	}
}

function rollShotClass() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;
	var grounded = false;

	this.active = false;
	this.coundDown = 2;
	this.speed = 30;

	this.update = function update(frameTime) {
		if (this.active) {
			if (!grounded) {
				yVel += 90 * frameTime;

				this.x += xVel * frameTime;
				this.y += yVel * frameTime;
			} else {
				if (this.coundDown <= 0) {
					this.hit();
				}

				if (xVel >= 0) {
					this.x += this.speed * frameTime;
					this.y = canvas.height - UI_HEIGHT - map.getHeightAtX(this.x);
					this.coundDown -= frameTime;
				} else if (xVel < 0) {
					this.x -= this.speed * frameTime;
					this.y = canvas.height - UI_HEIGHT - map.getHeightAtX(this.x);
					this.coundDown -= frameTime;
				}
			}

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				grounded = true;
			} else if (this.y >= canvas.height - UI_HEIGHT) {
				grounded = true;
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Black");
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		this.active = false;

		var newExplosion = new basicExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = this.damage;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		arrayOfTemporaryObjects.push(newExplosion);

		incrementTurn = true;
	}
}

function crazyBombShotClass() {
	this.x = 0;
	this.y = 0;
	this.size = 30;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {
			yVel += 90 * frameTime;

			this.x += xVel * frameTime;
			this.y += yVel * frameTime;

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				this.hit();
			} else if (this.y >= canvas.height - UI_HEIGHT) {
				this.hit();
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Black");
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		this.active = false;

		var newExplosion = new multiExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = this.damage;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		arrayOfTemporaryObjects.push(newExplosion);

		incrementTurn = true;
	}
}

function meteorClashClass() {

	this.x = 0;
	this.y = 0;
	this.size = 30;
	this.damage = 30;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	var afterImageX;
	var afterImageY;
	
	var sonicboom = false;
	var sonicboomRadius = 2;
	var sonicboomFade = 1.0;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {

			yVel += 90 * frameTime;

			this.x += xVel * frameTime;
			this.y += yVel * frameTime;

			if (sonicboom == false && yVel >= 0) {
			    afterImageX = this.x;
			    afterImageY = this.y;
			    sonicboom = true;
			}

			if(yVel >= -1) {
				this.y +=8;
			}
			
			sonicboomExplosion();

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				this.hit();
			} else if (this.y >= canvas.height - UI_HEIGHT) {
				this.hit();
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	function sonicboomExplosion () {
		if(sonicboom) {	

			sonicboomRadius += 2;
			sonicboomFade -= 0.04;

			colorEmptyCircle(afterImageX, afterImageY, sonicboomRadius, `rgba(0, 0, 0, ${sonicboomFade})`);
		}
	}


	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Black");
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		this.active = false;

		var newExplosion = new basicExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = this.damage;
		newExplosion.color = "Black";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		arrayOfTemporaryObjects.push(newExplosion);

		skyFlickersNow = true;
		incrementTurn = true;
	}
}

function rainShot() {
	this.x = 0;
	this.y = 0;
	this.size = 10;
	this.damage = 1;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	const MAX_RAINSHOT = 100;
	const SHOT_DELTA = 30;

	this.active = true;
	this.tail = false;

	this.update = function update(frameTime) {
		if (this.active) {

			yVel += 90 * frameTime;

			for (var i = 0; i < MAX_RAINSHOT; i++) {
				this.x += xVel * frameTime;
				this.y += yVel * frameTime;
			}

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				this.hit();
			} else if (this.y >= canvas.height - UI_HEIGHT) {
				this.hit();
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		
		colorCircle(this.x, this.y, 2, "Gray");
	}

	this.launch = function launch(angle, power) {
        for (var i = 0; i < MAX_RAINSHOT; i++) {
		var newProjectile = new basicShotClass();
			newProjectile.x = this.x;
			newProjectile.y = this.y;
			newProjectile.size = this.size;
			newProjectile.tank = this.tank;
			newProjectile.launch(angle + (Math.random() * (60 - 1) - 1 ) - 22, (power +  Math.random() * (SHOT_DELTA - 1) - 1 ));
			newProjectile.tail = false;
			arrayOfTemporaryObjects.push(newProjectile);
		}
	}

	this.hit = function hit() {
		yVel = 0;
					
		this.active = false;

		var newExplosion = new basicExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = this.damage;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		newExplosion.particles = this.tail;
		arrayOfTemporaryObjects.push(newExplosion);

		incrementTurn = true;
	}
}

function groundShotClass() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;
	var grounded = false;
	var missle = false;

	this.active = false;
	this.speed = 30;

	this.update = function update(frameTime) {
		if (this.active) {
			if (!grounded) {
				yVel += 90 * frameTime;

				this.x += xVel * frameTime;
				this.y += yVel * frameTime;
			} else {
				yVel -= 180 * frameTime;

				this.x += xVel * frameTime;
				this.y += yVel * frameTime;
			}
			
			if (grounded) {
				let splodes = 2;
				while(--splodes){
					particles.spawn(this.x, this.y, rndFloat(-0.5,0.5), rndFloat(-0.5,-0.5), 1, 1, rndFloat(40, 60), 0);
				}
			}
			
			if (missle) {
				let splodes = 2;
				while(--splodes){
					particles.spawn(this.x, this.y, rndFloat(-5,5), rndFloat(-10,-20), 2, 2, 40, 0);
				}
			}

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x) && !grounded) {
				grounded = true;
			} else if (this.y < canvas.height - UI_HEIGHT - map.getHeightAtX(this.x) && grounded) {
				grounded = false;
				missle = true;
			} else if (this.y > canvas.height - UI_HEIGHT) {
				grounded = true;
			} else if (this.y >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x) && missle) {
				this.hit();
			} else if (this.y >= canvas.height - UI_HEIGHT && missle) {
				this.hit();
			}

			if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Black");
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		this.active = false;

		var newExplosion = new basicExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = this.damage;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		arrayOfTemporaryObjects.push(newExplosion);

		incrementTurn = true;
	}
}

function grenadeShot() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;
	var bounceNumber = 0;

	this.active = false;
	this.tail = true;

	this.update = function update(frameTime) {
		if (this.active) {
			yVel += 90 * frameTime;

			this.x += xVel * frameTime;
			this.y += yVel * frameTime;

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y - 2 >= canvas.height - UI_HEIGHT - map.getHeightAtX(this.x)) {
				this.bounce();
			} else if (this.y - 2 >= canvas.height - UI_HEIGHT) {
				this.bounce();
			} else if (this.x < 0 || this.x > canvas.width) {
				this.active = false;
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Gray");
		//console.log(Math.floor(yVel));
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.bounce = function bounce() {
		console.log("bounce");
		bounceNumber++;
		
		yVel *= -0.5;
		xVel *= -0.5;

		console.log(yVel);
		
		if (bounceNumber >= 8) {
			this.hit();
		}
	}

	this.hit = function hit() {
		this.active = false;
		
		var newExplosion = new basicExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = this.damage;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		newExplosion.particles = this.tail;
		arrayOfTemporaryObjects.push(newExplosion);
		bounceNumber = 0;
	
			
		incrementTurn = true;
	}
}
