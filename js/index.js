$(function () {
    $('#room-input').popover({
        container: 'form',
        html: true,
        // sanitize: false,
        content: createRoomElement,
        placement: 'bottom'
    });
});

$('#room-input').on('shown.bs.popover', function () {
    const addRoomBtn = document.getElementById('add-room');
    addRoomBtn.addEventListener('click', () => {
        addRoom();
    });

    const childrenSelect = document.querySelector('select[name=children]');
    childrenSelect.addEventListener('change', () => {
        const totalChildren = childrenSelect.value;
        showAgeSelect(totalChildren);
    });
});

window.addEventListener('load', () => {
    setDate();
    createOptionsNights();
});

const formElements = [...document.forms[0].children];

function setDate () {
    const dateInput = formElements[3];
    const date = new Date();
    const day = date.getDate();
    const dayFormat = (day < 10) ? `0${day}` : day;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${year}-${month}-${dayFormat}`;
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

function createRoomsContainer () {
    const div = document.createElement('div');
    div.id = 'new-room';
    return div;
}

function createRoomElement () {
    if ('content' in document.createElement('template')) {
        const newRoomElement = createRoomsContainer();
        const roomTemplate = document.querySelector('#room');
        const clone = document.importNode(roomTemplate.content, true);
        newRoomElement.appendChild(clone);
        return newRoomElement;
    } else {
        // Buscar otra manera de añadir habitaciones
        // porque el elemento template no está soportado.
    }
}

function addRoom () {
    // const btn = document.getElementById('add-room');
    // btn.addEventListener('click', () => {
    const roomElement = document.getElementById('total-rooms');
    const totalRoomElements = roomElement.childElementCount;
    if (totalRoomElements < 4) {
        const roomTemplate = document.querySelector('#room');
        const clone = document.importNode(roomTemplate.content.firstElementChild.firstElementChild, true);
        const roomNumEl = clone.firstElementChild.firstElementChild;
        roomNumEl.firstChild.remove();
        const numberNode = document.createTextNode(totalRoomElements + 1);
        roomNumEl.appendChild(numberNode);
        console.log();
        roomElement.appendChild(clone);
        console.log(roomElement.childElementCount);
    }
    // });
}

function showAgeSelect (totalChildren) {
    for (let i = 0; i < totalChildren; i++) {
        const childAgeTemplate = document.querySelector('#child-age');
        const clone = document.importNode(childAgeTemplate.content, true);
        const parent = childAgeTemplate.previousElementSibling;
        parent.appendChild(clone);
    }
}
