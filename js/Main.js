var canvas, canvasContext, debugText;
var framesPerSecond = 30;

var numberOfPlayers = 4;
var arrayOfPlayers = [];
var arrayOfProjectiles = [];
var arrayOfExplosions = [];

var playerTurn = 0;
var incrementTurn = false;
var nextPlayersTurn = true;
var bufferTimerHeadline = 0;
var runTimerHeadline = 0;
var runTimerHeadlineDestroyed = 0;
var destroyedHeadline = false;
var fadeVariable = 1.0;

var deltaTime = 0;
var lastFrameTime = window.performance.now();
var elapsed = 0;
var frameStepSize = 1/60;
var now;

//Scenes
const GAME_MODE = 0;
const TITLE_SCREEN = 1;
const CREDITS_SCREEN = 2;
const MAIN_MENU = 3;
const CONTROLS_SCREEN = 4;
const TERRAIN_SCREEN = 5;
const PLAYER_SCREEN = 6;
const OPTIONS_SCREEN = 7;
const INVENTORY_SCREEN = 8;
const WIN_SCREEN = 9;
var mode = TITLE_SCREEN;

var skyColor = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
var skyColorGradient = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
var groundColor = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
var groundColorGradient = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));

const UI_HEIGHT = 100
const MAX_CLOUDS = 10;
var cloudPositions = [];
var cloudImg;

var map = new terrain();
var SpeechRecognition = new SpeechRecognitionEngine();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	imageLoader.loadImages().then(gameStart);

}

function gameStart() {

	//SpeechRecognition.init(); // ask permission for mic input of game actions

	map.init(canvas.width, canvas.height-UI_HEIGHT);

	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i] = new tankClass();

		arrayOfPlayers[i].name = "Player " + pad(i+1, 2);
		arrayOfPlayers[i].x = lerp(0, canvas.width, (i+1)/(numberOfPlayers+1));
		arrayOfPlayers[i].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[i].x);
		arrayOfPlayers[i].angle = lerp(45, 135, i/(numberOfPlayers-1)); 
		arrayOfPlayers[i].color = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));

	}

	arrayOfPlayers[0].myTurn = true;

	cloudImg = imageLoader.getImage("cloud1");
	for (let i=0; i<MAX_CLOUDS; i++) {
		cloudPositions[i] = {
			x: Math.floor(Math.random()*(canvas.width - cloudImg.width/2)),
			y: Math.floor(Math.random()*(canvas.height/2 - cloudImg.height))
		};
	}
	window.requestAnimationFrame(frameLoop);
}

function frameLoop() {

	now = window.performance.now();

	deltaTime = deltaTime + Math.min(1, (now-lastFrameTime) / 1000);

	while (deltaTime > frameStepSize) {
		deltaTime = deltaTime - frameStepSize;
		update(frameStepSize);
	}

	lastFrameTime = now;

	window.requestAnimationFrame(frameLoop);
}

function update(frameTime) {	
	switch (mode) {
		case GAME_MODE:
			modeGame(frameTime);
			break;
		case TITLE_SCREEN:
			modeTitle(frameTime);
			break;
		case CREDITS_SCREEN:
			modeCredits(frameTime);
			break;
		case MAIN_MENU:
			modeMainMenu(frameTime);
			break;
		case CONTROLS_SCREEN:
			modeControls(frameTime);
			break;
		case TERRAIN_SCREEN:
			modeTerrain(frameTime);
			break;
		case PLAYER_SCREEN:
			modePlayer(frameTime);
			break;
		case OPTIONS_SCREEN:
			modeOptions(frameTime);
			break;
		case INVENTORY_SCREEN:
			modeInventory(frameTime);
			break;
		case WIN_SCREEN:
			modeWinScreen(frameTime);
			break;
	}

	if (Key.isJustPressed(Key.BRACKET_LEFT)){
		turnVolumeDown()
	}
	if (Key.isJustPressed(Key.BRACKET_RIGHT)){
		turnVolumeUp();
	}

	backgroundMusic.updateMusic(frameTime);
	Key.update();
}

function modeGame(frameTime) {

	// colorRect(0, 0, canvas.width, canvas.height, skyColor);	
	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height - UI_HEIGHT);
	gradient.addColorStop(0, skyColor);
	gradient.addColorStop(1, skyColorGradient);
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	

	colorRect(0, canvas.height - UI_HEIGHT, canvas.width, canvas.height, "Grey");
	
	colorRect(100, canvas.height - UI_HEIGHT + 20, canvas.width - 200, 20, "White");
	colorText(arrayOfPlayers[playerTurn].name + " " + 
		" Angle:"  + pad(Math.round(arrayOfPlayers[playerTurn].angle), 3) + 
		" Power:" + pad(Math.round(arrayOfPlayers[playerTurn].power), 3) + 
		" Health:" + pad(Math.round(arrayOfPlayers[playerTurn].health), 3),
		250, canvas.height - UI_HEIGHT + 35, "Black", "15px Arial")


	colorRect(100, canvas.height - UI_HEIGHT + 60, canvas.width - 200, 20, "White");
	colorText(arrayOfPlayers[playerTurn].weapon, 400, canvas.height - UI_HEIGHT + 75, "Black", "15px Arial")


	for (let i=0; i<cloudPositions.length; i++) {
		let pos = cloudPositions[i];
		canvasContext.drawImage(cloudImg, pos.x, pos.y);
	}
	map.draw();

	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i].update(frameTime);
		arrayOfPlayers[i].draw(frameTime);
	}
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		arrayOfProjectiles[i].update(frameTime);
		arrayOfProjectiles[i].draw(frameTime);
	}
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		arrayOfExplosions[i].update(frameTime);
		arrayOfExplosions[i].draw(frameTime);
	}

	cleanLists();
	nextTurn();
	nextPlayersTurnAnnounced();

	if (Key.isJustPressed(Key.m)){
		mode = MAIN_MENU;
	}
}

function nextTurn() {
	if (incrementTurn) {
		nextPlayersTurn = true;
		arrayOfPlayers[playerTurn].myTurn = false;

		playerTurn++;
		if (playerTurn >= numberOfPlayers) {
			playerTurn = 0;
		}

		arrayOfPlayers[playerTurn].myTurn = true;

		incrementTurn = false;

		var remaningPlayers = numberOfPlayers;
		console.log(numberOfPlayers)
		for (var i = 0; i < numberOfPlayers; i++) {
			if (arrayOfPlayers[i].active == false) {remaningPlayers--;}
		}
		if (remaningPlayers <= 1) {
			mode = WIN_SCREEN;
		}
	}
}

function nextPlayersTurnAnnounced() {
	if(nextPlayersTurn) {

		bufferTimerHeadline ++;

		if(bufferTimerHeadline >= 90) {
			colorText(arrayOfPlayers[playerTurn].name + "'s Turn", canvas.width/2 - 200, 150, `rgba(255,255,255,${fadeVariable})`, "50px Arial", );
			runTimerHeadline ++;

			if(runTimerHeadline >= 60) {
				fadeVariable -= 0.01;
			}
		}		
	}

	if(runTimerHeadline >= 180) {
		nextPlayersTurn = false;	
		fadeVariable = 1.0;
		bufferTimerHeadline = 0;
		runTimerHeadline = 0;
	}
}

function cleanLists() {
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		if (!arrayOfProjectiles[i].active) {
			arrayOfProjectiles.splice(i, 1);
			i--;
		}
	}
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		if (!arrayOfExplosions[i].active) {
			arrayOfExplosions.splice(i, 1);
			i--;
		}
	}
}