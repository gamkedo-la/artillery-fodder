//Title Screen
var titleScreenImg;
var logo;
var animate=0;

function modeTitle(frameTime) {

	titleScreenImg = imageLoader.getImage("titleScreenCover");
	logo=imageLoader.getImage("logo");
    canvasContext.drawImage(titleScreenImg,0,0);
	animate=lerp(100,animate,0.95)
	canvasContext.drawImage(logo,canvas.width/2-(389/2),animate,389,149);
	btnManager.mainMenuButton.draw()

}
