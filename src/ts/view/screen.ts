import AbstractView from './abstractView';
import Chicken from './chicken';
import Utils from './../utils/utils';

export default class Screen extends AbstractView {
    canvas: HTMLCanvasElement;
    context: any;
    chickens: Array<Chicken> = [];
    chickenPathColl:any = {};
    screenDestEl: HTMLElement;

    constructor(pScreenDest: HTMLElement) {
        super();

        var _me = this;

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

        pChicken.on('explosionStart', function(pChickenId:any){
            delete _me.chickenPathColl[pChickenId];
        });
        pChicken.on('explosionEnd', function(){
            _me.fireEvent('chickenExploded');
        });

        pChicken.on('pathCreated', function(pChickenPath:Array<any>){
            // console.log(pChickenPath);
            if(pChickenPath.length > 0){
                _me.chickenPathColl[pChicken.getId()] = pChickenPath;
            }
        });
    }

    tick() {
        this._drawChickenPath();

        const _chickensToRemove: Array<number> = [];

        for (let _i = 0; _i < this.chickens.length; _i++) {
            const _chicken = this.chickens[_i];
            _chicken.tick();
            const _chickenCfg = _chicken.get();

            if (_chickenCfg !== false) {

                this.context.drawImage(
                    _chickenCfg.img,
                    _chickenCfg.x,
                    _chickenCfg.y);
            } else {
                _chickensToRemove.push(_i);
            }
        }

        this.chickens = this.chickens.filter(function (value, index) {
            return _chickensToRemove.indexOf(index) == -1;
        });
    }

    _drawChickenPath(){
        var _ausgleichX = 15,
            _ausgleichY = 15;

        for(let _id in this.chickenPathColl){
            let _path = this.chickenPathColl[_id];


            if(_path.length === 0){
                break;
            }
            this.context.beginPath();
            this.context.moveTo(_path[0].x + _ausgleichX, _path[0].y + _ausgleichY);

            for(let _p = 1; _p < _path.length; _p++){
                if(!_path[_p]){
                    break;
                }

                this.context.lineTo(_path[_p].x + _ausgleichX, _path[_p].y + _ausgleichY);
            }
            this.context.lineTo(_path[0].x + _ausgleichX, _path[0].y + _ausgleichY);
            this.context.closePath();

            this.context.strokeStyle = '#000';
            this.context.fillStyle = '#000';
            this.context.stroke();
            this.context.fill();
        }
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
