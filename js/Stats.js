// stats db for the game over screen

var stats = {

    turns:0,
    shots:0,
    damage:0,
    frames:0,
    seconds:0,
    misses:0,
    hits:0,

    draw: function() {

        var x = 30;
        var y = 200;
        var h = 20;
        var c = rgba('red');

        this.frames++;

        colorText("Endgame Stats:",x,y,c);

    }


};

