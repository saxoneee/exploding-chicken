import AbstractView from './abstractView';
import Chicken from './chicken';

export default class Screen extends AbstractView{
    canvas: HTMLCanvasElement;
    context: any;
    chickens:Array<Chicken> = [];

    constructor(pWidth:number, pHeight: number, pScreenDest:HTMLElement){
        super();

        this.canvas = document.createElement('canvas');
        this.canvas.height = pWidth;
        this.canvas.width = pHeight;
        this.context = this.canvas.getContext('2d');

        this.canvas.addEventListener('mousedown', (e) => this.hunt(e));

        pScreenDest.appendChild(this.get());
    }

    /**
     * clear screen for next draw
     */
    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * insert things/chicken to screen
     * 
     * @param pChickenCfgToInsert 
     */
    insert(pChicken:Chicken){
        this.chickens.push(pChicken);
    }

    tick(){
        const _chickensToRemove:Array<number> = [];

        for(let _i = 0; _i < this.chickens.length; _i++){
            const _chicken = this.chickens[_i];
            _chicken.tick();
            const _chickenCfg = _chicken.get();

            if(_chickenCfg !== false){
                this.context.drawImage(
                    _chickenCfg.img,
                    _chickenCfg.x,
                    _chickenCfg.y);
            }else{
                _chickensToRemove.push(_i);
            }
        }

        this.chickens = this.chickens.filter(function(value, index) {
            return _chickensToRemove.indexOf(index) == -1;
        });
    }

    /**
     * 
     */
    getBorders():any{
        return {
            top:0,
            left:0,
            bottom: this.canvas.height,
            right: this.canvas.width
        }
    }

    get():HTMLCanvasElement{
        return this.canvas;
    }

    hunt(pEvent:any){
        const _posX = pEvent.pageX,
            _posY = pEvent.pageY;
        
        for(let _i = 0; _i < this.chickens.length; _i++){
            const _chicken = this.chickens[_i],
                _chickenCfg = _chicken.get();
            if(!_chickenCfg){
                continue;
            }
            let _horizontalMatch = false,
                _verticalMatch = false;

            if(_chickenCfg.x < _posX && _chickenCfg.x + _chickenCfg.width > _posX){
                _horizontalMatch = true;
            }

            if(_chickenCfg.y < _posY && _chickenCfg.y + _chickenCfg.height > _posY){
                _verticalMatch = true;
            }

            if(_horizontalMatch && _verticalMatch){
                _chicken.explode();
                break;
            }
        }
    }
}