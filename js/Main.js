var canvas, canvasContext, debugText;
var framesPerSecond = 30;

var numberOfPlayers = 4;
var arrayOfPlayers = [];
var arrayOfTemporaryObjects = [];
var particles = new ParticlePool(2000);
var particlesStars = new ParticlePool(1000);

var playerTurn = 0;
var incrementTurn = false;
var fadeVariable = 1.0;
var destroyedHeadline = false;
var nextTurnHeadline = true;
var timerHeadline = 0;
var playerScreenWave = 0;

var deltaTime = 0;
var lastFrameTime = window.performance.now();
var elapsed = 0;
var frameStepSize = 1/60;
var now;

//clock
var clockMinute = 0;
var clockHour = 18;
var clockHourCountdown = 0;
var clockMinuteCountdown = 0;
var dayTime;
var colorOfTextforClock;

//damage amount indicator 
var damageAmountIndicatorTimer = 0;
var damageAmountFloat = 20;
var damageAmountShake = 20;

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

//weather
var weather;


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
const PAUSE_SCREEN = 10;
const CAMPAIGN_SCREEN = 11;
const GO_TO_PREV_MODE = 99;
var mode = TITLE_SCREEN;
var prevMode = mode;

//Buttons : A button Manager to help to instance created buttons
var btnManager=0;

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

var buttonImg;
var gameScreenOverlayImg;

var map = new terrain();
var SpeechRecognition = new SpeechRecognitionEngine();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.textAlign = "center";
	mouseInit();

	window.addEventListener('blur', function () {
		if (mode === GAME_MODE) {
			prevMode = mode;
			mode = PAUSE_SCREEN;
		}
	});

	imageLoader.loadImages().then(applicationStart);
}

function applicationStart() {

	map.init(canvas.width, canvas.height-UI_HEIGHT);

	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i] = new tankPlayerClass();

		arrayOfPlayers[i].name = "Player " + pad(i+1, 2);
		arrayOfPlayers[i].x = lerp(0, canvas.width, (i+1)/(numberOfPlayers+1));
		arrayOfPlayers[i].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[i].x);
		arrayOfPlayers[i].angle = lerp(45, 135, i/(numberOfPlayers-1)); 
		arrayOfPlayers[i].color = rndFloat(359);
		arrayOfPlayers[i].tankSkinIndex = rndInt(0, 3);
		arrayOfPlayers[i].imageLookupOffset = i;

	}

	arrayOfPlayers[0].myTurn = true;
	buildTankSkinsSheet();

	cloudImg = imageLoader.getImage("cloud1");
	for (let i=0; i<MAX_CLOUDS; i++) {
		cloudPositions[i] = {
			x: Math.floor(Math.random()*(canvas.width - cloudImg.width/2)),
			y: Math.floor(Math.random()*(325 - cloudImg.height))
		};
		cloudSpeeds[i] = (Math.random() * (0.2 - 0.05) + 0.05) * 60;
	}


	buttonImg = imageLoader.getImage("buttons");
	gameScreenOverlayImg = imageLoader.getImage("gamescreen-overlay");

	window.requestAnimationFrame(frameLoop);
	
	btnManager=new buttonsCreate()
	
}

function frameLoop() {

	now = window.performance.now();

	deltaTime = deltaTime + Math.min(1, (now-lastFrameTime) / 1000);

	if (deltaTime > frameStepSize) {
		deltaTime = deltaTime - frameStepSize;
		update(frameStepSize);
	}

	lastFrameTime = now;

	window.requestAnimationFrame(frameLoop);
}

function update(frameTime) {	
	switch (mode) {
		case GAME_MODE:
			prevMode=MAIN_MENU
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
		case PAUSE_SCREEN:
			modePause(frameTime);
			break;
		case CAMPAIGN_SCREEN:
			modeCampaign(frameTime);
			break;
		case GO_TO_PREV_MODE:
			modePrevMode(prevMode);
			break;
	}

	if (Key.isJustPressed(Key.BRACKET_LEFT)){
		turnMusicVolumeDown()
	}
	if (Key.isJustPressed(Key.BRACKET_RIGHT)){
		turnMusicVolumeUp();
	}
	
	if (Key.isJustPressed(Key.MINUS)){
		turnEffectsVolumeDown()
	}
	if (Key.isJustPressed(Key.PLUS)){
		turnEffectsVolumeUp();
	}


	playerScreenWave += frameTime * 45;

	backgroundMusic.updateMusic(frameTime);
	
	btnManager.update();
	
	Key.update();
}

function modePrevMode(prevMode) {
	mode = prevMode;
}

