const pi = Math.PI;

function degreesToRadians(degrees){
	return degrees * (pi/180);
}

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}

function rndInt(min, max) {
	if(max == null) {
		max = min || 1;
		min = 0;
	}
	return Math.round( Math.random() * (max - min) + min );
}

function rndFloat(min, max) {
	if(max == null) {
		max = min || 1;
		min = 0;
	}
	return Math.random() * (max - min) + min;
}

function rndOneIn(max = 2){
	return rndInt(0,max) === 0;
}

 function rndOneFrom(items){
	return items[rndInt(items.length)];
}

function distance (a,b) {
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function angleBetween2Points (a, b) {
	var angle = Math.atan2(b.y - a.y, b.x - a.x) * 180 / pi;
	angle *= -1;
	//if (angle >= 360) {angle -= 360;}
	//if (angle < 0) {angle += 360;}
	return angle;
}

function clamp(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

function mix(a, b, p) {
	return a * (1-p) + b * p;
}

function range(num, in_min, in_max, out_min, out_max) {
	return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function rgbToHex (value) {
	Math.round(value)
	var hex = Number(Math.round(value)).toString(16);

	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex.toUpperCase();
}

function fullColorHex(r, g, b) {
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);

	return "#" + red + green + blue;
}

function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}

// "Mulberry32" pseudo random number generator (same result every time)
// example:
// var pseudoRandom = new mulberry32(12345678); // seed it
// var x = pseudoRandom(); // same as Math.random but the same each time 
// see https://stackoverflow.com/questions/521295/
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}