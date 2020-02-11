var canvas, canvasContext, debugText;
var framesPerSecond = 30;

var numberOfPlayers = 4;
var arrayOfPlayers = [];
var arrayOfProjectiles = [];
var arrayOfExplosions = [];

var playerTurn = 0;
var incrementTurn = false;
var fadeVariable = 1.0;
var destroyedHeadline = false;
var nextTurnHeadline = true;
var timerHeadline = 0;

var deltaTime = 0;
var lastFrameTime = window.performance.now();
var elapsed = 0;
var frameStepSize = 1/60;
var now;

//clock
var clockMinute = 0;
var clockHour = 9;
var clockHourCountdown = 0;
var clockMinuteCountdown = 0;
var dayTime = true;
var colorOfTextforClock;

//sky 
//variables for morning sky colors
var skyColorGradient01 = 255;
var skyColorGradient02 = 255;
var skyColorGradient03 = 0;

var skyColor01 = 255;
var skyColor02 = 255;
var skyColor03 = 255;

//sky flickering
var skyFlickersTimer = 0;
var skyFlickersNow = false;

var skyColorGradient = fullColorHex(skyColorGradient01, skyColorGradient02, skyColorGradient03);
var skyColor = fullColorHex(skyColor01, skyColor02, skyColor03);


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



//var skyColorGradient = "yellow";
//var skyColor = "white";
var groundColor = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
var groundColorGradient = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));

//clouds
const UI_HEIGHT = 100
const MAX_CLOUDS = 10;
const cloudSpeeds = [];
var cloudPositions = [];
var cloudImg;

var map = new terrain();
var SpeechRecognition = new SpeechRecognitionEngine();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.textAlign = "center";
	mouseInit()

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
		arrayOfPlayers[i].tankSkinIndex = 0;
		arrayOfPlayers[i].imageLookupOffset = i;

	}

	arrayOfPlayers[0].myTurn = true;

	cloudImg = imageLoader.getImage("cloud1");
	for (let i=0; i<MAX_CLOUDS; i++) {
		cloudPositions[i] = {
			x: Math.floor(Math.random()*(canvas.width - cloudImg.width/2)),
			y: Math.floor(Math.random()*(325 - cloudImg.height))
		};
		cloudSpeeds[i] = Math.random() * (0.2 - 0.05) + 0.05;
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

	//Draw Sky
	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height - UI_HEIGHT);
	gradient.addColorStop(0, skyColor);
	gradient.addColorStop(1, skyColorGradient);
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	//Draw UI section
	colorRect(0, canvas.height - UI_HEIGHT, canvas.width, canvas.height, "Grey");
	colorRect(canvas.width*1/4 - 50, canvas.height - UI_HEIGHT + 20, 100, 20, "White");
	colorRect(canvas.width*2/4 - 50, canvas.height - UI_HEIGHT + 20, 100, 20, "White");
	colorRect(canvas.width*3/4 - 50, canvas.height - UI_HEIGHT + 20, 100, 20, "White");
	colorRect(canvas.width*3/4 - 50, canvas.height - UI_HEIGHT + 20, 100, 20, "White");
	colorRect(canvas.width*1/3 - 50, canvas.height - UI_HEIGHT + 60, 100, 20, "White");
	colorRect(canvas.width*2/3 - 50, canvas.height - UI_HEIGHT + 60, 100, 20, "White");
	colorText("Angle:"  + pad(Math.round(arrayOfPlayers[playerTurn].angle), 3), canvas.width*1/4, canvas.height - UI_HEIGHT + 35, "Black", font = "15px Arial");
	colorText("Power:" + pad(Math.round(arrayOfPlayers[playerTurn].power), 3), canvas.width*2/4, canvas.height - UI_HEIGHT + 35, "Black", font = "15px Arial");
	colorText("Health:" + pad(Math.round(arrayOfPlayers[playerTurn].health), 3), canvas.width*3/4, canvas.height - UI_HEIGHT + 35, "Black", font = "15px Arial");
	colorText(arrayOfPlayers[playerTurn].name, canvas.width*1/3, canvas.height - UI_HEIGHT + 75, "Black", font = "15px Arial");
	if (arrayOfPlayers[playerTurn].weaponInventory[arrayOfPlayers[playerTurn].weapon] > 0) {
		colorText(projectileNameList[arrayOfPlayers[playerTurn].weapon] + " x" + arrayOfPlayers[playerTurn].weaponInventory[arrayOfPlayers[playerTurn].weapon], 
			canvas.width*2/3, canvas.height - UI_HEIGHT + 75, "Black", font = "15px Arial");
	} else {
		colorText(projectileNameList[arrayOfPlayers[playerTurn].weapon], canvas.width*2/3, canvas.height - UI_HEIGHT + 75, "Black", font = "15px Arial");
	}

