//Credit Screen

var posHeight = 100;
var count = 0;
var creditNameList = ['Toe Nail', 'Tommy Vercetti', 'Avril Lavigne', 'Input Name here', 'Jimmy Strong', 'Raymond Reddington', 
					'Anya Olsen', 'Recep Ivedik', 'HomeTeam', 'Bitcooooooonect', 'Chris DeLeooooooooooooon', 'Cmon a few names more',
					'here is one', 'a few left', 'Will it Blender', 'Lucid dreams'];

function modeCredits(frameTime) {
	canvasContext.drawImage (imageLoader.getImage("creditScreenBackground"), 0, 0);

	while (count < creditNameList.length){
		colorText(creditNameList[count], canvas.width/2, posHeight, "yellow", "20px Arial");
		posHeight = posHeight+20;
		count++;
	};

	btnManager.mainMenuButton.draw()

}
