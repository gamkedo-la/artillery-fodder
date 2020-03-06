const imageLoader = new (function() {
	const IMAGE_DEFS = [
		{id: "cloud1", src: "./images/cloud1.png"},
		{id: "tankSpriteSheet", src: "./images/tankSkins.png"},
        {id: "buttons", src: "./images/buttons.png"},
        {id: "decorations", src: "./images/decorations.png"},
        {id: "titleScreenCover", src: "./images/TitleScreen_nLogo.png"},
		{id: "winScreenBackground", src: "./images/winscreen.png"},
		{id: "creditScreenBackground", src: "./images/creditscreen.png"},
		{id: "logo", src: "./images/TitleScreen-Logo.png"},
        {id: "crosshair", src: "./images/crosshair.png"},
        {id: "selector", src: "./images/TankSelector.png"},
		{id: "space_key", src: "./images/keysPNG/space_key.png"},
		{id: "p_key", src: "./images/keysPNG/P_key.png"},
		{id: "i_key", src: "./images/keysPNG/I_key.png"},
		{id: "t_key", src: "./images/keysPNG/T_key.png"},
		{id: "c_key", src: "./images/keysPNG/C_key.png"},
		{id: "o_key", src: "./images/keysPNG/O_key.png"},
		{id: "r_key", src: "./images/keysPNG/R_key.png"},
		{id: "a_key", src: "./images/keysPNG/A_key.png"},
		{id: "gamescreen-overlay", src: "./images/gamescreen-overlay.png"},
		{id: "sliderFrame", src:"./images/sliderFrame.png"},
        {id: "buttonFrame", src:"./images/buttonFrame.png"},
        {id: "map", src:"./images/map.png"},
		{id: "BgTile",src:"./images/af_menu_bg_tile.png"},
		{id: "BgTileWhite",src:"./images/af_menu_bg_tile_w.png"}
		
		
		
	];
	const images = {};

	this.loadImages = function() {
		return Promise.all(IMAGE_DEFS.map(function(imageDef) {
			return new Promise(function(resolve, reject) {
				const image = new Image();
				image.onload = function() {
					resolve({id: imageDef.id, image: image});
				}
				image.onerror = function() {
					reject(image);
				}
				image.src = imageDef.src;
			});
		})).then(function(values) {
			values.forEach(function(value) {
				images[value.id] = value.image;
			});
			Object.freeze(images);
		});
	};

	this.getImage = function(id) {
		if (images[id]!=0)
		{
			return images[id];
		}else
		{
			return false
		}
	};

	this.getAllImages = function() {
		return images;
	};
})();

var tankSkinCanvas = document.createElement("canvas");
var tankSkinContext = tankSkinCanvas.getContext("2d");
function buildTankSkinsSheet() {
	tankSkinCanvas.width = numberOfPlayers * 30;
	tankSkinCanvas.height = 400;

	for (var i = 0; i < numberOfPlayers; i++) {
		if (!arrayOfPlayers[i].active) {
			tankSkinContext.filter = 'brightness(0)';
		} else {
			tankSkinContext.filter = 'hue-rotate('+arrayOfPlayers[i].color+'deg)';
		}
		tankSkinContext.drawImage(imageLoader.getImage("tankSpriteSheet"), 
			arrayOfPlayers[i].tankSkinIndex * 30, 0, 
			30, 60, 
			i * 30, 0,  
			30, 60);
	}
}


function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function colorEmptyCircle(centerX, centerY, radius, strokeColor) {
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	canvasContext.strokeStyle = strokeColor;
	canvasContext.stroke();
}

function colorLine(startX, startY, endX, endY, lineWidth, fillColor) {
	canvasContext.strokeStyle = fillColor;
	canvasContext.lineWidth = lineWidth;
	canvasContext.beginPath();
	canvasContext.moveTo(startX, startY);
	canvasContext.lineTo(endX, endY);
	canvasContext.stroke();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colorText(showWords, textX,textY, fillColor, font = "30px Arial", shadow = false) {
	canvasContext.font = font;
    if (shadow) {
        canvasContext.fillStyle = 'black';
        canvasContext.fillText(showWords, textX+1, textY+1);    
    }
	canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}

function colorRoundedRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	
	canvasContext.beginPath()
	canvasContext.fillStyle = fillColor;
	canvasContext.arc(topLeftX, topLeftY+boxHeight/2, boxHeight/2, 0,2 * Math.PI)
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
	canvasContext.arc(topLeftX+boxWidth, topLeftY+ boxHeight/2, boxHeight/2, 0,2 * Math.PI)
	canvasContext.closePath()
	canvasContext.fill()


}

scrollY=0 //global variable used for scrolling background
//Takes in a speed and image which is at a size of w:80, h:60
function drawBg(_scrollSpeed,_img){
	canvasContext.save()
	if (scrollY<(-660*1.8)) {scrollY=0} 
		
		canvasContext.translate(0,scrollY-=_scrollSpeed);
		canvasContext.scale(1.8,1.8)
		for (j=0;j<11;j++)
		{
			for (i=0;i<11;i++)
			{
			  canvasContext.drawImage(imageLoader.getImage(_img),0+(i*80),0+(j*60),80,60);
			   canvasContext.drawImage(imageLoader.getImage(_img),0+(i*80),660+(j*60),80,60);
			}
		}
	
		canvasContext.restore()
}

function buildBG()
{
	
}