//cloud movement & cycling
	for (let i=0; i<cloudPositions.length; i++) {
		let pos = cloudPositions[i];
		canvasContext.drawImage(cloudImg, pos.x, pos.y);
		pos.x += cloudSpeeds[i];

		if(pos.x >= canvas.width + 10) {
			cloudPositions[i] = {
				x: 0 - cloudImg.width,
				y: Math.floor(Math.random()*(325 - cloudImg.height))
			}
		}
	}

	map.draw();

	//Update and draw tanks
	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i].update(frameTime);
		arrayOfPlayers[i].draw(frameTime);
	}
	//Update and draw shots
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		arrayOfProjectiles[i].update(frameTime);
		arrayOfProjectiles[i].draw(frameTime);
	}
	//Update and draw explosions
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		arrayOfExplosions[i].update(frameTime);
		arrayOfExplosions[i].draw(frameTime);
	}

	cleanLists();
	nextTurn();
	inGameAnnoucements();
	gameClock();
	dayNight();
	skyFlickers();

	if (Key.isJustPressed(Key.m)){
		mode = MAIN_MENU;
	}
}

function gameClock() {
 
	clockHourCountdown ++;
	clockMinuteCountdown ++;

	colorText(clockHour + ":" + clockMinute, 700, 30, colorOfTextforClock, "15px Arial");

	if(clockMinuteCountdown >= 60) {
		for (var i = 0; i < 1; i++) {
			clockMinute += 15;
			clockMinuteCountdown = 0;

			if(clockMinute >= 60) {
				clockMinute = 0;
			}
		}
	} 

	if (clockHourCountdown >= 240) { 
		for (var i = 0; i < 1; i++) {
			clockHour += 1;
			clockHourCountdown = 0;

			if (clockHour >= 25) {
				clockHour = 0;	
			}

			if(clockHour == 7 || clockHour == 19) {
				dayTime = !dayTime;
			}
		}
	}

}// end of gameClock()

function skyFlickers() {
	if(skyFlickersNow) {
		skyFlickersTimer++;

		if(skyFlickersTimer <= 30) {
			skyColorGradient = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
			skyColor = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
		}
		if (skyFlickersTimer >= 30) {
			skyFlickersTimer = 0;
			skyFlickersNow = false;
		}
	}
}


function dayNight() {

	//night sky transition
	if (dayTime == false) { 

		colorOfTextforClock = 'white';

		//black = 0,0,0
		if(skyColor01 >= 1) { // turning down to 0
			skyColor01 --;
		}
		if(skyColor02 >= 1) { // turning down to 0
			skyColor02 --;
		}
		if(skyColor03 >= 1) { // turning down to 0
			skyColor03 --;
		}

		//blue = 0, 0, 204
		if(skyColorGradient01 >= 1) { // turning down to 0
			skyColorGradient01 --;
		}
		if(skyColorGradient02 >= 1) { // turning down to 0
			skyColorGradient02 --;
		}
		if(skyColorGradient03 <= 204) { // turning up to 205
			skyColorGradient03 ++;
		}

	}

	//morning sky transition
	if (dayTime == true) {

		colorOfTextforClock = 'black';

		//white = 255, 255, 255
		if(skyColor01 <= 254) { // turning up to 255
			skyColor01++;
		}
		if(skyColor02 <= 254) { // turning up to 255
			skyColor02++;
		}
		if(skyColor03 <= 254) { // turning up to 255
			skyColor03++;
		}

		//yellow = 255, 255, 0
		if(skyColorGradient01 <= 254) { // turning up to 255
			skyColorGradient01++;
		}
		if(skyColorGradient02 <= 254) { // turning up to 255
			skyColorGradient02++;
		}
		if(skyColorGradient03 >= 1) { // turning down to 0
			skyColorGradient03--;
		}
	}

	skyColor = fullColorHex(skyColor01, skyColor02, skyColor03);
	skyColorGradient = fullColorHex(skyColorGradient01, skyColorGradient02, skyColorGradient03);
}


function nextTurn() {
	if (incrementTurn) {
		nextTurnHeadline = true;
		arrayOfPlayers[playerTurn].myTurn = false;

		playerTurn++;
		if (playerTurn >= numberOfPlayers) {
			playerTurn = 0;
		}

		arrayOfPlayers[playerTurn].myTurn = true;

		incrementTurn = false;

		var remaningPlayers = numberOfPlayers;
		for (var i = 0; i < numberOfPlayers; i++) {
			if (arrayOfPlayers[i].active == false) {remaningPlayers--;}
		}
		if (remaningPlayers <= 1) {
			mode = WIN_SCREEN;
		}
	}
}


function inGameAnnoucements() {
	if(destroyedHeadline || nextTurnHeadline) {
		timerHeadline ++;

		if(destroyedHeadline) {
			if(timerHeadline >= 60) {
				colorText("Tank Destroyed!", canvas.width/2, 250, 'white', "50px Arial");
				
				}
			if(timerHeadline >= 120) {
				destroyedHeadline = false;	
			}
		}

		if(nextTurnHeadline) {

			if(timerHeadline >= 120 && dayTime) {
				colorText(arrayOfPlayers[playerTurn].name + "'s Turn", canvas.width/2, 150, `rgba(0,0,0,${fadeVariable})`, "50px Arial");
			} else if (timerHeadline >= 120) {
				colorText(arrayOfPlayers[playerTurn].name + "'s Turn", canvas.width/2, 150, `rgba(255,255,255,${fadeVariable})`, "50px Arial");
			}
			
			if(timerHeadline >= 180) {
				fadeVariable -= 0.01;
			}
		}

		if(timerHeadline >= 270) {
			destroyedHeadline = false;
			nextTurnHeadline = false;
			fadeVariable = 1.0;
			timerHeadline = 0;
		}
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