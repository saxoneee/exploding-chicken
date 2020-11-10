(function() {
	// config
	var fps = 30;
	var width = 400;
	var height = 400;
	var spriteSize = 31;

	// intern
	var canvas = null;
	var context = null;
	var start = null;
	var chickens = [];

	// utils
	var getRandom = function(min, max) {
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

		dateText = new text();

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
			render: function(text, posX, posY) {
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

	var hunt = function(pEvent) {
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

	var sprite = function(options) {
		var _frame = 0,
			_move = false,
			_upDown = 0,
			_explode = false,
			_explodeCallback = null,
			_explosionPhase = 0;

		var _that = {
			remove: false,
			top: options.top,
			left: options.left,
			anger: options.anger || 0, // schnelligkeit der Bewegung
			movement: (options.movement != null) ? options.movement : true,
			spriteDirection: options.spriteDirection || 0, // richtung, in die das sprite schaut
			spriteMove: (options.spriteMove != null) ? options.spriteMove : true, // animation
			spriteIndex: options.spriteIndex || 0, // zurzeit aktives sprite-bild

			explode: function(callback) {
				if (_explosionPhase === 0) {
					_that.spriteDirection = 4;
					_that.movement = false;
					_that.spriteMove = true;
					_that.anger = 25;
					_that.spriteIndex = 0;
					_explosionPhase++;
					_explode = true;
					_explodeCallback = callback;
				}
			},

			render: function() {
				_frame++;

				// sprite-bild errechnen
				if (_frame + _that.anger > fps && _that.spriteMove) {
					_frame = 0;
					_that.spriteIndex++;

					// explodieren
					if (_explode === true) {
						_explosionPhase++;
						if (_explosionPhase >= options.sprites[4].length) {
							_that.remove = true;
						}
					}

					if (_that.movement) {
						// bewegungsrichtung festlegen
						var _directionChange = getRandom((10 * _that.anger) / 2, 600);
						if (_directionChange > 500) {
							_that.spriteDirection = (_that.spriteDirection === 1) ? 0 : 1;
						}

						// bewegen
						var _shoudIStayOrShouldIGo = getRandom(10 * _that.anger, 600);
						var _upDownChange = getRandom((10 * _that.anger) / 2, 600);
						var _horizontalVertical = getRandom(0, 500);
						if (_shoudIStayOrShouldIGo > 300) { // bewegen?
							if (_horizontalVertical > 250) { // horizontal?
								if (_that.spriteDirection === 0) {
									_that.left = _that.left + 5;
								} else {
									_that.left = _that.left - 5;
								}

								if (_that.left < 0) {
									_that.left = 0;
								}

								if (_that.left + spriteSize > canvas.width) {
									_that.left = canvas.width - spriteSize;
								}
							} else { // vertikal
								if (_upDownChange > 500) {
									_upDown = (_upDown === 0) ? 1 : 0;
								}

								if (_upDown === 0) {
									_that.top = _that.top + 5;
								} else {
									_that.top = _that.top - 5;
								}
								if (_that.top < 0) {
									_that.top = 0;
								}
								if (_that.top + spriteSize >= canvas.height) {
									_that.top = canvas.height - spriteSize;
								}
							}
						}
					}

				}
				// index je nach menge der sprites zurücksetzen
				if (_that.spriteIndex >= options.sprites[_that.spriteDirection].length) {
					_that.spriteIndex = 0;
				}

				// Draw the animation
				options.context.drawImage(
					options.image,
					options.sprites[_that.spriteDirection][_that.spriteIndex][0],
					options.sprites[_that.spriteDirection][_that.spriteIndex][1],
					options.width,
					options.height,
					_that.left,
					_that.top,
					options.width,
					options.height);
			}
		};
		return _that;
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
				/*
				// 16 x 16px
				[ // rechts
					[33, 11],
					[49, 11],
					[65, 11],
					[81, 11]
				],
				[ // links
					[31, 44],
					[47, 44],
					[64, 44],
					[80, 44]
				],
				[], // oben
				[], // unten
				[ // explosion
					[120, 11],
					[103, 11],
					[10, 43],
					[10, 11],
					[10, 25]
				]*/
			],
		}));
	};

	var redraw = function(a) {
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (var _i = chickens.length - 1; _i >= 0; _i--) {
			// chickens[_i].explode();
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