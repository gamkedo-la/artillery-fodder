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

	this.update = function update(frameTime) {
		if (this.active) {
			if (!damageDone) {
				for (var i = 0; i < numberOfPlayers; i++) {
					if (this.tank != arrayOfPlayers[i]) {
						this.calculateDamage(arrayOfPlayers[i]);
					}
				}
				map.createImpactAtXandY(this.x, this.y, this.size);
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
	console.log("duu")
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
		arrayOfExplosions.push(newExplosion);
	}
}