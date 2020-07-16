/*import modals from './modules/modals';
*/
/*
window.addEventListener('DOMContentLoaded', () => {
    modals();
});
*/
let modalState = {};
//-------------- Modal windows -----------------------------------
function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll('[data-modal]');

    trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                e.preventDefault();
                }

            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            });
    });

    close.addEventListener('click', () => {
        windows.forEach(item => {
            item.style.display = 'none';
        });
        
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal && closeClickOverlay) {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    });
}

bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
bindModal('.phone_link', '.popup', '.popup .popup_close');
bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);

//-------------- End Modal Windows ----------------------------------------

//-------------- Work with Tabs --------------------------------------
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = 'flex';
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains(tabSelector.replace(/\./,""))||
        target.parentNode.classList.contains(tabSelector.replace(/\./,""))) {
            tab.forEach((item,i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
//---------------- End of work with tabs--------------------------------------

//------------------Check number in the input ------------------------------
const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};
//-------------------End check numbers in the input-------------------------

//---------------------Start----------------------------------------------
const changeModalState = (stat) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img');
    const windowWidth = document.querySelectorAll('#width');
    const windowHeight = document.querySelectorAll('#height');
    const windowType = document.querySelectorAll('#view_type');
    const windowProfile = document.querySelectorAll('.checkbox');

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


//---------------------End---------------------------------------

//------------ Sending data to server ------------------------------------
function forms (state) {
const form = document.querySelectorAll('form');
const inputs = document.querySelectorAll('input');
//const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

/*phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/,'');
    });
}); */

checkNumInputs('input[name="user_phone"]');

const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

const clearInputs = () => {
    inputs.forEach(item => {
        item.value = '';
    });
};

form.forEach(item => {
    item.addEventListener('submit', (e) => {
        e.preventDefault();
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.appendChild(statusMessage);

        const formData = new FormData(item);
        if (item.getAttribute('data-calc')==="end") {
            for (let key in state) {
                formData.append(key, state[key]);
            }
        }

        postData('server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 5000);
            });
    });
});
}
//------------------End Sending Data to Sever--------------------------------

//-------------------Start Timer----------------------------------------------------
const timer = (id, deadline) => {
    
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };
    
    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((t/1000)%60);
        const minutes = Math.floor((t/1000/60)%60);
        const hours = Math.floor((t/(1000*60*60))%24);
        const days = Math.floor((t/(1000*60*60*24)));
        return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector);
        const days = document.querySelector("#days");
        const hours = document.querySelector("#hours");
        const minutes = document.querySelector("#minutes");
        const seconds = document.querySelector("#seconds");
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textConttent = "00";
                seconds.textConttent = "00";
                clearInterval(timeInterval);
            }
        }
    };
    setClock(id, deadline);
};

let deadline = '2020-07-28';
timer('.container1', deadline);

//------------------End of Timer----------------------------------------------

changeModalState(modalState);
forms(modalState);
