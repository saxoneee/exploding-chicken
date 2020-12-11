import Utils from './utils/utils';

export default class chicken {
    // for now
    sprite = document.getElementById('chicken');

    constructor(){}

    get(){
        return {
            img: this.sprite,
            x: Utils.getRandom(0,20),
            y: Utils.getRandom(0,20)

        }
    }
};