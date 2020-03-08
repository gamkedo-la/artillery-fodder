//Credit Screen

var creditsMaxCharWidthToWrap = 100;
var creditsScrollRate = 0.48;

var creditNameList = [
" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
"Michael \"Misha\" Fewkes: Project lead, core gameplay, initial terrain randomization, tank physics, majority of weapon types (jetpack, big shot, teleport shot, rolling shot, crazy bomb...), tank destruction desaturation, skin sprite sheet support, sound integration and related randomization, early test AI, button graphics, support for variable player count, song randomization, crosshair, terrain variation options, assorted bug fixes"," ",
"Simon J Hoffiz: Majority of menu code, turns support, game clock, time of day, cloud drift, weapons (meteor clash, rain shot), star particles, damage indicator, grenade weapon physics fixes, assorted UI improvements and related refactoring, "," ",
"I-wei Chen: Unified button functionality, start screen setup, logo animation, UI layout improvements, pause bug fix, slider widget, toggle button support, volume controls, scrolling menu background effect, graphic bug fixes"," ",
"Jeff \"Axphin\" Hanlon: Title screen support, metal and screw tile decorations for edges, logo, sound effects (20), 6 tank skins, button styling, game over screen"," ",
"Muhammed \"EyeForcz\" Durmusoglu: Mouse-only control option, winscreen background trophy model, credits screen support, lucky reflex feature"," ",
"Christer \"McFunkypants\" Kaitila: speech recognition, terrain decorations (grass, pebbles, cracks, sandy specks, etc.), terrain randomization improvements, muzzleflash, mouse hover detection, UI steel cutouts, health bars, base enemy AI, text shadow support, stats tracking and display, campaign map, win screen animations"," ",
"Alan Zaring: Gameplay music"," ",
"Gonzalo Delgado: Image loading, clouds, input fixes, burst-fire support, 3-shot cannon"," ",
"Randy Tan Shaoxian: Optimization, pause on loss of focus, mouse aiming"," ",
"Vaan Hope Khani: Tank skins, arrow and crosshair art"," ",
"Zak Ali: Headline color changes based on time of day"," ",
"Ryan Malm: Particle effects (initial functionality)"," ",
"Klaim (Joël Lamotte): gameplay background music, music selection system"," ",
"Chris DeLeon: Basic mouse code, compiled credits",
" ",
" ",
"Made by members of HomeTeam GameDev (Apollo!)"," ","Join at", "HomeTeamGameDev.com", "to make games with us!",
" ",
" ",
];

var creditsScroll = 0;

function modeCredits(frameTime) {
	var posHeight = 180;
	var count = 0;
	canvasContext.drawImage (imageLoader.getImage("creditScreenBackground"), 0, 0);

	var anyDrew = false;
	for (count; count < creditNameList.length; count++){
		var drawAt = posHeight+count*18-creditsScroll;
		if(drawAt > 160 && drawAt < 475) {
			colorText(creditNameList[count], canvas.width/2, drawAt, "white", "15px Arial");
			anyDrew = true;
		}
	}
	creditsScroll+=creditsScrollRate;
	if(anyDrew==false) { // reset, all off screen
		creditsScroll=0;
	}

	btnManager.mainMenuButton.draw()

}

function lineWrapCredits() { // note: gets calling immediately after definition
    var newCut = [];
    var findEnd;
    for(var i=0;i<creditNameList.length;i++) {
        while(creditNameList[i].length > 0) {
            findEnd = creditsMaxCharWidthToWrap;
            if(creditNameList[i].length > creditsMaxCharWidthToWrap) {
                for(var ii=findEnd;ii>0;ii--) {
                    if(creditNameList[i].charAt(ii) == " ") {
                        findEnd=ii;
                        break;
                    }
                }
            }
            newCut.push(creditNameList[i].substring(0, findEnd));
            creditNameList[i] = creditNameList[i].substring(findEnd, creditNameList[i].length);
        }
    }
    creditNameList = newCut;
}
lineWrapCredits(); // note: calling immediately as part of init, so the creditNameList will be autosliced whenever it's needed
