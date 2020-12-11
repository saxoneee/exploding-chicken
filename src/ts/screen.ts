export default class Screen {
    canvas: HTMLCanvasElement;
    context: any;

    constructor(pCanvas: HTMLCanvasElement){
        this.canvas = pCanvas;
        this.context = this.canvas.getContext('2d');
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    insert(pChickenCfgToInsert:any){
        this.context.drawImage(
            pChickenCfgToInsert.img,
            pChickenCfgToInsert.x,
            pChickenCfgToInsert.y);
    }
}