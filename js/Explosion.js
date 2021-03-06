function basicExplosionClass() {
	this.x = 0;
	this.y = 0;
	this.size = 0;
	this.maxSize = 20;
	this.expandingRate = 2;
	this.contractingRate = 10;
	this.damage = 20;
	this.color = "White";
	this.tank;

	var damageDone = false;

	this.active = false;
	this.countDown = 0.5;
	this.particles = true;

	this.update = function update(frameTime) {
		this.size = this.size >= this.maxSize * 1.1 ? this.size - this.contractingRate : this.size + this.expandingRate;

		if (this.active) {
			if (!damageDone) {
				for (var i = 0; i < numberOfPlayers; i++) {
					if (this.tank != arrayOfPlayers[i]) {
						this.calculateDamage(arrayOfPlayers[i]);
					}
				}
				map.createImpactAtXandY(this.x, this.y, this.size);
                soundExplosion.play();

                stats.explosions++;

				if (this.particles) {
					let splodes = 50;
					while(--splodes){
						particles.spawn(this.x, this.y, rndFloat(-7,7)*this.size, rndFloat(-1,-10)*this.size, 10, 10, rndFloat(20, 30), 1 )
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
		var angle = angleBetween2Points(this, {x:targetTank.x, y:targetTank.y - 5});
		if (dist <= this.size) {
            stats.hits++;
            targetTank.takeDamage((this.size - dist)/this.size * this.damage, angle);
		} else {
            //stats.misses++; // this increments for EACH player missed per shot
        }
	}
}

function multiExplosionClass() {    
    this.x = 0;
	this.y = 0;
	this.size = 0;
	this.maxSize = 20;
	this.expandingRate = 2;
	this.contractingRate = 10;
	this.damage = 10;
	this.color = "White";
	this.tank;

	var damageDone = false;
	var createdChild = false;

	this.active = false;
	this.countDown = 0.5;
	this.numberOfIterations = 10;

	this.update = function update(frameTime) {
		this.size = this.size >= this.maxSize * 1.1 ? this.size - this.contractingRate : this.size + this.expandingRate;

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
		var angle = angleBetween2Points(this, {x:targetTank.x, y:targetTank.y - 5});
		if (dist <= this.size) {
            stats.hits++;
			targetTank.takeDamage((this.size - dist)/this.size * this.damage, angle);
		} else {
            //stats.misses++; // called for EACH tank missed
        }
	}

	this.createChild = function createChild() {
		var newExplosion = new multiExplosionClass();
		newExplosion.x = this.x + rndFloat(-this.size, this.size);
		newExplosion.y = this.y + rndFloat(-this.size, this.size);
		newExplosion.size = this.size * 9/10;
		newExplosion.damage = this.damage * 9/10;
		newExplosion.color = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
		newExplosion.tank = this.tank;
		newExplosion.numberOfIterations = this.numberOfIterations - 1;
		newExplosion.active = true;
		arrayOfTemporaryObjects.push(newExplosion);
	}
}