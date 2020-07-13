//------------ Sending data to server ------------------------------------
const forms = document.querySelectorAll('form');
const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);
        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        console.log(json);
        request.send(json);
        request.addEventListener('load', () => {
            if (request.status === 200) {
                statusMessage.testContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000); 
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
}

