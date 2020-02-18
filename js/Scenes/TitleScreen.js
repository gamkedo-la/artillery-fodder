//Title Screen
var titleScreenImg;

function modeTitle(frameTime) {

	titleScreenImg = imageLoader.getImage("titleScreenCover");

	canvasContext.drawImage(titleScreenImg, 0, 0);
	colorText("[Space Bar] to START", canvas.width/2, 530, "Black", "30px Arial");

    if (Key.isJustPressed(Key.SPACE)
        || SpeechRecognition.pendingStartCommand()
        || mousePressed
    ){
		mode = MAIN_MENU;
		backgroundMusic.loopSong("./audio/music/gameplayMusicV1.mp3");
	}
}
