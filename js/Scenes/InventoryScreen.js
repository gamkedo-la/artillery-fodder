const WEAPON_LIST_MAX = 13;
var arrayOfWeaponBlocks = [];
var projectileNameList = ["Basic Shot",
						  "Three Shot",
						  "Sniper Shot",
						  "Hop",
						  "Teleport Shot",
						  "Big Shot",
						  "Roller",
						  "Crazy Bomb",
						  "Meteor Clash",
						  "Rain Shot",
						  "Ground Shot",
						  "Grenade",
						  "Delayed Three Shot",
						  "Self Destruct"];
var weaponInventoryMaster = [-1,//Basic Shot
							 -1,//Three Shot
							 1,//Sniper Shot
							 2,//Hop
							 2,//Teleport Shot
							 3,//Big Shot
							 3,//Roller
							 1,//Crazy Bomb
							 2,//Meteor Clash
							 5,// Rain Shot
							 3,// Ground Shot
							 3,// Grenade
							 3,// Delayed Multi Shot
							 1]//Self Destruct 

function modeInventory(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "purple");
	
	drawBg(0.5,"BgTileWhite") // draw bg
	
	for (var i = 0; i <= WEAPON_LIST_MAX; i++) {
		arrayOfWeaponBlocks[i].update();
		arrayOfWeaponBlocks[i].draw();
	}

	btnManager.mainMenuButton.draw()

}

function populateInventoryScreen() {
	var numberAcross = 4;
	var yOffset = 1;
	for (var i = 0; i <= WEAPON_LIST_MAX; i++) {
		arrayOfWeaponBlocks[i] =  new weaponBlock(i);
		arrayOfWeaponBlocks[i].x = 125 + 180*(i%4);
		arrayOfWeaponBlocks[i].y = 100 + yOffset*60;
		if (i%4 == 3) {
			yOffset += 1;
		}
	}
}

function weaponBlock(id) {
	this.x = 0;
	this.y = 0;

	var w = 160;
	var h = 40;
	var index = id

	var name = projectileNameList[id];
	var quantity = weaponInventoryMaster[id];

	this.update = function() {
		if (isMouseInArea(this.x - w/2, this.y + 10, 70, 20) && mouseJustPressed) {
			weaponInventoryMaster[index]--;
			if (weaponInventoryMaster[index] < -1) {
				weaponInventoryMaster[index] = -1
			}
		}
		if (isMouseInArea(this.x, this.y + 10, 70, 20) && mouseJustPressed) {
			weaponInventoryMaster[index]++;
		}
	}

	this.draw = function() {
		colorRect(this.x - w/2, this.y, w, h, "Grey");
		colorRect(this.x - w/2 + 10, this.y + 10, 140, 20, "White");
		
		if (weaponInventoryMaster[index] >= 0) {
			colorText(name + " x" + weaponInventoryMaster[index], this.x, this.y + 25, "Black", "15px Arial");
		} else {
			colorText(name, this.x, this.y + 25, "Black", "15px Arial");
		}
	}
}
