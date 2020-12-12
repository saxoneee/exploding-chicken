import Utils from '../utils/utils';
import Cfg from '../cfg/cfg';
import AbstractView from './abstractView';

export default class chicken extends AbstractView{
    // for now
    sprite = document.getElementById('chicken');
    helperCanvas:HTMLCanvasElement = document.createElement('canvas');
    helperContext:any;

    _viewIdPrefix = 'ch_';

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

    constructor(pConfig:any){
        super();
        this.helperCanvas.width = pConfig.width;
        this.helperCanvas.height = pConfig.height;
        this.helperContext = this.helperCanvas.getContext('2d');

        this.currentSpritePos = 0;
        this.currentPathX = Utils.getRandom(0,200);
        this.currentPathY = Utils.getRandom(0,200);
    }

    /**
     * generate the route
     */
    _createPath(){
        let _posStartX = this.currentPathX,
            _posStartY = this.currentPathY,
            _directionX = Utils.getRandom(-1,1),
            _directionY = Utils.getRandom(-1,1);

        for(var _i = 0; _i < Utils.getRandom(1,1000); _i++){

            this.path.push({
                x: _posStartX + (_i * _directionX),
                y: _posStartY + (_i * _directionY),
            });
        }
    }

    _getPath(){
        if(this.path.length == 0){
            this._createPath();
        }
        return this.path.shift();
    }

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