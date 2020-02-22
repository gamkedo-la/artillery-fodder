function basicExplosionClass() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.color = "White";
	this.tank;

	var damageDone = false;

	this.active = false;
	this.countDown = 0.5;
	this.particles = true;

	this.update = function update(frameTime) {
		if (this.active) {
			if (!damageDone) {
				for (var i = 0; i < numberOfPlayers; i++) {
					if (this.tank != arrayOfPlayers[i]) {
						this.calculateDamage(arrayOfPlayers[i]);
					}
				}
				map.createImpactAtXandY(this.x, this.y, this.size);
				soundExplosion.play();

				if (this.particles) {
					let splodes = 100;
					while(--splodes){
						particles.spawn(this.x, this.y, rndFloat(-120,120), rndFloat(-100,-300), 10, 10, 40, 1 )
					}
				}

				damageDone = true;
			}
			if (this.countDown >= 0) {
				this.countDown -= frameTime;
			} else {
				this.active = false;
			}


		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, this.size, this.color);
		
	}

	this.calculateDamage = function calculateDamage(targetTank) {
		var dist = distance(targetTank, this);
		var angle = angleBetween2Points(this, targetTank);
		if (dist <= this.size) {
			targetTank.takeDamage(dist/this.size * this.damage, angle);
		}
	}
}

function multiExplosionClass() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 10;
	this.color = "White";
	this.tank;

	var damageDone = false;
	var createdChild = false;

	this.active = false;
	this.countDown = 0.5;
	this.numberOfIterations = 10;

	this.update = function update(frameTime) {
		if (this.active) {
			if (!damageDone) {
				for (var i = 0; i < numberOfPlayers; i++) {
					if (this.tank != arrayOfPlayers[i]) {
						this.calculateDamage(arrayOfPlayers[i]);
					}
				}
				map.createImpactAtXandY(this.x, this.y, this.size);

				let splodes = 10;
				while(--splodes){
					particles.spawn(this.x, this.y, rndFloat(-10,10), rndFloat(-60,-100), 10, 10, 100, 0 )
				}
		
				soundExplosion.play();
				damageDone = true;
			}
			if (this.countDown <= 0.4 && !createdChild && this.numberOfIterations > 0) {
				this.createChild();
				createdChild = true;
			}
			if (this.countDown >= 0) {
				this.countDown -= frameTime;
			} else {
				this.active = false;
			}


		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, this.size, this.color);		
	}

	this.calculateDamage = function calculateDamage(targetTank) {
		var dist = distance(targetTank, this);
		var angle = angleBetween2Points(this, targetTank);
		if (dist <= this.size) {
			targetTank.takeDamage(dist/this.size * this.damage, angle);
		}
	}

	this.createChild = function createChild() {
		var newExplosion = new multiExplosionClass();
		newExplosion.x = this.x + rndFloat(-this.size, this.size);
		newExplosion.y = this.y + rndFloat(-this.size, this.size);
		newExplosion.size = this.size * 9/10;
		newExplosion.damage = this.damage * 9/10;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.numberOfIterations = this.numberOfIterations - 1;
		newExplosion.active = true;
		arrayOfTemporaryObjects.push(newExplosion);
	}
}