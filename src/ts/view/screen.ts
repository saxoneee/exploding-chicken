import AbstractView from './abstractView';
import Chicken from './chicken';
import Utils from './../utils/utils';

export default class Screen extends AbstractView {
    canvas: HTMLCanvasElement;
    context: any;
    chickens: Array<Chicken> = [];

    screenDestEl: HTMLElement;
    options: any;

    constructor(pScreenDest: HTMLElement, pOptions: any) {
        super();

        var _me = this;

        _me.options = pOptions;

        _me.canvas = document.createElement('canvas');
        _me.canvas.width = pScreenDest.clientWidth;
        _me.canvas.height = pScreenDest.clientHeight;

        _me.context = _me.canvas.getContext('2d');

        _me.canvas.addEventListener('mousedown', (e) => _me.hunt(e));

        _me.screenDestEl = pScreenDest;

        _me.screenDestEl.appendChild(_me.get());

        window.addEventListener('resize', Utils.debounce(function () {
            _me.canvas.width = _me.screenDestEl.clientWidth;
            _me.canvas.height = _me.screenDestEl.clientHeight;
        }));
    }

    /**
     * clear screen for next draw
     */
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * insert things/chicken to screen
     *
     * @param pChickenCfgToInsert
     */
    insert(pChicken: Chicken) {
        var _me = this;

        _me.chickens.push(pChicken);

        pChicken.on('explosionEnd', function(){
            _me.fireEvent('chickenExploded');
        });
    }

    tick() {
        const _me = this,
            _chickensToRemove: Array<number> = [];

        for (let _i = 0; _i < _me.chickens.length; _i++) {
            const _chicken = _me.chickens[_i];
            _chicken.tick();
            let _chickenCfg = _chicken.get(),
                _force: any,
                _c = 0;
            while(_c < 10 && _chickenCfg !== false && !_me.checkObstacles(_chickenCfg.x, _chickenCfg.y, _chickenCfg.width, _chickenCfg.height)){
                _c++;
                _chicken.recalcPath();
                // _chickenCfg = _chicken.get();
                console.log(_c, _chickenCfg);
            }

            if (_chickenCfg !== false) {
                // chicken path
                if(_me.options.showChickenPath){
                    if(_chicken.path.length > 0){
                        const _firstStep = _chicken.path[0],
                            _lastStep = _chicken.path[_chicken.path.length - 1],
                            _mH = _chickenCfg.width/2,
                            _mV = _chickenCfg.height/2;

                        _me.context.beginPath();
                        _me.context.moveTo(_firstStep.x + _mH, _firstStep.y + _mV);
                        _me.context.lineTo(_lastStep.x + _mH, _lastStep.y + _mV);
                        _me.context.closePath();

                        _me.context.strokeStyle = '#777';
                        _me.context.stroke();
                    }
                }

                // chicken
                _me.context.drawImage(
                    _chickenCfg.img,
                    _chickenCfg.x,
                    _chickenCfg.y);
            } else {
                _chickensToRemove.push(_i);
            }
        }

        _me.chickens = _me.chickens.filter(function (value, index) {
            return _chickensToRemove.indexOf(index) == -1;
        });
    }

    checkObstacles(pPosX: number, pPosY: number, pWidth: number, pHeight: number){
        const _me = this;
            if (pPosX < 0) {
                return false;
            }
            if (pPosX + pWidth > _me.canvas.width) {
                return false;
            }

            if (pPosY < 0) {
                return false;
            }
            if (pPosY + pHeight > _me.canvas.height) {
                return false;
            }

        return true;
    }

    /**
     *
     */
    getBorders(): any {
        return {
            top: 0,
            left: 0,
            bottom: this.canvas.height,
            right: this.canvas.width
        }
    }

    get(): HTMLCanvasElement {
        return this.canvas;
    }

    hunt(pEvent: any) {
        const _posX = pEvent.pageX,
            _posY = pEvent.pageY;

        for (let _i = 0; _i < this.chickens.length; _i++) {
            const _chicken = this.chickens[_i],
                _chickenCfg = _chicken.get();
            if (!_chickenCfg) {
                continue;
            }
            let _horizontalMatch = false,
                _verticalMatch = false;

            if (_chickenCfg.x < _posX && _chickenCfg.x + _chickenCfg.width > _posX) {
                _horizontalMatch = true;
            }

            if (_chickenCfg.y < _posY && _chickenCfg.y + _chickenCfg.height > _posY) {
                _verticalMatch = true;
            }

            if (_horizontalMatch && _verticalMatch && !_chicken.isExploding()) {
                _chicken.explode();
                break;
            }
        }
    }
}
