/*import modals from './modules/modals';
*/
/*
window.addEventListener('DOMContentLoaded', () => {
    modals();
});
*/
//-------------- Modal windows -----------------------------------
function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);

    trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                e.preventDefault();
                }
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            });
    });

    close.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    });
}

bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
bindModal('.phone_link', '.popup', '.popup .popup_close');

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
//---------------- End of work with tabs--------------------------------------

//------------ Sending data to server ------------------------------------
const form = document.querySelectorAll('form');
const inputs = document.querySelectorAll('input');
const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/,'');
    });
});

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

        postData('/assets/server.php', formData)
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
//------------------End Sending Data to Sever--------------------------------

//------------------ Calculator Modal Window ------------------------------
function calcModal(calc_btnSelector, calc_windowSelector, calc_closeSelector) {
    const calc_btn = document.querySelectorAll(calc_btnSelector);
    const calc_window = document.querySelector(calc_windowSelector);
    const calc_close = document.querySelector(calc_closeSelector);
    const big_img = document.querySelectorAll('.big_img img');
    const calcInputs = document.querySelectorAll('.popup_calc_content .form-control');
    const calc_button = document.querySelector('.popup_calc_button');
    const calc_profile = document.querySelector('.popup_calc_profile');
    const calc_profile_button = document.querySelector('.popup_calc_profile_button');
    const calc_profile_close = document.querySelector('.popup_calc_profile_close');
    const calc_end = document.querySelector('.popup_calc_end');
    const calc_end_close = document.querySelector('.popup_calc_end_close');

    calc_btn.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
        calc_window.style.display = "block";
        document.body.style.overflow = "hidden";
        });
    });

    calc_close.addEventListener('click', () => {
        calc_window.style.display = "none";
        document.body.style.overflow = "";
    });

    calcInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/,'');
        });
    });

    calc_button.addEventListener('click', () => {
        calc_window.style.display = "none";
        calc_profile.style.display = "flex";

        calc_profile_close.addEventListener('click', () => {
            calc_profile.style.display = "none";
            document.body.style.overflow = "";
        });

        calc_profile_button.addEventListener('click', () => {
            calc_profile.style.display = "none";
            calc_end.style.display = "flex";

            calc_end_close.addEventListener('click', () => {
                calc_end.style.display = "none";
                document.body.style.overflow = "";
            });
        });

    });
  
    function balcons (headerbalconSelector, imgbalconSelector) {
        const header_balcon = document.querySelector(headerbalconSelector);
        const img_balcon = document.querySelectorAll(imgbalconSelector);
        //const img_more = document.querySelector(imgmoreSelector);

        function hideImgMore() {
            img_balcon.forEach(item => {
                item.classList.remove('do_image_more');
            });

            big_img.forEach(item => {
                item.style.display = 'none';
            });
        }

        function showImgMore(i = 0) {
            img_balcon[i].classList.add('do_image_more');
            big_img[i].style.display='flex';
        }

        hideImgMore();
        showImgMore(0);

        header_balcon.addEventListener('click', (e) => {
            const target = e.target;
                img_balcon.forEach((item,i) => {
                    if (target == item || target.parentNode == item) {
                        hideImgMore();
                        showImgMore(i);
                    }
                });
        });

    }

    balcons('.balcon_icons', '.balcon_icons_img');
}


calcModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
//----------------End calculator modal window-----------------------------------