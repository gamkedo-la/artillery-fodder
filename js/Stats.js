// stats db for the game over screen

var stats = {

    turns:1,
    shots:0,
    damage:0,
    seconds:0,
    misses:0,
    hits:0,
    frames:0,
    explosions:0,

    winScreensInARow:0,

    drawWinScreen: function() {
        
        var x = 600; // starting pos
        var y = 200;
        var h = 16; // line height
        var c = "white"; // colour
        var f = "16px Courier"; // font
        var s = true; // shadow
        var n = 1; // line number
        var d = 30; // delay frames per line

        this.winScreensInARow++;
        var i = this.winScreensInARow;

        // vertical, animated "count-up"
        if (i>d*n) colorText("Endgame Stats:",x,y,c,f,s);
        y += h; // blank line
        if (i>d*n) colorText(Math.min(i-d*n,this.explosions)+" explosions",x,y+(h*n++),c,f,s);
        if (i>d*n) colorText(Math.min(i-d*n,this.shots)+" shots",x,y+(h*n++),c,f,s);
        if (i>d*n) colorText(Math.min(i-d*n,this.hits)+" hits",x,y+(h*n++),c,f,s);
        if (i>d*n) colorText(Math.min(i-d*n,this.misses)+" misses",x,y+(h*n++),c,f,s);
        if (i>d*n) colorText(Math.min(i-d*n,this.damage).toFixed(0)+" damage",x,y+(h*n++),c,f,s);
        if (i>d*n) colorText(Math.min(i-d*n,this.turns)+" turns",x,y+(h*n++),c,f,s);
        if (i>d*n) colorText(Math.min(i-d*n,this.seconds).toFixed(1)+" seconds",x,y+(h*n++),c,f,s);
        if (i>d*n) colorText(this.frames.toFixed(0)+" frames",x,y+(h*n++),c,f,s);

    },

    draw: function(largemode=false) {

        var x = Math.round(canvas.width/2); // starting pos
        var y = 22;
        var h = 16; // line height
        var c = "white"; // colour
        var f = "9px Courier"; // font
        var s = true; // shadow
        var n = 1; // line number
        
        this.winScreensInARow = 0; // possibly reset from prev game

        // FIXME this is a lie, but a rough approximation
        this.misses = Math.max(Math.round(this.explosions - this.hits),0);

        // mini stats display
        colorText(
            //"STATS: "
            //+ this.turns.toFixed(0)+" turns "
            + this.shots.toFixed(0)+" shots "
            + this.hits.toFixed(0)+" hits "
            //+ this.misses.toFixed(0)+" misses " // not tracked correctly
            //calculate misses as (explosions - hits) does this work? FIXME
            //+ Math.max(Math.round(this.explosions - this.hits),0)+" misses "
            + this.misses.toFixed(0)+" misses "
            + this.explosions.toFixed(0)+" explosions "
            + this.damage.toFixed(0)+" damage "
            //+ this.seconds.toFixed(1)+" seconds "
            //+ this.frames.toFixed(0)+" frames "
            ,x,y,c,f,s);
    }
};

