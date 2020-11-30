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
    const nights = 14;
    for (let i = 1; i <= nights; i++) {
        const option = document.createElement('option');
        const value = (i === 1) ? `${i} Night` : `${i} Nights`;
        option.value = value;
        const text = document.createTextNode(value);
        option.appendChild(text);
        nightSelect.appendChild(option);
    }
}
