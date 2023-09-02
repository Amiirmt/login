const getButton = document.getElementById('get');
const multiInput = document.querySelector('multi-input');
const values = document.querySelector('#values');

getButton.onclick = () => {
    if (multiInput.getValues().length > 0) {
        values.textContent = multiInput.getValues();
        alert(multiInput.getValues());
    } else {

        values.textContent = 'null';
    }
}


//document.querySelector('input').focus();