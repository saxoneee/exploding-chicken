// ATTENTION: this is very old js code simply rewritten to typescript
import Utils from './utils/utils';
import Chicken from './chicken';
import Screen from './screen';

// config
var fps = 30;
var width = 400;
var height = 400;
var spriteSize = 31;

// intern
var canvas:any = null;
var context:any = null;
var start = null;
var chickens:any = [];

var screen:Screen;

var init = function() {
	console.log('init');

	width = document.body.offsetWidth;
	height = document.body.offsetHeight;

	canvas = document.createElement('canvas');
	canvas.height = height;
	canvas.width = width;

	canvas.addEventListener('mousedown', hunt, false);

	document.body.appendChild(canvas);
	context = canvas.getContext("2d");

	screen = new Screen(canvas);

	// var dateText:any = new text(); // TODO

	loop();

	spawn();
	// spawn();
	// spawn();
	// spawn();
	// spawn();
	// spawn();
	// spawn();
	// spawn();
	// spawn();


};

// Schleife
function loop() {
	setTimeout(function() {
		requestAnimationFrame(loop);

		redraw();
	}, 1000 / fps);
}

var text = function() {
	var _that = {
		render: function(text:any, posX:any, posY:any) {
			context.fillStyle = 'white';
			context.strokeStyle = '#333';
			context.strokeWidth = '20px';
			context.font = '30pt Tahoma';
			context.textAlign = 'left';
			context.textBaseline = 'middle';
			context.fillText(text, posX, posY);
			context.strokeText(text, posX, posY);
		}
	}

	return _that;
};

var hunt = function(pEvent:any) {
	for (var _i = 0; _i < chickens.length; _i++) {
		var _horizontal = false,
			_vertical = false;

		if (pEvent.layerX >= chickens[_i].left && pEvent.layerX <= chickens[_i].left + spriteSize) {
			_horizontal = true;
		}
		if (pEvent.layerY >= chickens[_i].top && pEvent.layerY <= chickens[_i].top + spriteSize) {
			_vertical = true;
		}

		if (_horizontal && _vertical) {
			chickens[_i].explode();
			break;
		}
	}
}

var spawn = function() {
	chickens.push(new Chicken({
		width: spriteSize,
		height: spriteSize,
	}));
};

var redraw = function() {
	screen.clear();
	for (var _i = chickens.length - 1; _i >= 0; _i--) {
		screen.insert(chickens[_i].get());
		// if (chickens[_i].remove === false) {
			
		// } else {
		// 	chickens.splice(_i, 1);
		// 	spawn();
		// }
	}
}

window.addEventListener('load', init, false);
