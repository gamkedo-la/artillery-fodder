var terrainTypeIndex = ["Standard",
					   "Towers",
					   "Uphill",
					   "Downhill",
					   "Hill",
					   "Valley",
					   "Mound"]

function modeTerrain(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "black");

	drawBg(0.5,"BgTile")

	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height);
	gradient.addColorStop(0, "#00000000");
	gradient.addColorStop(0.7, "#000000FF");
	gradient.addColorStop(0.9, "#000000FF");
	gradient.addColorStop(1, "#00000000");
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	colorText("TERRAIN SCREEN", canvas.width/2, 100, "White", "50px Arial");

	groundColor = "white";
	groundColorGradient = "black";

	map.draw();

	colorRect(canvas.width/2 - 75, 120, 150, 20, "White");
	colorText(terrainTypeIndex[map.type], canvas.width/2,135, "Black", font = "15px Arial")
	canvasContext.drawImage(buttonImg,
		40, 0,
		20, 20,
		canvas.width/2 - 75, 120,
		20, 20);
	canvasContext.drawImage(buttonImg,
		60, 0,
		20, 20,
		canvas.width/2 + 55, 120,
		20, 20);

	if (isMouseInArea(canvas.width/2 - 75, 120, 20, 20) && mouseJustPressed) {
		map.type -= 1;
		if (map.type < 0) {
			map.type = terrainTypeIndex.length-1;
		}
		map.generateTerrain();
	}

	if (isMouseInArea(canvas.width/2 + 55, 120, 20, 20) && mouseJustPressed) {
		map.type += 1;
		if (map.type >= terrainTypeIndex.length) {
			map.type = 0;
		}
		map.generateTerrain();
	}

	if (isMouseInArea(canvas.width/2 - 55, 120, 110, 20) && mouseJustPressed) {
		map.generateTerrain();
	}

	btnManager.mainMenuButton.draw()

}
