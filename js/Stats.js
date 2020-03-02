// stats db for the game over screen

var stats = {

    turns:0,
    shots:0,
    damage:0,
    seconds:0,
    misses:0,
    hits:0,
    frames:0,

    draw: function() {

        var x = 48; // starting pos
        var y = 200;
        var h = 8; // line height
        var c = "black"; // colour
        var f = "8px Arial Bold"; // font
        var s = false; // shadow
        var n = 1; // line number

        colorText("Endgame Stats:",x,y,c,f,s);

        colorText(this.turns.toFixed(0)+" turns",x,y+(h*n++),c,f,s);
        colorText(this.shots.toFixed(0)+" shots",x,y+(h*n++),c,f,s);
        colorText(this.hits.toFixed(0)+" hits",x,y+(h*n++),c,f,s);
        colorText(this.misses.toFixed(0)+" misses",x,y+(h*n++),c,f,s);
        colorText(this.damage.toFixed(0)+" damage",x,y+(h*n++),c,f,s);
        colorText(this.seconds.toFixed(1)+" seconds",x,y+(h*n++),c,f,s);
        colorText(this.frames.toFixed(0)+" frames",x,y+(h*n++),c,f,s);

    }


};

