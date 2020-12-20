import Utils from '../utils/utils';
import Screen from './screen';
import AbstractView from './abstractView';

import chickenPngSrc from './../../assets/images/chicken2.png';

export default class chicken extends AbstractView {
    sprite: HTMLImageElement = new Image();

    helperCanvas: HTMLCanvasElement = document.createElement('canvas');
    helperContext: any;

    sprites = {
        right: [
            [66, 22],
            [98, 22],
            [130, 24],
            [162, 24]
        ],
        left: [
            [64, 90],
            [96, 89],
            [128, 88],
            [160, 88]
        ],

        explosion: [
            [240, 22],
            [205, 22],
            [23, 87],
            [23, 56],
            [23, 20]
        ]
    };

    currentSpritePos: number;

    path: Array<any> = [];

    lastPathX: number;
    lastPathY: number;
    currentPathX: number;
    currentPathY: number;
    directionX: number;
    directionY: number;
    width: number;
    height: number;

    screen: Screen;

    exploding: boolean = false;

    options: any;

    constructor(pConfig: any, pOptions: any) {
        super();
        this.width = pConfig.width;
        this.height = pConfig.height;
        this.helperCanvas.width = this.width;
        this.helperCanvas.height = this.height;
        this.screen = pConfig.screen;

        this.helperContext = this.helperCanvas.getContext('2d');

        this.options = pOptions;

        this.currentSpritePos = 0;
        const _borders = this.screen.getBorders();
        this.currentPathX = Utils.getRandom(0, _borders.right - this.helperCanvas.width);
        this.currentPathY = Utils.getRandom(0, _borders.bottom - this.helperCanvas.height);

        this.sprite.src = chickenPngSrc;

        this._drawChicken();
    }

    /**
     * generate the route
     *
     * @param pForceDirectionX 1|0|-1|false
     * @param pForceDirectionY 1|0|-1|false
     */
    _createPath(pForceDirectionX: any, pForceDirectionY: any) {
        const _me = this;

        let _posStartX = _me.currentPathX,
            _posStartY = _me.currentPathY;

        _me.directionX = (pForceDirectionX !== false) ? pForceDirectionX : Utils.getRandom(-1, 1);
        _me.directionY = (pForceDirectionY !== false) ? pForceDirectionY : Utils.getRandom(-1, 1);

        for (var _i = 0; _i < Utils.getRandom(1, 10000); _i++) {
            const _nextX = _posStartX + _i * _me.directionX,
                _nextY = _posStartY + _i * _me.directionY

            _me.path.push({
                x: _nextX,
                y: _nextY
            });
        }

        this.fireEvent('pathCreated', this.path);
    }

    /**
     * get next path step
     *
     * check if the step is possible
     *
     * @return {step}
     */
    _getPath() {
        const _me = this,
            _borders = this.screen.getBorders();
        let _nextStep;

        if (_me.path.length == 0) {
            _me._createPath(false, false);
        }

        if(_me.options.stopChickenMovement){
            _nextStep = {
                x: _me.currentPathX,
                y: _me.currentPathY
            }
        }else{
            _nextStep = _me.path.shift();
        }

        return _nextStep;
    }

    recalcPath(){
        const _me = this;

        // _me.exploding = true;
        // console.log('path',_me.path);
        _me.path = [];
        _me._createPath(_me.currentPathX - _me.lastPathX, _me.currentPathY - _me.lastPathY);

        console.log(_me.currentPathX - _me.lastPathX, _me.currentPathY - _me.lastPathY);

        _me.currentPathX = _me.lastPathX;
        _me.currentPathY = _me.lastPathY;

        // console.log(_me.currentPathX, _me.currentPathY, _me.lastPathX, _me.lastPathY);
    }

    /**
     * frame step
     */
    tick() {
        super.tick();

        let _draw = false;

        if(this.isExploding()){
            if (this._tickCounter % 3 == 0) {
                _draw = true;
                this.currentSpritePos++;
            }

            if (this.currentSpritePos >= 5) {
                this.currentSpritePos = 0;
            }
        }else{
            if (this._tickCounter % 10 == 0) {
                _draw = true;
                this.currentSpritePos++;
            }

            if (this.currentSpritePos >= 4) {
                this.currentSpritePos = 0;
            }
        }

        if (_draw) {
            this._drawChicken();
        }
    }

    /**
     * draw the chicken to the helper
     */
    _drawChicken() {
        var _sprite: any;

        if (this.directionX >= 0) {
            _sprite = this.sprites.right[this.currentSpritePos];
        } else {
            _sprite = this.sprites.left[this.currentSpritePos];
        }
        if (this.exploding) {
            _sprite = this.sprites.explosion[this.currentSpritePos];
        }

        this.helperContext.clearRect(0, 0, this.helperCanvas.width, this.helperCanvas.height);
        this.helperContext.drawImage(this.sprite, _sprite[0] * -1, _sprite[1] * -1);
    }

    explode() {
        this.currentSpritePos = -1;
        this.exploding = true;
        this.path = [];
        this.fireEvent('explosionStart', this.getId());
    }

    isExploding() {
        return this.exploding;
    }

    get() {
        let _path: any = [];

        if (!this.isExploding()) {
            _path = this._getPath();
            this.lastPathX = this.currentPathX;
            this.lastPathY = this.currentPathY;
            this.currentPathX = _path.x;
            this.currentPathY = _path.y;
        }

        if (this.isExploding() && this.currentSpritePos == 4) {
            this.fireEvent('explosionEnd');
            return false;
        }

        return {
            img: this.helperCanvas,
            x: this.currentPathX,
            y: this.currentPathY,
            width: this.helperCanvas.width,
            height: this.helperCanvas.height,

        }
    }
};
