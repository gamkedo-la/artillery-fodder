//Title Screen
var titleScreenImg;

function modeTitle(frameTime) {
	console.log(mode)
	titleScreenImg = imageLoader.getImage("titleScreenCover");
    canvasContext.drawImage(titleScreenImg,800,600);
	//colorText("Speech Recognition?", canvas.width/2 , canvas.height/2 + 10 , "black", "20px Arial");
	btnManager.mainMenuButton.draw()

}
