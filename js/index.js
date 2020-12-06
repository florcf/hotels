window.addEventListener('load', () => {
    setDate();
});

const formElements = [...document.forms[0].children];

$(function () {
    $('#room-input').popover({
        container: 'form',
        html: true,
        // sanitize: false,
        content: createRoomElement,
        placement: 'bottom'
    });

    $('#room-input').on('shown.bs.popover', function () {
        const addRoomBtn = document.getElementById('add-room');
        addRoomBtn.addEventListener('click', () => {
            addRoom();
            childrenSelectsEvent();
        });
        childrenSelectsEvent();

        const roomInput = formElements[3].lastElementChild;
        roomInput.addEventListener('click', () => {
            roomInput.value = setRoomsInputValue();
        });

        const doneBtn = document.querySelector('#done');
        doneBtn.addEventListener('click', () => {
            $('#room-input').popover('hide');
        });
    });

    $('#nights-select').popover({
        container: 'form',
        html: true,
        content: createOptionsNights,
        placement: 'bottom'
    });

    $('#nights-select').on('shown.bs.popover', function () {
        const nightOptionsElements = [...document.getElementById('nightOptions').children];
        nightOptionsElements.forEach(element => {
            const classValue = element.classList.value;
            if (classValue === 'enabledOption') {
                element.addEventListener('click', () => {
                    formElements[2].lastElementChild.value = element.firstChild.nodeValue;
                    $('#nights-select').popover('hide');
                });
            }
        });
    });
});

function setDate () {
    const dateInput = formElements[1].lastElementChild;
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
    const nightsOptions = document.createElement('div');
    nightsOptions.id = 'nightOptions';
    const maxNights = 14;
    const popularDurations = [4, 7, 10, 14];
    createOptionsHeader('POPULAR DURATIONS', nightsOptions);
    const dailyOptionsTitle = createOptionsHeader('DAILY', nightsOptions);

    for (let i = 1; i <= maxNights; i++) {
        const option = document.createElement('option');
        option.className = 'enabledOption';
        const value = (i === 1) ? `${i} Night` : `${i} Nights`;
        option.value = i;
        const text = document.createTextNode(value);
        option.appendChild(text);
        nightsOptions.appendChild(option);
        if (popularDurations.includes(i)) nightsOptions.insertBefore(option, dailyOptionsTitle);
    }
    return nightsOptions;
}

function createOptionsHeader (title, parent) {
    const element = document.createElement('option');
    element.disabled = true;
    const titleText = document.createTextNode(title);
    element.appendChild(titleText);
    parent.appendChild(element);
    return element;
}

function createRoomsContainer () {
    const div = document.createElement('div');
    div.id = 'new-room';
    return div;
}

function createRoomElement () {
    const newRoomElement = createRoomsContainer();
    const roomTemplate = document.querySelector('#room');
    const clone = document.importNode(roomTemplate.content, true);
    newRoomElement.appendChild(clone);
    return newRoomElement;
}

function addRoom () {
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

function setRoomsInputValue () {
    const totalRooms = document.getElementById('total-rooms');
    const rooms = [...totalRooms.children];
    const roomsNumber = rooms.length;
    let guests = 0;
    const adults = document.querySelectorAll('select[name="adults"]');
    adults.forEach(adult => { guests += parseInt(adult.value); });
    const children = document.querySelectorAll('select[name="children"]');
    children.forEach(child => { guests += parseInt(child.value); });
    const roomsInfo = (roomsNumber === 1) ? `${roomsNumber} room` : `${roomsNumber} rooms`;
    const guestsInfo = (guests === 1) ? `${guests} guest` : `${guests} guests`;
    return `${roomsInfo} & ${guestsInfo}`;
}

const consoleLog = (name, value) => console.log(`%c${name}: %c${value}`, 'color: #FF9671; font-size: 1rem; font-weight: bold', 'font-size: 1rem;');

const inputValue = (selector) => document.querySelector(selector).value;

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    console.clear();
    console.log('%cHOTEL RESERVATION', 'color: #00B39B; font-size: 2rem; font-weight: bold');

    const destination = inputValue('input[name="destination"]');
    consoleLog('Destination', destination);

    const date = inputValue('input[type="date"]');
    consoleLog('Check In Date', date);

    const selectedNights = inputValue('#nights-select');
    const number = selectedNights.split(' ')[0];
    consoleLog('Nights', number);

    console.log('%cRooms:', 'color: #FF9671; font-size: 1rem; font-weight: bold');
});
