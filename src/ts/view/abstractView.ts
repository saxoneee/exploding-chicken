import Options from '../cfg/options';

export default class abstractView {
    static _viewCounter: number = 0;

    _viewId: string;
    _tickCounter: number = 1;

    _events: any = {};

    constructor() {
        abstractView._viewCounter++;
        this._viewId = abstractView._viewCounter.toString();
    }

    getId(){
        return this._viewId;
    }

    /**
     * frame draw update
     */
    tick() {
        this._tickCounter++;
        if (this._tickCounter > Options.fps) {
            this._tickCounter = 1;
        }
    }

    /**
     * bind event listener
     *
     * @param pEventName
     * @param pEventFn
     */
    on(pEventName:string, pEventFn:Function){
        if(!this._events[pEventName]){
            this._events[pEventName] = [];
        }

        this._events[pEventName].push(pEventFn);
    }

    /**
     * fire event to call the listeners
     *
     * @param pEventName
     */
    fireEvent(...pArgs: any[]){
        const _evArgs = [].slice.call(arguments),
            _evName = _evArgs.shift();

        for(let _eventName in this._events){
            if(_eventName === _evName){
                const _evLst = this._events[_eventName];

                for(let _x = 0; _x < _evLst.length; _x++){
                    _evLst[_x].apply(this, _evArgs);
                }
            }
        }
    }
}
