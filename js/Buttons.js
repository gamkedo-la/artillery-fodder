//A factory to create buttons.
/*
	Depends on imageloader object in Graphics.js

	Properties of a buttons
	Position on screen
	Graphics
	Text
	Functionality
*/

class buttonFactory
{
	constructor(_x,_y,_sizeX,_sizeY,_color,_text,_mode,_key,_sprite=0,_spriteSizeX=0,_spriteSizeY=0,_offset=0,_textColor="Black")
	{
		console.log("ButtonCreated")
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
		this.hover=false;
		this.startPos=this.x+500
		this.startSize=0
		this.sprite_animateTarget=this.x-this.spriteOffset
		this.size_animateTarget=this.x
		this.textColor=_textColor
	}

	process()
	{
		//check for hover over
		this.hover=isMouseInArea(this.x, this.y, this.sizeX,this.sizeY)? true : false
	
		var norestart=false
		// checks for mouse hotspot and key input
		if (isMouseInArea(this.x, this.y, this.sizeX,this.sizeY) && mouseJustPressed || Key.isJustPressed(this.key) ) 
		{
			console.log(mousePressed)
			mode=this.mode
			if (mode==PAUSE_SCREEN) {norestart=true}
			switch(this.mode)
			{
				case GAME_MODE:
					if(!norestart){startMatch()}
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
				
				//a black background for sprite
				//this.mode==GAME_MODE || this.mode==MAIN_MENU ? this.startSize=lerp(95,this.startSize,0.9) : this.startSize=lerp(50,this.startSize,0.9)
				//colorRect(this.x-this.startSize, this.y, this.startSize, this.sizeY, "Black")
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
										 "space_key",
										 90,
										 32,
										 90,
										 )
	this.campaignButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
													 (this._firstButtonPosY)+ (this._buttonSize + this._padding) * 1,
													 this._buttonLength,
													 this._buttonSize,
													 "Chocolate",
													 "Campaign Mode",
													 CAMPAIGN_SCREEN,
													 Key.a,
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
													 "i_key",
													 32,
													 32,
													 40,
													 )
													
	this.terrainScreenButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
													 (this._firstButtonPosY)+ (this._buttonSize + this._padding) * 4,
													 this._buttonLength,
													 this._buttonSize,
													 "DarkSlateBlue",
													 "Terrain Screen",
													 TERRAIN_SCREEN,
													 Key.t,
													 "t_key",
													 32,
													 32,
													 40,
													 )
	
	this.controlsButton = new buttonFactory( (canvas.width/2)-this._buttonLength/2,
													 (this._firstButtonPosY)+ (this._buttonSize + this._padding) * 5,
													 this._buttonLength,
													 this._buttonSize,
													 "Violet",
													 "Controls",
													 CONTROLS_SCREEN,
													 Key.c,
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
										 "space_key",
										 90,
										 32,
										 90,
										 "SlateGrey"
										 )
	
	this.quitButton = new buttonFactory(canvas.width-this._buttonLength,
										 canvas.height-100,
										 this._buttonLength,
										 this._buttonSize,
										 "Red",
										 "Quit",
									     MAIN_MENU,
									     Key.q,
										 )
	
	this.pauseButton = new buttonFactory(0,
									 canvas.height-100,
									 this._buttonLength,
									 this._buttonSize,
									 "Red",
									 "Pause",
									 PAUSE_SCREEN,
									 Key.p,
									 )
									 
	this.unPauseButton = new buttonFactory(canvas.width-this._buttonLength,
									 canvas.height-50,
									 this._buttonLength,
									 this._buttonSize,
									 "Red",
									 "unPause",
									 GO_TO_PREV_MODE,
									 Key.SPACE,
									"space_key",
									 90,
									 32,
									 90,
									 "Green"
									 )	
	}
	
	//This function is called in main.js update function
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
				this.mainMenuButton.process()
				break;
			
			default:
				this.mainMenuButton.process()
				break;
	
		}
			
		
	}
	
	
}
