//Credit Screen


var creditNameList = ['Toe Nail', 'Tommy Vercetti', 'Avril Lavigne', 'Input Name here', 'Jimmy Strong', 'Raymond Reddington', 
					'Anya Olsen', 'Recep Ivedik', 'HomeTeam', 'Bitcooooooonect', 'Chris DeLeooooooooooon', 'Cmon a few names more',
					'here is one', 'a few left', 'Will it Blender', 'Lucid dreams'];

function modeCredits(frameTime) {
	var posHeight = 180;
	var count = 0;
	canvasContext.drawImage (imageLoader.getImage("creditScreenBackground"), 0, 0);

	for (count; count < creditNameList.length/2; count++){
		colorText(creditNameList[count], 230, posHeight+count*35, "white", "27px Arial");
	}
	
	for (count; count < creditNameList.length; count++){
		colorText(creditNameList[count], 570, posHeight+(count-creditNameList.length/2)*35, "white", "27px Arial");
	}
	
	btnManager.mainMenuButton.draw()

}
