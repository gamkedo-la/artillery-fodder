var terrainTypeIndex = ["Standard",
					   "Towers",
					   "Uphill",
					   "Downhill",
					   "Hill",
					   "Valley",
					   "Mound"]

function modeTerrain(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorText("TERRAIN SCREEN", canvas.width/2, 100, "White", "50px Arial");
	colorText("[Space Bar] MAIN MENU", canvas.width/2, canvas.height - 50, "white", "20px Arial");

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

	if (isMouseInArea(canvas.width/2 - 75, 120, 20, 20) && mousePressed) {
		map.type -= 1;
		if (map.type < 0) {
			map.type = terrainTypeIndex.length-1;
		}
		map.generateTerrain();
	}

	if (isMouseInArea(canvas.width/2 + 55, 120, 20, 20) && mousePressed) {
		map.type += 1;
		if (map.type >= terrainTypeIndex.length) {
			map.type = 0;
		}
		map.generateTerrain();
	}

	if (isMouseInArea(canvas.width/2 - 55, 120, 110, 20) && mousePressed) {
		map.generateTerrain();
	}

	if (Key.isJustPressed(Key.SPACE)){
		mode = MAIN_MENU;
	}
}