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
					playMainMenyBackgroundMusic();
					backgroundMusic.resumeSound();
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
			color="Black"
			fontSize=18


		}
		else
		{
			this.startPos=this.x+this.sizeX
			this.startSize=0
		}
		if(this.text=="Main Menu") //Note: comparing strings is dangerous
		{
			colorRect(this.x, this.y, this.sizeX, this.sizeY, "White")
			colorText(this.text, (this.x+this.sizeX/2) , this.y+fontSize, color, String(fontSize)+"px Arial")
		}
		else
		{
			colorText(this.text, (this.x+this.sizeX/2) , this.y+fontSize, color, String(fontSize)+"px Arial")
		}
	}

}




class sliderFactory
{
	constructor(_x,_y,_sX,_sY,_text,_textColor,_barColor,_rightBtnKey,_leftBtnKey)
	{
		this.x=_x
		this.y=_y
		this.height=_sX
		this.length=_sY
		this.frame=imageLoader.getImage("sliderFrame")
		this.btnFrame=imageLoader.getImage("buttonFrame")
		this.rightBtnX=this.x+this.length
		this.rightBtnY=this.y
		this.leftBtnX=this.x-this.height
		this.leftBtnY=this.y
		this.buttonDimension=this.height

		//Slider parameters
		this.sliderValue=0
		this.sliderText=_text
		this.sliderTextColor=_textColor
		this.sliderBarColor=_barColor
		this.keyRightBtn=_rightBtnKey
		this.keyLeftBtn=_leftBtnKey
	}
	process(_valueToUpdate,_func1,_func2)
	{
		// checks for mouse hotspot and key input (Right btn)
		if (isMouseInArea(this.rightBtnX, this.rightBtnY, this.buttonDimension,this.buttonDimension) && mouseJustPressed || Key.isJustPressed(this.keyRightBtn) )
		{
			_func1()
		}

		// checks for mouse hotspot and key input (Left btn)
		if (isMouseInArea(this.leftBtnX, this.leftBtnY, this.buttonDimension,this.buttonDimension) && mouseJustPressed || Key.isJustPressed(this.keyLeftBtn))
		{
			_func2()
		}

		this.sliderValue=_valueToUpdate
	}


	draw(reposition=false,_x,_y)
	{
		//Text for slider
		colorText(this.sliderText, this.x+this.length/2, this.y-10, this.sliderTextColor, "35px Arial");
		//bg
		colorRect(this.x+20, this.y+5, this.length-25, this.height-10, "White")
		//bar
		colorRect(this.x+20, this.y+5, (this.length-30)*this.sliderValue, this.height-10, this.sliderBarColor)
		//frame for slider
		canvasContext.drawImage(this.frame,this.x,this.y,this.length,this.height)
		//right button
		canvasContext.drawImage(this.btnFrame,this.rightBtnX,this.rightBtnY,this.buttonDimension,this.buttonDimension)
		colorText("+", this.x+this.length+this.height/2, this.y+38, "White", "45px Arial");
		//left button
		canvasContext.drawImage(this.btnFrame,this.leftBtnX,this.leftBtnY,this.height,this.height)
		colorText("-", this.x-this.height/2, this.y+36, "White", "50px Arial");
	}
}



class toggleFactory
{
	constructor(_x,_y,_length,_message,_textColor,_keybind)
	{
		this.x=_x,
		this.y=_y,
		this.length=_length
		this.message=_message,
		this.textColor=_textColor,
		this.keybind=_keybind
		this.btnFrame=imageLoader.getImage("buttonFrame")
		this.value=false;
	}

	process()
	{
	     // if we JUST pressed the mouse button, maybe create or toggle existing speech recognition
		if (isMouseInArea(this.x + this.length+50, this.y, 50, 50) && mouseJustPressed) {
			this.value = !this.value;
		}

	}

	draw()
	{

		canvasContext.drawImage(this.btnFrame,this.x + this.length+50,this.y,50,50)
		colorRoundedRect(this.x,this.y,this.length,50,"DeepSkyBlue")

		//Message
		colorText(this.message, this.x + this.length/2 , this.y + 30, this.textColor, "25px Arial");
		//Toggle Text
		colorText(this.value?"ON":"OFF",this.x+25 + this.length+50, this.y+30 , this.value?"Yellow":"Red", "20px Arial");
	}

	getValue()
	{
		return this.value
	}
	
}

class radioFactory
{
	constructor(_x,_y,_length,_spacing,_textColor,..._message)
	{
		this.x=_x
		this.y=_y
		this.length=_length
		this.message=_message
		this.spacing=_spacing
		this.textColor=_textColor
		this.btnFrame=imageLoader.getImage("buttonFrame")
		this.value=[]
		this.active=0
	}
	
	checkEmpty()
	{
		for (var i = 0; i < this.message.length; i++){
			if(this.value.length <= i){
				
				if (i == 0){
					this.value.push(true);
				}else{
					this.value.push(false);
				}
			}	
		}
	}
	process()
	{
	     // if we JUST pressed the mouse button toggle everything around
		for (var i = 0; i < this.message.length; i++){
			if (isMouseInArea(this.x + this.length+50, this.y+i*this.spacing, 50, 50) && mouseJustPressed) {
					this.active = i;	
			}
			
			if (i == this.active){				
				this.value[i] = true;
				
			}else{
				this.value[i] = false;
			}
		}
	}
	
	draw()
	{
		for(var i = 0; i < this.message.length; i++){
			canvasContext.drawImage(this.btnFrame,this.x + this.length+50,this.y+i*this.spacing,50,50)
			colorRoundedRect(this.x,this.y+i*this.spacing,this.length,50,"DeepSkyBlue")
			
			//Message
			colorText(this.message[i], this.x + this.length/2 , this.y + 30 + (i*this.spacing), this.textColor, "25px Arial");
			//Toggle Text
			colorText(this.value[i]?"ON":"OFF",this.x+25 + this.length+50, this.y+30 + (i*this.spacing) , this.value[i]?"Green":"Red", "20px Arial");
		}
	}
	
	getValue(N)
	{
		return this.value[N]
	}
}


