import Utils from './utils/utils';

export default class chicken {
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

    constructor(pConfig:any){
        this.helperCanvas.width = pConfig.width;
        this.helperCanvas.height = pConfig.height;
        this.helperContext = this.helperCanvas.getContext('2d');
    }

    get(){
        var _sprite = this.sprites.right[0];
        this.helperContext.drawImage(this.sprite,_sprite[0] * -1,_sprite[1] * -1);

        return {
            img: this.helperCanvas,
            x: Utils.getRandom(0,120),
            y: Utils.getRandom(0,120)

        }
    }
};