window.addEventListener('load', () => {
    setDate();
});

function setDate () {
    const dateInput = [...document.forms[0].children][3];
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    dateInput.setAttribute('min', today);
    dateInput.value = today;
}
