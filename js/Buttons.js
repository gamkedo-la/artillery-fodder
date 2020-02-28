//A factory to create buttons.
/*
	Depends on imageloader object in Graphics.js

	Properties of a buttons
	Position on screen
	Graphics
	Text
	Functionality
*/

//use to create buttons and will process and draw itself when called.
var gamePaused = false;

class buttonFactory
{

	constructor(_x,_y,_sizeX,_sizeY,_color,_text,_mode,_key,_sethover=true,_sprite=0,_spriteSizeX=0,_spriteSizeY=0,_offset=0,_textColor="Black", _chapter=0)
	{
		this.x=_x;
		this.y=_y;
		this.sizeX=_sizeX;
		this.sizeY=_sizeY;
		this.color=_color;
		this.text=_text;
		this.mode=_mode;
		this.key=_key;
		this.sprite=imageLoader.getImage(_sprite);
		this.spriteSizeX=_spriteSizeX;
		this.spriteSizeY=_spriteSizeY;
		this.spriteOffset=_offset;
		this.sethover=_sethover;
		this.hover=_sethover;
		this.startPos=this.x+500;
		this.startSize=0;
		this.sprite_animateTarget=this.x-this.spriteOffset;
		this.size_animateTarget=this.x
		this.textColor=_textColor;
		this.chapter = _chapter;
	}

	process()
	{
		//check for hover over
		if(this.sethover)
		{
			this.hover=isMouseInArea(this.x, this.y, this.sizeX,this.sizeY)? true : false
		}

		// checks for mouse hotspot and key input
		if (isMouseInArea(this.x, this.y, this.sizeX,this.sizeY) && mouseJustPressed || Key.isJustPressed(this.key) )
		{
			soundMenu.play();

			mode=this.mode
			switch(this.mode)
			{
				case GAME_MODE:
					if (!gamePaused) {startMatch();}
					gamePaused = false;
					break;

				case PLAYER_SCREEN:
					populatePlayerScreen();
					break;

				case INVENTORY_SCREEN:
					populateInventoryScreen();
					break;

				case MAIN_MENU:
					map.init(canvas.width, canvas.height-UI_HEIGHT);
					break;

				case PAUSE_SCREEN:
					gamePaused = true;
					break;

				case CAMPAIGN_SCREEN:
					startChapter(this.chapter);
					break;

				default:
					break;

			}
		}

	}

	 draw()
	{
		var color=this.textColor
		var fontSize=20
		if(this.hover)
		{

			colorRect(this.x, this.y, this.sizeX, this.sizeY, this.color)
			if(this.sprite)
			{
				//Note: lerping animation parma1:finalTarget, param2:starting position
				this.startPos=lerp(this.sprite_animateTarget,this.startPos,0.9)
				canvasContext.drawImage(this.sprite,this.startPos, this.y,this.spriteSizeX,this.spriteSizeY);

			}
			color="white"
			fontSize=18


		}
		else
		{
			this.startPos=this.x+this.sizeX
			this.startSize=0
		}
		colorText(this.text, (this.x+this.sizeX/2) , this.y+fontSize, color, String(fontSize)+"px Arial")
	}

}


//This function is called in main.js application start function
//Create Buttons Here
class buttonsInit
{

	constructor()
	{

		//Shape description for buttons
		this._buttonSize=32
		this._padding=5
		this._buttonLength=180
		this._firstButtonPosY = 200



	 this.gameButton = new buttonFactory(canvas.width/2-this._buttonLength/2,
										 this._firstButtonPosY,
										 this._buttonLength,
										 this._buttonSize,
										 "Red",
										 "Start Game",
									     GAME_MODE,
									     Key.SPACE,
										 true,
										 "space_key",
										 90,
										 32,
										 90,
										 )
	this.campaignButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
											 (this._firstButtonPosY)+ (this._buttonSize + this._padding) * 1,
											 this._buttonLength,
											 this._buttonSize,
											 "Green",
											 "Campaign",
											 CAMPAIGN_SCREEN,
											 Key.a,
											 true,
											 "a_key",
											 32,
											 32,
											 40,
											 )

	this.playerSelectionButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
													(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 2,
													this._buttonLength,
													this._buttonSize,
													"Green",
													"Player Selection",
													PLAYER_SCREEN,
													Key.p,
													true,
													"p_key",
													32,
													32,
													40,
													)

	this.weaponInventoryButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
													(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 3,
													this._buttonLength,
													this._buttonSize,
													"Blue",
													"Weapons Inventory",
													INVENTORY_SCREEN,
													Key.i,
													true,
													"i_key",
													32,
													32,
													40,
													)

