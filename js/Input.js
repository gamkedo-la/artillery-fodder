window.addEventListener('keyup',    function (event) { Key.onKeyup(event); event.preventDefault() }, false);
window.addEventListener('keydown',  function (event) { Key.onKeydown(event); event.preventDefault() }, false);

function mouseInit() {
	document.addEventListener('pointerdown', mouseDown);
	document.addEventListener('pointerup', mouseUp);
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('wheel', mouseWheel);
	document.getElementById('gameCanvas').addEventListener('pointermove', calculateMousePos);
}

var mouseX = 0;
var mouseY = 0;
var mouseMovementX = 0;
var mouseMovementY = 0;
var mouseScrollY = 0;
var mousePressed = false;
var mouseJustPressed = false;

var focus=false;


function mouseDown(evt) {
	calculateMousePos(evt);
	mousePressed = true;
	mouseJustPressed = true;
	mouseMovementX = 0;
	mouseMovementY = 0;
}

function mouseUp(evt) {
	mousePressed = false;
}

function mouseMove(evt) {
	if ((mouseX > 0 && mouseX < canvas.width) &&
		(mouseY > 0 && mouseY < canvas.height)) {	
		mouseMovementX = evt.movementX;
		mouseMovementY = evt.movementY;
	}
}

function mouseWheel(evt) {
	mouseScrollY = evt.deltaY;	
}

function calculateMousePos(evt) {
	focus = true;
	var rect = canvas.getBoundingClientRect(),
	root = document.documentElement;
	mouseX = evt.clientX// - rect.left - root.scrollLeft;
	mouseY = evt.clientY// - rect.top - root.scrollTop;
	if ((mouseX < 0 && mouseX > canvas.width) ||
		(mouseY < 0 && mouseY > canvas.height)) {	
		mouseMovementX = 0;
		mouseMovementY = 0;
	}
}

function isMouseInArea(x, y, width, height) {
	if (mouseX >= x &&
		mouseX <= x + width &&
		mouseY >= y &&
		mouseY <= y + height &&
		focus)
	{
		return true;
	} else {
		return false;
	}
}


const Key = {

	_down: {},
	_pressed: {},
	_released: {},

	ENTER: 13,
	CTRL: 17,
	ALT: 18,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	a: 65,
	b: 66,
	c: 67,
	d: 68,
	e: 69,
	f: 70,
	g: 71,
	h: 72,
	i: 73,
	j: 74,
	k: 75,
	l: 76,
	m: 77,
	n: 78,
	o: 79,
	p: 80,
	q: 81,
	r: 82,
	s: 83,
	t: 84,
	u: 85,
	v: 86,
	w: 87,
	x: 88,
	y: 89,
	z: 90,
	COMMA: 188,
	PERIOD: 190,
	BRACKET_LEFT: 219,
	BRACKET_RIGHT: 221,
	PLUS:187,
	MINUS:189,

	isDown(keyCode) {
		return this._down[keyCode];
	},

	isJustReleased(keyCode) {
		return this._released[keyCode];
	},

	isJustPressed(keyCode) {
		return this._pressed[keyCode];
	},

	onKeydown(event) {
		if (this._down[event.keyCode] != true) {
			this._pressed[event.keyCode] = true;
		}
		this._down[event.keyCode] = true;
	},

	onKeyup(event) {
		this._released[event.keyCode] = true;
		delete this._down[event.keyCode];
	},

	update() {
		this._pressed = {};
		this._released = {};
		mouseJustPressed = false;

		if (mouseScrollY > 0.1) {
			mouseScrollY -= 0.1;
		}
		else if (mouseScrollY < -0.1) {
			mouseScrollY += 0.1;
		}
	}
};
