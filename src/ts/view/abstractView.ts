import Cfg from '../cfg/cfg';

export default class abstractView {
    _tickCounter: number = 1;

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