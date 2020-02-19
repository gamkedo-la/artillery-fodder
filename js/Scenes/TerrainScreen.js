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

	if (Key.isJustPressed(Key.SPACE)){
		mode = MAIN_MENU;
	}
}