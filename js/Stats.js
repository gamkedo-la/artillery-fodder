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

    draw: function(largemode=false) {

        var x = Math.round(canvas.width/2); // starting pos
        var y = 22;
        var h = 16; // line height
        var c = "white"; // colour
        var f = "9px Courier"; // font
        var s = true; // shadow
        var n = 1; // line number

        // vertical
        if (largemode) {
            colorText("Endgame Stats:",x,y,c,f,s);
            colorText(this.turns.toFixed(0)+" turns",x,y+(h*n++),c,f,s);
            colorText(this.shots.toFixed(0)+" shots",x,y+(h*n++),c,f,s);
            colorText(this.hits.toFixed(0)+" hits",x,y+(h*n++),c,f,s);
            colorText(this.misses.toFixed(0)+" misses",x,y+(h*n++),c,f,s);
            colorText(this.explosions.toFixed(0)+" explosions",x,y+(h*n++),c,f,s);
            colorText(this.damage.toFixed(0)+" damage",x,y+(h*n++),c,f,s);
            colorText(this.seconds.toFixed(1)+" seconds",x,y+(h*n++),c,f,s);
            colorText(this.frames.toFixed(0)+" frames",x,y+(h*n++),c,f,s);
        } else { 
        // mini stats display
        colorText(
            //"STATS: "
            //+ this.turns.toFixed(0)+" turns "
            + this.shots.toFixed(0)+" shots "
            + this.hits.toFixed(0)+" hits "
            //+ this.misses.toFixed(0)+" misses " // not tracked correctly
            //calculate misses as (explosions - hits) does this work? FIXME
            + Math.max(Math.round(this.explosions - this.hits),0)+" misses "
            + this.explosions.toFixed(0)+" explosions "
            + this.damage.toFixed(0)+" damage "
            //+ this.seconds.toFixed(1)+" seconds "
            //+ this.frames.toFixed(0)+" frames "
            ,x,y,c,f,s);
        }
    }
};

