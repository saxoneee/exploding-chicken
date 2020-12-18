import './../style/style.css';

import Cfg from './cfg/cfg';
import Chicken from './view/chicken';
import Screen from './view/screen';
import OptionsBox from './view/optionsBox';

var spriteSize = 31;

var screen: Screen;
var options: any;

var init = function () {
    const _me = this;

    _me.options = {
        showChickenPath: Cfg.showChickenPath
    }

    screen = new Screen(document.body, _me.options);
    options = new OptionsBox(document.body, _me.options);

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
