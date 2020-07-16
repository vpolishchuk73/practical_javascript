const changeModalState = (stat) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img');
    const windowWidth = document.querySelectorAll('#width');
    const windowHeight = document.querySelectorAll('#height');
    const windowType = document.querySelectorAll('#view_type');
    const windowProfile = document.querySelectorAll('.checkbox');

    const checkNumInputs = (selector) => {
        const numInputs = document.querySelectorAll(selector);
    
        numInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            });
        });
    };

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN':
                        stat[prop] = i;
                        break;
                    case 'INPUT':
                        if(item.getAttribute('type')==='checkbox') {
                            i===0 ? stat[prop]="Холодное" : stat[prop]="Теплое";
                            elem.forEach((box,j) => {
                                box.checked=false;
                                if(i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            stat[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        stat[prop] = item.value;
                        break;
                }
                console.log(stat);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;