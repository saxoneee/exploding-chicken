// ATTENTION: this is very old js code simply rewritten to typescript
import Utils from './utils/utils';
import Cfg from './cfg/cfg';
import Chicken from './view/chicken';
import Screen from './view/screen';

// config
var width = 400;
var height = 400;
var spriteSize = 31;

// intern
var canvas:any = null;
var context:any = null;
var chickens:any = [];

var screen:Screen;

var init = function() {
	console.log('init');

	screen = new Screen(500, 500);
	document.body.appendChild(screen.get());

	for(let _i = 0; _i < 10; _i++){
		screen.insert(new Chicken({
			width: spriteSize,
			height: spriteSize,
			screen: screen
		}));
	}

	loop();
};

// Schleife
function loop() {
	setTimeout(function() {
		requestAnimationFrame(loop);

		redraw();
	}, 1000 / Cfg.fps);
}


var redraw = function() {
	screen.clear();
	screen.tick();
}

window.addEventListener('load', init, false);
