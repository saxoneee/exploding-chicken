import Cfg from '../cfg/cfg';

export default class abstractView {
    static _viewCounter:number = 0;

    _viewId:string;   
    _tickCounter: number = 1;

    constructor(){
        abstractView._viewCounter++;
        this._viewId = abstractView._viewCounter.toString();
    }

    /**
     * frame draw update
     */
    tick(){
        this._tickCounter++;
        if(this._tickCounter > Cfg.fps){
            this._tickCounter = 1;
        }
    }
}