function startMatch() {
	
	groundColor = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
	groundColorGradient = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
	
	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i].x = lerp(0, canvas.width, (i+1)/(numberOfPlayers+1));
		arrayOfPlayers[i].y = canvas.height - UI_HEIGHT - map.getHeightAtX(arrayOfPlayers[i].x);
		arrayOfPlayers[i].angle = lerp(45, 135, i/(numberOfPlayers-1));
		arrayOfPlayers[i].power = 75;
		arrayOfPlayers[i].health = 100;
		arrayOfPlayers[i].weapon = 0;
		arrayOfPlayers[i].weaponInventory = weaponInventoryMaster.slice();
		arrayOfPlayers[i].myTurn = false;
		arrayOfPlayers[i].active = true;
	}
	incrementTurn = false;
	playerTurn = 0;
	arrayOfTemporaryObjects = [];

	arrayOfPlayers[0].myTurn = true;
	buildTankSkinsSheet();
}

function gameClock() {
 
	clockHourCountdown ++;
	clockMinuteCountdown ++;

	colorText(pad(clockHour, 2) + ":" + pad(clockMinute, 2), 700, 30, colorOfTextforClock, "15px Arial");

	if(clockMinuteCountdown >= 240) {
		for (var i = 0; i < 1; i++) {
			clockMinute += 15;
			clockMinuteCountdown = 0;

			if(clockMinute >= 60) {
				clockMinute = 0;
			}
		}
	} 

	if (clockHourCountdown >= 960) { 
		for (var i = 0; i < 1; i++) {
			clockHour += 1;
			clockHourCountdown = 0;

			if (clockHour >= 25) {
				clockHour = 0;	
			}

			if(clockHour == 7 || clockHour == 19) {
				if (rndOneIn(4)) {
					weather = Math.floor(rndFloat(0,3));
				} else {
					weather = 0;
				}
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

function handlingWeather() {

	if(weather == 1) { //rain
		let rain = 15;
			while(--rain){
			particles.spawn(
			rndFloat(0, canvas.width), //spawning point for x
			rndFloat(0, canvas.height), // spawning point for y
			0, // how much it sways as its falling 
			rndFloat(200,400), // dropping speed
			1,
			rndFloat(2,4),
			40,
			0)
		}
	}

	if(weather == 2) { //snow or ashfall
		let snow = 15;
		while(--snow){
			particles.spawn(
			rndFloat(0, canvas.width), //spawning point for x
			rndFloat(0, canvas.height), // spawning point for y
			rndFloat(-40,40), // how much it sways as its falling 
			rndFloat(10,40), // dropping speed
			1,
			1,
			40,
			0)
		}
	}
} // end of handlingWeather

function nightSky() {
	var starlife;

	if(dayTime == false){
			if(clockHour == 19) { // slowly fading in stars when night hits
		starSpawning = Math.random();

		if(starSpawning <= .8){
			starlife = 0;
		}

		if (starSpawning >= .81){
			starlife = rndFloat(700,900);
		}
	}

		if(clockHour == 20) {
			starlife = rndFloat(300,900);
		}

		if(clockHour >= 21) {
			starlife = 900;
		}

		if(clockHour <= 5) {
			starlife = 900;
		}

		if(clockHour == 6) { // fading out stars before morning hits
			if (clockMinute >= 15){
				starlife = 0;
			} else { 
				starlife = 900;
			}
		}
		
		let stars = 2;
		while(--stars){
			particlesStars.spawn(
			rndFloat(0, canvas.width), //spawning point for x
			rndFloat(0, canvas.height), // spawning point for y
			0, // how much it sways as its falling 
			0, // dropping speed
			1,
			1,
			starlife,
			0)
		}
	}
	
}

function dayNight() {
	if(clockHour >= 7 && clockHour <= 18) {
		dayTime = true;
	} else {
		dayTime = false;
	}

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

		nightSky();
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

	handlingWeather();
}

// used to detect if we need to trigger game over in tank.destroy()
function numberOfTanksAlive() {
    var count = 0;
    for (i=0; i<arrayOfPlayers.length; i++) {
        if (arrayOfPlayers[i].active) count++;
    }
    console.log("Number of tanks left: " + count);
    return count;
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

	if(damageAmountIndicator) {

		damageAmountIndicatorTimer ++;

		if(damageAmount > 0 && damageAmountIndicatorTimer <= 40 )  {
				colorText(Math.floor(damageAmount), damageAmountPosX + damageAmountShake, damageAmountPosY - damageAmountFloat, 'red', "20px Arial");
		}

		damageAmountFloat += 0.5;
		damageAmountShake = rndFloat(5,8);

		if(damageAmountIndicatorTimer >= 40) {
			damageAmountIndicator = false;
			damageAmountIndicatorTimer = 0;
			damageAmountFloat = 20;
			damageAmountShake = 20;
		}
	}
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


function cleanLists() {
	for (var i = 0; i < arrayOfTemporaryObjects.length; i++) {
		if (!arrayOfTemporaryObjects[i].active) {
			arrayOfTemporaryObjects.splice(i, 1);
			i--;
		}
	}

	if (incrementTurn && arrayOfTemporaryObjects.length <= 0) {
		nextTurn();
	}
}







