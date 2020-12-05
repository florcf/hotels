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
        childrenSelectsEvent();
    });
    childrenSelectsEvent();
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
        createDeleteRoomElement(clone);
        deleteRoomEvent(clone.firstElementChild);
        roomElement.appendChild(clone);
    }
    // });
}

function reassignRoomNumber () {
    const roomElements = document.getElementById('total-rooms');
    const rooms = [...roomElements.children];
    for (let i = 1; i < rooms.length; i++) {
        const roomNumElement = rooms[i].firstElementChild.nextElementSibling.firstElementChild;
        roomNumElement.firstChild.remove();
        const number = i + 1;
        const numberNode = document.createTextNode(number);
        roomNumElement.appendChild(numberNode);
    }
}

function createDeleteRoomElement (parentElement) {
    const closeBtn = document.createElement('h4');
    const closeElement = document.createTextNode('x');
    closeBtn.appendChild(closeElement);
    parentElement.insertBefore(closeBtn, parentElement.firstElementChild);
}

function deleteRoomEvent (element) {
    element.addEventListener('click', () => {
        element.parentElement.remove();
        reassignRoomNumber();
    });
}

function showAgeSelect (totalChildren, parentElement) {
    if (parentElement.hasChildNodes()) {
        const childrenElements = [...parentElement.children];
        childrenElements.forEach(childElement => childElement.remove());
    }
    for (let i = 0; i < totalChildren; i++) {
        const childAgeTemplate = document.querySelector('#child-age');
        const clone = document.importNode(childAgeTemplate.content, true);
        parentElement.appendChild(clone);
    }
}

function childrenSelectsEvent () {
    const childrenSelect = [...document.querySelectorAll('select[name=children]')];
    childrenSelect.forEach(child => {
        child.addEventListener('change', () => {
            const totalChildren = child.value;
            showAgeSelect(totalChildren, child.nextElementSibling);
        });
    });
}
