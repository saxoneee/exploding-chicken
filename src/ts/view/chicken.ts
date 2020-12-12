import Utils from '../utils/utils';
import AbstractView from './abstractView';

export default class chicken extends AbstractView{
    // for now
    sprite = document.getElementById('chicken');
    helperCanvas:HTMLCanvasElement = document.createElement('canvas');
    helperContext:any;

    sprites = {
        right: [ // rechts
            [66, 22],
            [98, 22],
            [130, 24],
            [162, 24]
        ],
        left: [ // links
            [64, 90],
            [96, 89],
            [128, 88],
            [160, 88]
        ],
       
        explosion: [ // explosion
            [240, 22],
            [205, 22],
            [23, 87],
            [23, 56],
            [23, 20]
        ]
    }

    path:Array<any> = [];

    constructor(pConfig:any){
        super();
        this.helperCanvas.width = pConfig.width;
        this.helperCanvas.height = pConfig.height;
        this.helperContext = this.helperCanvas.getContext('2d');
    }

    _createPath(){
        for(var _i = 0; _i < 200; _i++){

            this.path.push({
                x: _i,
                y: 0
            });
        }
    }

    _getPath(){
        return this.path.shift();
    }

    _drawChicken(){
        var _sprite = this.sprites.right[0];
        if(this.path.length == 0){
            this._createPath();
        }
        
        this.helperContext.clearRect(0, 0, this.helperCanvas.width, this.helperCanvas.height);
        this.helperContext.drawImage(this.sprite,_sprite[0] * -1,_sprite[1] * -1);

        return this.helperCanvas;
    }

    get(){
        var _chicken = this._drawChicken();
        var _path = this._getPath();

        return {
            img: _chicken,
            x: _path.x,
            y: _path.y

        }
    }
};