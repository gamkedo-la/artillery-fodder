//this makes use of what's known as a ring buffer. Fixed size, nothing deleted, just overwritten.
//https://en.wikipedia.org/wiki/Circular_buffer

const ParticlePool = function ParticlePool(size){
    /*
    this.x = x;
    this.y = y;
    this.prevX = 0;
    this.prevY = 0;
    this.width = width;
    this.height = height;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.color = color;
    this.type = type;
    */  //11 parameters
    this.size = size;
    this.tuple = 11;
    this.pool = new Float32Array(this.size * this.tuple).fill(0);
    this.i = 0;
    this.nothingDead = false;
    
    return this;
}

ParticlePool.prototype.colors = [
"rgba(255,255,255,1)",           //white 0
"rgba(255,255,0,1)",             //yellow 1
]
ParticlePool.prototype.spawn = function(x, y , vx, vy, width=1, height=1, life = 40, type=0){
    for(let l = 0; l < 15; l++){
        for(let i = 0; i <= this.pool.length; i+=this.tuple){
            if(this.pool[i] <= l){
                this.pool[i] = life;
                this.pool[i+1] = x;
                this.pool[i+2] = y;
                this.pool[i+3] = vx;
                this.pool[i+4] = vy;
                this.pool[i+5] = width;
                this.pool[i+6] = height;
                this.pool[i+7] = 0 //color;
                this.pool[i+8] = type;
                this.pool[i+9] = 0; //prevX
                this.pool[i+10] = 0; //prevY
                break;
            }
        }  
    }
    
    //reset counter 
    if(this.i >= this.size*this.tuple-this.tuple) this.i = 0; 
}

ParticlePool.prototype.draw = function draw(){
    canvasContext.save();
    for(let i = 0; i<=this.pool.length-this.tuple; i+=this.tuple){

        if(this.pool[i] <= 0){i+=this.tuple}else{
           // console.log(this.pool[i+1], this.pool[i+2]);
                switch(this.pool[i+8]) {
                    case 1: //they shrink as they die.
                        canvasContext.fillStyle = "orange"
                        canvasContext.fillRect(
                            this.pool[i+1],
                            this.pool[i+2],
                            this.pool[i]/3,
                            this.pool[i]/3
                            );
                        break;

                    case 2: //they shrink as they die.
                        canvasContext.fillStyle = "white"
                        canvasContext.fillRect(
                            this.pool[i+1],
                            this.pool[i+2],
                            this.pool[i+5],
                            this.pool[i+6]
                            );
                        break;
                    
                    default: //plain box render
                        canvasContext.fillStyle = "gray"
                        canvasContext.fillRect(
                            this.pool[i+1],
                            this.pool[i+2],
                            this.pool[i+5],
                            this.pool[i+6]
                            );
                }    
             
        } 
         
    }
    canvasContext.restore();    
}

ParticlePool.prototype.update = function update(dt){
    
    for(let i = 0; i<=this.pool.length-this.tuple; i+=this.tuple){
        //if life is zero, skip update, increment i 1 tuple. 
        //we don't delete particles, we just don't update or draw them
        this.pool[i] = this.pool[i]-1; //life--
        this.pool[i+9] = this.pool[i+1]; //prevX = this X
        this.pool[i+10] = this.pool[i+2]; //prevY = this Y;
        this.pool[i+1] += this.pool[i+3]*dt; //x += vx;
        this.pool[i+2] += this.pool[i+4]*dt; //y += vy;
        
        if(this.pool[i]<=0){i+=this.tuple; this.kill(i)}
        
    }
   
}

ParticlePool.prototype.kill = function kill(index){
    this.pool.fill(0, index, index+10)
}
