var damageAmount;
var damageAmountPosX;
var damageAmountPosY;
var damageAmountIndicator = false;
var aiBufferTimer = 0;
var weaponTier = 0;
var luckyReflexState = 0;
var luckyReflexCountUp = true;
var mouseLastPosX = 0;
var mouseLastPosY = 0;

function tankPlayerClass() {
	this.x = 400;
	this.y = 300;
	this.angle = 90;
	this.power = 75;
	this.health = 100;
	this.name = "Player";
	
	this.usesAI = false;
	this.aiType = 0;

	var w = 20;
	var h = 10;
	var xVel = 0;
	var yVel = 0;

	this.targetTank = null;
	var targetX = 0;
	var targetY = 0;

	this.myTurn = false;
	this.active = true;

	this.tankSkinIndex = 0;
	this.color = 0;
	this.imageLookupOffset = 0;

	this.weapon = 0;
	this.weaponInventory = [];
	this.weaponIndextIncreesing = true;
	
	const showHealthBarAfterDamageFramecount = 200;
	this.recentDamageDisplayFrames = 0; // show health bar for a while after getting hit

	// this is the number of frames the AI has decided to press each button
	var ai = { left:0,right:0,next:0,prev:0,up:0,down:0,fire:0,init:0 };

	this.aiThink = function() { // run every frame that is myturn
		if (this.targetTank != null && !this.targetTank.active) {
			this.targetTank = null;
		}
		if(this.targetTank == null) {
			this.recalcTargetX();
			var closest = -1;
			var closestDist = 9999.0;
			for (var i = 0; i < numberOfPlayers; i++) {
				if(this == arrayOfPlayers[i] || !arrayOfPlayers[i].active) {
					continue;
				}
				var latDist = Math.abs(this.x - arrayOfPlayers[i].x);
				if (this.aiType == 1) {
					latDist = Math.abs(targetX - arrayOfPlayers[i].x);
				}
				if(latDist < closestDist) {
					closest = i;
					closestDist = latDist;
				}
			}
			//console.log(closest)
			if(closest != -1) {
				this.targetTank = arrayOfPlayers[closest];
			}
		}

		if (this.aiType == 0) {
			
			// the first time around, create a new brain
			// these numbers say: how many frames should I push this button?
			if (!ai.init) ai = { left:0,right:0,next:0,prev:0,up:0,down:0,init:1,fire:1 };

			// desires slowly subside
			if (ai.left) ai.left--;
			if (ai.right) ai.right--;
			if (ai.next) ai.next--;
			if (ai.prev) ai.prev--;
			if (ai.up) ai.up--;
			if (ai.down) ai.down--;
			
			// if we fired last time, reset
			if (ai.fire) {
				// choose a new action for a few frames
				var rand = rndInt(1,100);
				if (rand<30) ai.left = rndInt(20,90);
				else if (rand<60) ai.right = rndInt(20,90);
				else if (rand<70) ai.next = rndInt(1,5);
				else if (rand<80) ai.prev = rndInt(1,5);
				else if (rand<90) ai.up = rndInt(2,10);
				else ai.down = rndInt(2,10);
			}
			
			// how busy are we
			var pending = (ai.left>0)||(ai.right>0)||(ai.next>0)||(ai.prev>0)||(ai.up>0)||(ai.down>0);
			
			// when nothing is left to do, FIRE!
			if (!pending) {
				ai.fire=1;
				aiBufferTimer = 0;
			} else {
				ai.fire=0;
			}
		}

		if (this.aiType >= 1) {

			if (ai.next) ai.next--;
			if (ai.prev) ai.prev--;

			if (this.targetTank != null && this.myTurn) {
				for (var i = 0; i < 15; i++) {
					this.recalcTargetX();
					if (this.targetTank.x < targetX && this.angle < 180) {
						this.angle += 0.01;
					} else if (this.targetTank.x > targetX && this.angle > 0) {
						this.angle -= 0.01;
					}
					if (this.targetTank.x < this.x) {
						if (this.targetTank.x > targetX && this.power < 100) {
							this.power += 0.005;
						} else {
							this.power -= 0.005;
						}
					} else {
						if (this.targetTank.x > targetX && this.power < 100) {
							this.power += 0.005;
						} else {
							this.power -= 0.005;
						}						
					}
				}
				if (aiBufferTimer > 1.5) {
					ai.fire=1;
					aiBufferTimer = 0;

					var rand = rndInt(1,10);
					if (rand==9) ai.next = rndInt(1,5);
					else if (rand==10) ai.prev = rndInt(1,5);
				} else {
					ai.fire=0;
				}
			}
			/*
			var radians = degreesToRadians(this.angle);
			xVel += Math.cos(radians) * this.power;
			yVel += -Math.sin(radians) * this.power;
			*/
			//this.angle, this.power*2.65
		}
	}
	
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

		//The floor is lava
		if (this.y >= canvas.height - UI_HEIGHT && this.active) {
			this.health = 0;
			this.destroy();
		}

		//Dampens to zero
		if (Math.abs(xVel) < 0.1) {xVel = 0;}
		if (Math.abs(yVel) < 0.1) {yVel = 0;}

		if (this.myTurn) {
			if (this.active) {
				
				if (this.usesAI) {
					aiBufferTimer += frameTime;
					this.aiThink();
				}
				
				if (!this.usesAI){
					
				// Standart Input
					if (!btnManager.controlOptions.getValue(2)){
						if (Key.isJustPressed(Key.SPACE) || (SpeechRecognition && SpeechRecognition.pendingFireCommand())){
							if(this.weaponInventory[this.weapon] != 0) {
								this.fire();
							}
						}
						
						if ((Key.isDown(Key.LEFT) || (mouseMovementX < -0 && mousePressed && btnManager.controlOptions.getValue(0)))) {
							this.angle += 30 * frameTime * Math.max(Math.abs(mouseMovementX * 0.5), 1);
						}
						if ((Key.isDown(Key.RIGHT) || (mouseMovementX > 0 && mousePressed && btnManager.controlOptions.getValue(0)))){
							this.angle -= 30 * frameTime * Math.max(Math.abs(mouseMovementX * 0.5), 1);
						}
						if ((Key.isDown(Key.UP))){					
							this.power += 30 * frameTime;
						}
						if ((Key.isDown(Key.DOWN))){
							this.power -= 30 * frameTime;
						}
					}
					
					if ((Key.isJustPressed(Key.COMMA) || (SpeechRecognition && SpeechRecognition.pendingPrevCommand())) ||  mouseScrollY > 0){
						this.weapon--;
						this.weaponIndextIncreesing = false;
						mouseScrollY = 0; //mouse wheel bug fix
					}
					if ((Key.isJustPressed(Key.PERIOD) || (SpeechRecognition && SpeechRecognition.pendingNextCommand())) || mouseScrollY < 0){
						this.weapon++;
						this.weaponIndextIncreesing = true;
						mouseScrollY = 0; //mouse wheel bug fix
					}
					
				// mouse Only Input	
					
					if (btnManager.controlOptions.getValue(1)){
						
						document.onkeydown = function(){
							mouseLastPosX = mouseX;
							mouseLastPosY = mouseY;
							}
						
						if (mouseX > 0 && mouseX < canvas.width && mouseLastPosX != mouseX 
							&& mouseY > 0 && mouseY < canvas.height - UI_HEIGHT && mouseLastPosY != mouseY ){
							this.angle = angleBetween2Points({x:this.x, y:this.y}, {x:mouseX, y:mouseY});

							this.power = Math.sqrt((Math.pow(mouseX-this.x,2))+(Math.pow(mouseY-this.y,2))) -55;
						}
					}
					
					// Reflex Tap Input
					if (btnManager.controlOptions.getValue(2)){
						
						switch (luckyReflexState) {
							case 0:
								this.angle = Math.random() * 360;
								this.power = 60;
								luckyReflexState++;
								break;
							
							case 1:
								this.angle += 60 * frameTime;
								
								if ( (mouseJustPressed && mouseX > 0 && mouseX < canvas.width 
									&& mouseY > 0 && mouseY < canvas.height - UI_HEIGHT)
									|| Key.isJustPressed(Key.SPACE) || ai.fire
									|| (SpeechRecognition && SpeechRecognition.pendingFireCommand())){
										
									luckyReflexState++;
								}
								break;
								
							case 2:
								if (luckyReflexCountUp){
									this.power += 70 * frameTime;
								}else{
									this.power -= 70 * frameTime;
								}
								
								if (this.power <= 1){
									luckyReflexCountUp = true;
								}
								if (this.power >= 100){
									luckyReflexCountUp = false;
								}
							
								if ( (mouseJustPressed && mouseX > 0 && mouseX < canvas.width 
									&& mouseY > 0 && mouseY < canvas.height - UI_HEIGHT)
									|| Key.isJustPressed(Key.SPACE) || ai.fire
									|| (SpeechRecognition && SpeechRecognition.pendingFireCommand())){
									while (this.weaponInventory[this.weapon] == 0){								
										this.weapon++;
										this.weaponIndextIncreesing = true;
									}
									if (this.weaponInventory[this.weapon] != 0){
										this.fire();
										luckyReflexState = 0;
									}
								}
								break;
						}
					}
				} else {
					if (!btnManager.controlOptions.getValue(2)){
						if (ai.fire){
							if(this.weaponInventory[this.weapon] != 0) {
								this.fire();
							}
						}
						
						if (ai.left) {
							this.angle += 30 * frameTime * Math.max(Math.abs(mouseMovementX * 0.5), 1);
						}
						if (ai.right){
							this.angle -= 30 * frameTime * Math.max(Math.abs(mouseMovementX * 0.5), 1);
						}
						if (ai.up){					
							this.power += 30 * frameTime;
						}
						if (ai.down){
							this.power -= 30 * frameTime;
						}
					}
					
					if (ai.prev){
						this.weapon--;
						this.weaponIndextIncreesing = false;
						mouseScrollY = 0; //mouse wheel bug fix
					}
					if (ai.next){
						this.weapon++;
						this.weaponIndextIncreesing = true;
						mouseScrollY = 0; //mouse wheel bug fix
					}

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

				if (this.weaponInventory[this.weapon] == 0 && this.weaponIndextIncreesing == true) {
					this.weapon++;
				} else if (this.weaponInventory[this.weapon] == 0) {
					this.weapon--;
				}

				if (this.weapon > WEAPON_LIST_MAX) {
					this.weapon = 0;
				} else if (this.weapon < 0) {
					this.weapon = WEAPON_LIST_MAX;
				}

				if (mouseX > 0 && mouseX < canvas.width && mouseLastPosX != mouseX 
					&& mouseY > 0 && mouseY < canvas.height - UI_HEIGHT && mouseLastPosY != mouseY 
					&& btnManager.controlOptions.getValue(1)){

					if( mouseJustPressed && this.weaponInventory[this.weapon] != 0) {
						this.fire();
					}
				}
			} else {
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		var radians;
		radians = degreesToRadians(this.angle);

		if (this.myTurn && this.active) {
			canvasContext.save();
			canvasContext.translate(this.x,this.y-h);
			canvasContext.rotate(-radians);
			canvasContext.drawImage(imageLoader.getImage("crosshair"), this.power/100*70, -10);
			canvasContext.restore();

			canvasContext.save();
			canvasContext.translate(this.x,this.y-5);
			canvasContext.rotate(degreesToRadians(playerScreenWave));
			canvasContext.drawImage(imageLoader.getImage("selector"), -12.5, -12.5);
			canvasContext.restore();

			//colorLine(this.x, this.y, this.targetTank.x, this.targetTank.y, 1, "magenta");
			//colorCircle(targetX, targetY, 5, "LimeGreen")
		}

		//Draw body
		canvasContext.drawImage(tankSkinCanvas, 
			this.imageLookupOffset * 30, 0, 
			30, 40, 
			this.x-w/2 - 5, this.y-h - 25, 
			w+10, h+30);

		//Draw Cannon
		canvasContext.save();
		canvasContext.translate(this.x,this.y-h);
		canvasContext.rotate(-radians);
		canvasContext.drawImage(tankSkinCanvas, 
			this.imageLookupOffset * 30, 40, 
			30, 20, 
			-w/2 - 5, -h/2 - 5, 
			w+10, h+10);
		canvasContext.restore();
		
		// Draw the health bar
		if (this.isPointColliding(mouseX,mouseY)) {
			drawHealthbar(this.x,this.y, Math.floor(this.health));
		}
	}

	this.recalcTargetX = function() {
		var heightOfSource = canvas.height - UI_HEIGHT - map.getHeightAtX(this.x);
		var shotPower = this.power * 2.65;
		var radians = degreesToRadians(this.angle);
		var shotVelY = -Math.sin(radians) * shotPower;
		var gravityAppx = 90;
		var timeInAir = -shotVelY/(gravityAppx*0.5);
		var shotVelX = Math.cos(radians) * shotPower;
		var heightOfDest =  canvas.height - UI_HEIGHT - map.getHeightAtX(this.x+timeInAir*shotVelX);
		timeInAir = (heightOfDest - heightOfSource)/60 -shotVelY/(gravityAppx*0.5);
		heightOfDest =  canvas.height - UI_HEIGHT - map.getHeightAtX(this.x+timeInAir*shotVelX);

		targetX = this.x + timeInAir*shotVelX;
		targetY = heightOfDest;
	}

	function drawHealthbar(x, y, tankHealth, color) {
		if (tankHealth < 0) {
			tankHealth = 0;
		}

		var barx = x-26;
		var bary = y-46;
		var barw = 52;
		var barh = 20;

		//healthbar's black border
		canvasContext.fillStyle = "black";
		canvasContext.fillRect(barx - 3,bary - 3 ,barw + 6,barh + 6);
		//healthbar's white inner background
		canvasContext.fillStyle = "white";
		canvasContext.fillRect(barx,bary,barw,barh);

		//changing colors of health indicator
		if(tankHealth >= 70){
			canvasContext.fillStyle = "rgba(0,255,0,1)";
		}
		if (tankHealth <= 69){
			canvasContext.fillStyle = "rgba(255,153,0,1)";
		}
		if (tankHealth <= 30){
			canvasContext.fillStyle = "rgba(255,0,0,1)";
		}
		//canvasContext.fillStyle = "black";//"rgba(255,0,0,1)";
		canvasContext.fillRect(barx,bary,barw*(tankHealth/100),barh);

		colorText(tankHealth + "HP", x , y - 30, 'black', font = "16px Arial");  
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
		if (amount < 0) {amount = 0;}
		
		stats.damage += amount;

		this.health -= amount;
		damageAmount = amount;

		// display a health bar for a few seconds
		this.recentDamageDisplayFrames = showHealthBarAfterDamageFramecount;

		let splodes = Math.round(amount);
		while(--splodes >= 0){
			particles.spawn(this.x, this.y - 10, rndFloat(-20,20), rndFloat(-40,0), 1, 2, rndFloat(50,70), 0 )
		}

		//Kick
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * amount * 3;
		yVel = -Math.sin(radians) * amount * 3;

		soundHit.play();

		if (this.health < 0) {
			this.health = 0;
			damageAmount = 0;
		}

		if(damageAmount > 0 && this.health > 0) {
			damageAmountIndicator = true;
			damageAmountPosX = this.x;
			damageAmountPosY = this.y;
		}

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
			//destroyedNameIndicator(this.name); // FIXME / TODO?
			
			let splodes = 10;
			while(--splodes){
				particles.spawn(this.x, this.y - 10, rndFloat(-40,40), rndFloat(-40,0), 2, 2, 60, 0 )
			}

		}
	}

	this.muzzleFlash = function() {
		//console.log('muzzy!');
		var radians = degreesToRadians(this.angle);
		var x = this.x - 5; // to center the sprites
		var y = this.y - 10 - 5; // gun is offset from sprite
		var xVel = Math.cos(radians); // % of speed
		var yVel = -Math.sin(radians);
		
		// big flash - looks bad
		//particles.spawn(
		//    x, y-10, // pos
		//    0,0, // vel
		//    20,20, // w, h
		//    50, // lifespan in ms
		//    2 ); // type
		
		// orange sparks flying in the shoot direction
		for (var num=0; num<20; num++) {
			particles.spawn(
				x+xVel*rndFloat(1,30), y+yVel*rndFloat(1,30), // pos w offset
				xVel*100+rndFloat(-50,50), yVel*100+rndFloat(-50,50), // vel with randomness
				rndFloat(5,10), rndFloat(5,10), // w, h
				rndFloat(10,35), // lifespan in ms
				1 ); // type
		}

		// slower moving smoke puffs
		for (var num=0; num<20; num++) {
			particles.spawn(
				x+xVel*rndFloat(1,20), y+yVel-rndFloat(1,20), // pos w offset
				xVel*10+rndFloat(-15,15), yVel*10+rndFloat(-15,15), // vel with randomness
				rndFloat(10,20), rndFloat(10,20), // w, h
				rndFloat(10,25), // lifespan in ms
				2 ); // type
		}        
	}

	this.fire = function fire() {
		if(this.weaponInventory[this.weapon] == 0 || !this.myTurn) {
			return;
		}

		if (this.usesAI) {
			this.angle += Math.random() * 6 - 3;
		}
		
		stats.shots++;

		var newProjectile;
		switch (this.weapon) {
			case 0://Basic Shot
				newProjectile = new basicShotClass();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 1://Three Shot
				newProjectile = new multiShotClass();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 2://Sniper Shot
				newProjectile = new sniperShotClass();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 3://Hop
				newProjectile = new empty();
				var radians = degreesToRadians(this.angle);
				xVel += Math.cos(radians) * this.power;
				yVel += -Math.sin(radians) * this.power;
				this.y -= 1;
				soundHop.play()
				break;
			case 4://Teleport Shot
				newProjectile = new teleportShot();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 5://Big Shot
				newProjectile = new basicShotClass();
				soundFire.play();
				this.muzzleFlash();
				newProjectile.size = 50;
				newProjectile.damage = 30;
				break;
			case 6://Roller
				newProjectile = new rollShotClass();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 7://Crazy Bomb
				newProjectile = new crazyBombShotClass();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 8://Meteor Clash
				newProjectile = new meteorClashClass();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 9://Rain Shot
				newProjectile = new rainShot();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 10://Ground Shot
				newProjectile = new groundShotClass();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 11://Grenade
				newProjectile = new grenadeShot();
				soundFire.play();
				this.muzzleFlash();
				break;
			case 12: //Delayed Multi Shot
			  newProjectile = new delayedMultiShotClass();
			  soundFire.play();
			  this.muzzleFlash();
			  break;
			case 13://Self Destruct
				newProjectile = new empty();
				var newExplosion = new basicExplosionClass();
				newExplosion.x = this.x;
				newExplosion.y = this.y - 5;
				newExplosion.size = 40;
				newExplosion.damage = 60;
				newExplosion.color = "White";
				newExplosion.tank = this;
				newExplosion.active = true;
				arrayOfTemporaryObjects.push(newExplosion);
				this.health = 0;
				this.destroy();
				break;
		}

		this.weaponInventory[this.weapon] -= 1;

		newProjectile.x = this.x;
		newProjectile.y = this.y - 10;
		newProjectile.tank = this;
		newProjectile.launch(this.angle, this.power*2.65);
		arrayOfTemporaryObjects.push(newProjectile);


		this.myTurn = false;
	}
}

