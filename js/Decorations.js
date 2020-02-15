// grass, pebbles, cracks, etc

var decorations = new function() {

    const TERRAIN_DECORATIONS_ENABLED = true; // non-interactive grass, rocks, etc
    const DECO_CHANCE = 0.25;
    const DECO_W = 16; // of each sprite in the spritesheet
    const DECO_H = 16;
    const DECO_COUNT = 16;
    var randomSeedThisGame = performance.now();

    this.draw = function() {
    
        if (!TERRAIN_DECORATIONS_ENABLED) return;

        var decoImg = imageLoader.getImage("decorations");
        var pseudoRandom = new mulberry32(randomSeedThisGame); // seeded predictable random
        // starts from same seed each frame, so decorations are in the same "random" spots
        
        for (var x = 0; x < map.heightMap.length; x++) {
            // distance from bottom of screen
            let groundY = canvas.height - 100 - map.heightMap[x];
            // add grass/pebbles/cracks/etc
            if (pseudoRandom() < DECO_CHANCE) {

                let whichSprite = Math.floor(pseudoRandom() * DECO_COUNT);
                // tiles 1-8 = grass and rocks that sit ON TOP of terrain
                // tiles 9-16 = rocks and racks that are underground
                let yoffset = -DECO_H+3; // plants poke up above the ground
                let xoffset = -Math.floor(DECO_W/2); // centered
                // but rocks and cracks are embedded in the ground
                if (whichSprite>7) yoffset = Math.floor(pseudoRandom()*(map.heightMap[x]-DECO_H)); 
                canvasContext.drawImage(decoImg,
                    0+(whichSprite*DECO_W),0,
                    DECO_W,DECO_H,
                    x+xoffset,groundY+yoffset,
                    DECO_W,DECO_H);

            } // rand
        } // loop
    } // draw
}();
