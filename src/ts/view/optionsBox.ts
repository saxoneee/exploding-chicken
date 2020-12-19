export default class optionsBox {
    element:HTMLDivElement;
    options: any;

    constructor(pScreenDest: HTMLElement, pOptions: any) {
        var _me = this;

        _me.element = document.createElement('div');
        _me.element.id = 'options';
        pScreenDest.appendChild(_me.element);

        _me.options = pOptions;

        _me._addOption('showChickenPath', 'show chicken paths', pOptions.showChickenPath)
        _me._addOption('stopChickenMovement', 'stop chicken movement', pOptions.stopChickenMovement)
    }

    _addOption(pName:string, pLabel:string, pValue: any){
        const _me = this,
            _label = document.createElement('label'),
            _checkbox = document.createElement('input');

        _checkbox.type = 'checkbox';

        if(pValue){
            _checkbox.checked = true;
        }

        _label.appendChild(_checkbox);
        _label.appendChild(document.createTextNode(pLabel));

        _checkbox.name = pName;

        _checkbox.addEventListener('click', function(){
            _me.options[pName] = _checkbox.checked
        });

        this.element.appendChild(_label);
    }
}
