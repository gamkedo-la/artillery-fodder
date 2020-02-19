const imageLoader = new (function() {
	const IMAGE_DEFS = [
		{id: "cloud1", src: "./images/cloud1.png"},
		{id: "tankSpriteSheet", src: "./images/tankSkins.png"},
        {id: "buttons", src: "./images/buttons.png"},
        {id: "decorations", src: "./images/decorations.png"},
        {id: "titleScreenCover", src: "./images/TitleScreen.png"},
        {id: "crosshair", src: "./images/crosshair.png"},
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
		return images[id];
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
			30, 40, 
			i * 30, 0,  
			30, 40);
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

function colorText(showWords, textX,textY, fillColor, font = "30px Arial") {
	canvasContext.fillStyle = fillColor;
	canvasContext.font = font;
	canvasContext.fillText(showWords, textX,textY);
}