window.addEventListener('load', () => {
    setDate();
    createOptionsNights();
});

const formElements = [...document.forms[0].children];

function setDate () {
    const dateInput = formElements[3];
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    dateInput.setAttribute('min', today);
    dateInput.value = today;
}

function createOptionsNights () {
    const nightSelect = formElements[5];
    const maxNights = 14;
    for (let i = 1; i <= maxNights; i++) {
        const option = document.createElement('option');
        const value = (i === 1) ? `${i} Night` : `${i} Nights`;
        option.value = value;
        const text = document.createTextNode(value);
        option.appendChild(text);
        nightSelect.appendChild(option);
    }
}

const roomsInput = document.querySelector('input[name="rooms"');
roomsInput.addEventListener('click', () => {
    createRoomElement();
});

function createRoomElement () {
    if ('content' in document.createElement('template')) {
        const newRoomElement = document.querySelector('#new-room');
        if (newRoomElement.hasChildNodes) {
            const children = [...newRoomElement.children];
            children.forEach(child => {
                child.remove();
            });
        }
        const roomTemplate = document.querySelector('#room');
        const clone = document.importNode(roomTemplate.content, true);
        newRoomElement.appendChild(clone);
    } else {
        // Buscar otra manera de añadir habitaciones
        // porque el elemento template no está soportado.
    }
}
