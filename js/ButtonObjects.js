//This function is called in main.js application start function
//Create Buttons Here
class buttonsCreate
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
	
	
	
	//Slider buttons for volume and effects control.

	this.musicSlider   = new sliderFactory(120,225,45,500,"Music","White","DodgerBlue",Key.BRACKET_RIGHT,Key.BRACKET_LEFT)
	this.effectsSlider = new sliderFactory(120,325,45,500,"Sound Effects","White","Yellow",Key.PLUS,Key.Minus)
	
	//Speech recognition toggle button
	this.speechToggle = new toggleFactory(250,400,200,"Speech Recognition","Black")
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
				this.musicSlider.process(musicVolume)
				this.effectsSlider.process(effectsVolume)
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

			case OPTIONS_SCREEN:
				this.mainMenuButton.process()
				this.musicSlider.process(musicVolume,turnMusicVolumeUp,turnMusicVolumeDown)
				this.effectsSlider.process(effectsVolume,turnEffectsVolumeUp,turnEffectsVolumeDown)
				this.speechToggle.process()
				break;
			default:
				this.mainMenuButton.process()
				break;

		}


	}


}