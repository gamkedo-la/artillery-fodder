//Title Screen
var titleScreenImg;

function modeTitle(frameTime) {

	titleScreenImg = imageLoader.getImage("titleScreenCover");

	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");	
	colorRect(100, 100, canvas.width-200, canvas.height-200, "Grey");
	colorText("Artillery Fodder", canvas.width/2, canvas.height/2, "White", "50px Arial");
	canvasContext.drawImage(titleScreenImg, 0, 0);
	colorText("Press [Space Bar] to START", canvas.width/2, canvas.height/2 + 100, "Black", "20px Arial");

    if (Key.isJustPressed(Key.SPACE)
        || SpeechRecognition.pendingStartCommand()
        || mousePressed
    ){
		mode = MAIN_MENU;
		backgroundMusic.loopSong("./audio/music/gameplayMusicV1.mp3");
	}
}
