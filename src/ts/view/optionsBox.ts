export default class optionsBox {
    element:HTMLDivElement;
    options: any;

    constructor(pScreenDest: HTMLElement, pOptions: any) {
        var _me = this;

        _me.element = document.createElement('div');
        _me.element.id = 'options';
        pScreenDest.appendChild(_me.element);

        _me.options = pOptions;

        _me._addOption('number','fps','fps');
        _me._addOption('checkbox','showChickenPath', 'show chicken paths');
        _me._addOption('checkbox', 'stopChickenMovement', 'stop chicken movement');
    }

    _addOption(pType: string, pName: string, pLabel: string){
        const _me = this,
            _label = document.createElement('label'),
            _span = document.createElement('span'),
            _input = document.createElement('input');

        _input.type = pType;
        _input.name = pName;
console.log(
    'asd',pName, _me.options
);
        switch(pType){
            case 'checkbox':
                _input.checked = _me.options[pName];
                _input.addEventListener('click', function(){
                    _me.options[pName] = _input.checked
                });
            break;
            default:
                console.log(_me.options[pName]);
                _input.value = _me.options[pName];
                _input.addEventListener('input', function(){
                    _me.options[pName] = parseInt(_input.value)
                });
            break;
        }

        _span.appendChild(document.createTextNode(pLabel));
        _label.appendChild(_span);
        _label.appendChild(_input);

        this.element.appendChild(_label);
    }
}
