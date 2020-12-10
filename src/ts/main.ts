// ATTENTION: this is very old js code simply rewritten to typescript

(function() {
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

	// utils
	var getRandom = function(min:number, max:number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	var init = function() {
		console.log('init');

		width = document.body.offsetWidth;
		height = document.body.offsetHeight;
		console.log(height);

		canvas = document.createElement('canvas');
		canvas.height = height;
		canvas.width = width;

		canvas.addEventListener('mousedown', hunt, false);

		document.body.appendChild(canvas);
		context = canvas.getContext("2d");

		// var dateText:any = new text(); // TODO

		loop();

		spawn();
		spawn();
		spawn();
		spawn();
		spawn();
		spawn();
		spawn();
		spawn();
		spawn();


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

	class sprite {
		_frame:any = 0;
		_move:any = false;
		_upDown:any = 0;
		_explode:any = false;
		_explodeCallback:any = null;
		_explosionPhase:any = 0;
		_that:any = {};

		constructor(options: any) {
			this._that = {
				remove: false,
				top: options.top,
				left: options.left,
				anger: options.anger || 0, // schnelligkeit der Bewegung
				movement: (options.movement != null) ? options.movement : true,
				spriteDirection: options.spriteDirection || 0, // richtung, in die das sprite schaut
				spriteMove: (options.spriteMove != null) ? options.spriteMove : true, // animation
				spriteIndex: options.spriteIndex || 0, // zurzeit aktives sprite-bild
	
				explode: function(callback:any) {
					if (this._explosionPhase === 0) {
						this._that.spriteDirection = 4;
						this._that.movement = false;
						this._that.spriteMove = true;
						this._that.anger = 25;
						this._that.spriteIndex = 0;
						this._explosionPhase++;
						this._explode = true;
						this._explodeCallback = callback;
					}
				},
	
				render: function() {
					this._frame++;
	
					// sprite-bild errechnen
					if (this._frame + this._that.anger > fps && this._that.spriteMove) {
						this._frame = 0;
						this._that.spriteIndex++;
	
						// explodieren
						if (this._explode === true) {
							this._explosionPhase++;
							if (this._explosionPhase >= options.sprites[4].length) {
								this._that.remove = true;
							}
						}
	
						if (this._that.movement) {
							// bewegungsrichtung festlegen
							var _directionChange = getRandom((10 * this._that.anger) / 2, 600);
							if (_directionChange > 500) {
								this._that.spriteDirection = (this._that.spriteDirection === 1) ? 0 : 1;
							}
	
							// bewegen
							var _shoudIStayOrShouldIGo = getRandom(10 * this._that.anger, 600);
							var _upDownChange = getRandom((10 * this._that.anger) / 2, 600);
							var _horizontalVertical = getRandom(0, 500);
							if (_shoudIStayOrShouldIGo > 300) { // bewegen?
								if (_horizontalVertical > 250) { // horizontal?
									if (this._that.spriteDirection === 0) {
										this._that.left = this._that.left + 5;
									} else {
										this._that.left = this._that.left - 5;
									}
	
									if (this._that.left < 0) {
										this._that.left = 0;
									}
	
									if (this._that.left + spriteSize > canvas.width) {
										this._that.left = canvas.width - spriteSize;
									}
								} else { // vertikal
									if (_upDownChange > 500) {
										this._upDown = (this._upDown === 0) ? 1 : 0;
									}
	
									if (this._upDown === 0) {
										this._that.top = this._that.top + 5;
									} else {
										this._that.top = this._that.top - 5;
									}
									if (this._that.top < 0) {
										this._that.top = 0;
									}
									if (this._that.top + spriteSize >= canvas.height) {
										this._that.top = canvas.height - spriteSize;
									}
								}
							}
						}
	
					}
					// index je nach menge der sprites zurücksetzen
					if (this._that.spriteIndex >= options.sprites[this._that.spriteDirection].length) {
						this._that.spriteIndex = 0;
					}
	
					// Draw the animation
					options.context.drawImage(
						options.image,
						options.sprites[this._that.spriteDirection][this._that.spriteIndex][0],
						options.sprites[this._that.spriteDirection][this._that.spriteIndex][1],
						options.width,
						options.height,
						this._that.left,
						this._that.top,
						options.width,
						options.height);
				}
			}
		  }
		
		getSprite(){
			return this._that;
		}
	}

	var spawn = function() {
		var _imgChicken = document.getElementById('chicken');
		chickens.push(new sprite({
			context: context,
			image: _imgChicken,
			width: spriteSize,
			top: getRandom(30, canvas.height * 0.75),
			left: getRandom(30, canvas.width * 0.75),
			anger: getRandom(20, 30),
			// top: 0,
			// left: 0,
			// anger: 0,
			// movement: false,
			// spriteMove: true,
			// spriteIndex: 4,
			// spriteDirection: 4,
			height: spriteSize,
			sprites: [
				[ // rechts
					[66, 22],
					[98, 22],
					[130, 24],
					[162, 24]
				],
				[ // links
					[64, 90],
					[96, 89],
					[128, 88],
					[160, 88]
				],
				[], // oben
				[], // unten
				[ // explosion
					[240, 22],
					[205, 22],
					[23, 87],
					[23, 56],
					[23, 20]
				]
			],
		}).getSprite());
	};

	var redraw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (var _i = chickens.length - 1; _i >= 0; _i--) {
			if (chickens[_i].remove === false) {
				chickens[_i].render();
			} else {
				chickens.splice(_i, 1);
				spawn();
			}
		}
	}

	window.addEventListener('load', init, false);

})();