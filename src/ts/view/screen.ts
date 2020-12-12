import AbstractView from './abstractView';
import Chicken from './chicken';

export default class Screen extends AbstractView{
    canvas: HTMLCanvasElement;
    context: any;
    chickens:Array<Chicken> = [];

    constructor(pWidth:number, pHeight: number){
        super();

        this.canvas = document.createElement('canvas');
        this.canvas.height = pWidth;
        this.canvas.width = pHeight;
        this.context = this.canvas.getContext('2d');
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
        for(let _i = 0; _i < this.chickens.length; _i++){
            const _chicken = this.chickens[_i];
            _chicken.tick();
            const _chickenCfg = _chicken.get();
            this.context.drawImage(
                _chickenCfg.img,
                _chickenCfg.x,
                _chickenCfg.y);
        }
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

    hunt(){

    }
}