	this.terrainScreenButton = new buttonFactory(   (canvas.width/2)-this._buttonLength/2,
													(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 4,
													this._buttonLength,
													this._buttonSize,
													"DarkSlateBlue",
													"Terrain Screen",
													TERRAIN_SCREEN,
													Key.t,
													true,
													"t_key",
													32,
													32,
													40,
													)

	this.controlsButton = new buttonFactory((canvas.width/2)-this._buttonLength/2,
											(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 5,
											this._buttonLength,
											this._buttonSize,
											"Violet",
											"Controls",
											CONTROLS_SCREEN,
											Key.c,
											true,
											"c_key",
											32,
											32,
											40,
											)

	this.optionsButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
											(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 6,
											this._buttonLength,
											this._buttonSize,
											"Brown",
											"Options",
											OPTIONS_SCREEN,
											Key.o,
											true,
											"o_key",
											32,
											32,
											40,
											)

	this.creditsButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
											(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 7,
											this._buttonLength,
											this._buttonSize,
											"Chocolate",
											"Credits",
											CREDITS_SCREEN,
											Key.r,
											true,
											"r_key",
											32,
											32,
											40,
											)


	this.mainMenuButton = new buttonFactory(canvas.width/2-this._buttonLength/2,
											canvas.height-100,
											this._buttonLength,
											this._buttonSize,
											"YellowGreen",
											"Main Menu",
										    MAIN_MENU,
										    Key.SPACE,
											true,
											"space_key",
											90,
											32,
											90,
											"SlateGrey"
											)

	this.quitButton = new buttonFactory(canvas.width-this._buttonLength,
										canvas.height-80,
										this._buttonLength,
										this._buttonSize,
										"Red",
										"Quit",
									    MAIN_MENU,
									    Key.q,
										false
										)

	this.pauseButton = new buttonFactory(0,
										 canvas.height-80,
										 this._buttonLength,
										 this._buttonSize,
										 "Red",
										 "Pause",
										 PAUSE_SCREEN,
										 Key.p,
										 false
										 )

	this.unPauseButton = new buttonFactory(canvas.width-this._buttonLength,
										   canvas.height-50,
										   this._buttonLength,
										   this._buttonSize,
										   "Red",
										   "unPause",
										   GAME_MODE,
										   Key.SPACE,
										   true,
										   "space_key",
										   90,
										   32,
										   90,
										   "Green"
										   )

	//Buttons for Campaign Screen

	 this.chapter01 = new buttonFactory(canvas.width/2-this._buttonLength/2,
										this._firstButtonPosY,
										this._buttonLength,
										this._buttonSize,
										"Red",
										"Chapter 1",
									    CAMPAIGN_SCREEN, // loophole placeholder destination
									    Key.ONE,
										true,
										"C_key",
										90,
										32,
										90,
										"Black",
										1
										)
 	 this.chapter02 = new buttonFactory(canvas.width/2-this._buttonLength/2,
										(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 1,
										this._buttonLength,
										this._buttonSize,
										"Red",
										"Chapter 2",
									    CAMPAIGN_SCREEN, // loophole placeholder destination
									    Key.TWO,
										true,
										"C_key",
										90,
										32,
										90,
										"Black",
										2
										)
 	this.chapter03 = new buttonFactory( canvas.width/2-this._buttonLength/2,
										(this._firstButtonPosY)+ (this._buttonSize + this._padding) * 2,
										this._buttonLength,
										this._buttonSize,
										"Red",
										"Chapter 3",
									    CAMPAIGN_SCREEN, // loophole placeholder destination
									    Key.THREE,
										true,
										"C_key",
										90,
										32,
										90,
										"Black",
										3
										)
	}

	//This function is called in main.js update function to draw and process the buttons
	update(_frametime)
	{

		switch(mode)
		{
			case GAME_MODE:
				this.quitButton.process()
				this.pauseButton.process()
				break;

			case MAIN_MENU:
				this.gameButton.process()
				this.playerSelectionButton.process()
				this.weaponInventoryButton.process()
				this.terrainScreenButton.process()
				this.controlsButton.process()
				this.optionsButton.process()
				this.creditsButton.process()
				this.campaignButton.process()
				break;

			case PAUSE_SCREEN:
				this.unPauseButton.process()
				break;

			case INVENTORY_SCREEN:
				this.mainMenuButton.process()
				break;

			case CAMPAIGN_SCREEN:
				this.chapter01.process()
				this.chapter02.process()
				this.chapter03.process()
				this.mainMenuButton.process()
				break;


			default:
				this.mainMenuButton.process()
				break;

		}


	}


}
