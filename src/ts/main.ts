import './../style/style.css';

import Options from './cfg/options';
import OptionsBox from './view/optionsBox';
import Chicken from './view/chicken';
import Screen from './view/screen';

var spriteSize = 31;

var screen: Screen;
var optionsBox: any;

var init = function () {
    screen = new Screen(document.body, Options);
    optionsBox = new OptionsBox(document.body, Options);

    screen.on('chickenExploded', function(){
        spawnChicken(1);
    });

    spawnChicken(10);
    loop();
};

function spawnChicken(pAmount: number) {
    for (let _i = 0; _i < pAmount; _i++) {
        screen.insert(new Chicken({
            width: spriteSize,
            height: spriteSize,
            screen: screen
        },Options));
    }
}

function loop() {
    setTimeout(function () {
        requestAnimationFrame(loop);

        screen.clear();
        screen.tick();
    }, 1000 / Options.fps);
}

window.addEventListener('load', init, false);
