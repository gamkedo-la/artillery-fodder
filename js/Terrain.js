function terrain() {
    
    var heightMap = new Array();
	var maxHeight;

    // a public reference so we can access map.heightMap from outside this class
    // used by Decorations.js to determine ground height
    this.heightMap = heightMap; 

    this.init = function(width, height) {
		maxHeight = height;

		var oldRand = rndInt(-50, 100);
        var newRand = rndInt(-50, 100);
        
        // second octave for smaller hills inside the major ones above
        var oldRand2 = rndInt(-10, 20);
		var newRand2 = rndInt(-10, 20);

		for (var i = 0; i < width; i++) {
			if (i%50 == 0) {
				oldRand = newRand;
				newRand = rndInt(-50, 100);
			}
			
            var value = 100 + lerp(oldRand, newRand, i%50/50);
            
            // second octave perturb
            if (i%15 == 0) {
				oldRand2 = newRand2;
                newRand2 = rndInt(-10, 20);
			}
            value += lerp(oldRand2, newRand2, i%15/15);

			heightMap[i] = value;

		}
	}

	this.getHeightAtX = function(x) {
		return heightMap[Math.round(x)];
	}

	this.createImpactAtXandY = function(x, y, size) {
		var radius = size;

		var localY = Math.abs(y - canvas.height + UI_HEIGHT);
		var localX = Math.round(x);

		for (var i = -radius + localX; i <= radius + localX; i++) {
			var reduction = -Math.abs(i-localX) + radius;

			if (i < 0) {
				i = 0;
				reduction = -Math.abs(i) + radius;
			} else if (i >= heightMap.length) {
				break;
			}else if (heightMap[i] >= localY + reduction) {
				reduction *= 2;
			} else if (heightMap[i] > localY - reduction) {
				reduction += 0;
			} else if (heightMap[i] <= localY - reduction) {
				reduction = 0;
			}

			heightMap[i] -= reduction;
			if (heightMap[i] < 0) {
				heightMap[i] = 0;
			}
		}
	}

	this.draw = function() {
		canvasContext.save();
        for (var x = 0; x < heightMap.length; x++) {
            
            // distance from bottom of screen
            let groundY = canvas.height - 100 - heightMap[x];
            
            // draw the terrain gradient
            // colorLine(i, canvas.height - UI_HEIGHT, i, groundY, 1, groundColor);
			var gradient = canvasContext.createLinearGradient(0,groundY,0,canvas.height - UI_HEIGHT);
			gradient.addColorStop(0, groundColor);
			gradient.addColorStop(1, groundColorGradient);
            colorRect(x, groundY, 1, heightMap[x], gradient);
            
		}
		canvasContext.restore();
	}
}