import AbstractView from './abstractView';

export default class Screen extends AbstractView{
    canvas: HTMLCanvasElement;
    context: any;

    constructor(pCanvas: HTMLCanvasElement){
        super();
        this.canvas = pCanvas;
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
    insert(pChickenCfgToInsert:any){
        this.context.drawImage(
            pChickenCfgToInsert.img,
            pChickenCfgToInsert.x,
            pChickenCfgToInsert.y);
    }
}