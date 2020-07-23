import modals from './modules/modals.js';
import sliders from './modules/sliders.js';
import forms from './modules/forms.js';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    modals();
    sliders('.feedback-slider-item','', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms();
});