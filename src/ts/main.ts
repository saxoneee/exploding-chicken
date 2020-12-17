import './../style/style.css';

import Cfg from './cfg/cfg';
import Chicken from './view/chicken';
import Screen from './view/screen';

var spriteSize = 31;

var screen: Screen;

var init = function () {
    screen = new Screen(document.body);
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
        }));
    }
}

function loop() {
    setTimeout(function () {
        requestAnimationFrame(loop);

        screen.clear();
        screen.tick();
    }, 1000 / Cfg.fps);
}

window.addEventListener('load', init, false);
