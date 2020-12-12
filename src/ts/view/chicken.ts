import Utils from '../utils/utils';
import Screen from './screen';
import Cfg from '../cfg/cfg';
import AbstractView from './abstractView';

export default class chicken extends AbstractView{
    // for now
    sprite = document.getElementById('chicken');
    helperCanvas:HTMLCanvasElement = document.createElement('canvas');
    helperContext:any;

    sprites = {
        'right': [ // rechts
            [66, 22],
            [98, 22],
            [130, 24],
            [162, 24]
        ],
        'left': [ // links
            [64, 90],
            [96, 89],
            [128, 88],
            [160, 88]
        ],
       
        'explosion': [ // explosion
            [240, 22],
            [205, 22],
            [23, 87],
            [23, 56],
            [23, 20]
        ]
    };

    currentSpritePos:number; 

    path:Array<any> = [];

    currentPathX:number;
    currentPathY:number;

    screen:Screen;

    constructor(pConfig:any){
        super();
        this.helperCanvas.width = pConfig.width;
        this.helperCanvas.height = pConfig.height;
        this.screen = pConfig.screen;

        this.helperContext = this.helperCanvas.getContext('2d');
        

        this.currentSpritePos = 0;
        const _borders = this.screen.getBorders();
        this.currentPathX = Utils.getRandom(0,_borders.right - this.helperCanvas.width);
        this.currentPathY = Utils.getRandom(0,_borders.bottom - this.helperCanvas.height);
    }

    /**
     * generate the route
     * 
     * @param pForceDirectionX 1|0|-1|false
     * @param pForceDirectionY 1|0|-1|false
     */
    _createPath(pForceDirectionX:any, pForceDirectionY:any){
        let _posStartX = this.currentPathX,
            _posStartY = this.currentPathY,
            _directionX = (pForceDirectionX !== false) ? pForceDirectionX : Utils.getRandom(-1,1),
            _directionY = (pForceDirectionY !== false) ? pForceDirectionY : Utils.getRandom(-1,1);

        for(var _i = 0; _i < Utils.getRandom(1,1000); _i++){
            const _nextX = _posStartX + (_i * _directionX),
                _nextY = _posStartY + (_i * _directionY);

            this.path.push({
                x: _nextX,
                y: _nextY,
            });
        }
    }

    /**
     * get next path step
     * 
     * check if the step is possible
     * 
     * @return {step}
     */
    _getPath(){
        const _borders = this.screen.getBorders();

        if(this.path.length == 0){
            this._createPath(false, false);
        }

        let _nextStep = this.path.shift();

        let _forceX:any = false,
        _forceY:any = false;
    
        if(_nextStep.x < _borders.left){
            _forceX = Utils.getRandom(0,1);
        }
        if(_nextStep.x + this.helperCanvas.width > _borders.right){
            _forceX = Utils.getRandom(-1,0);
        }
        
        if(_nextStep.y < _borders.top){
            _forceY = Utils.getRandom(0,1);
        }
        if(_nextStep.y + this.helperCanvas.height > _borders.bottom){
            _forceY = Utils.getRandom(-1,0);
        }

        if(_forceX !== false || _forceY !== false){
            this.path = [];
            this._createPath(_forceX, _forceY);
            _nextStep = this.path.shift();
        }

        return _nextStep;
    }

    /**
     * frame step
     */
    tick(){
        super.tick();

        if(this._tickCounter%10 == 0){
            this.currentSpritePos++;
        }
        if(this.currentSpritePos >=4){
            this.currentSpritePos = 0;
        }
    }

    _drawChicken(){
        // console.log(this.currentSpritePos);
        var _sprite = this.sprites.right[this.currentSpritePos];
        
        this.helperContext.clearRect(0, 0, this.helperCanvas.width, this.helperCanvas.height);
        this.helperContext.drawImage(this.sprite,_sprite[0] * -1,_sprite[1] * -1);

        return this.helperCanvas;
    }

    get(){
        var _chicken = this._drawChicken();
        var _path = this._getPath();

        this.currentPathX = _path.x;
        this.currentPathY = _path.y;

        return {
            img: _chicken,
            x: _path.x,
            y: _path.y

        }
    }
};