
const card = document.querySelector('#card'),
      btnOpenForm = document.querySelector('#btn-open-form'),
      form = document.querySelector('#form-card'),
      cardNumber = document.querySelector('#card .number'),
      cardName = document.querySelector('#card .name'),
      brandLogo = document.querySelector('#logo-brand'),
      signature = document.querySelector('#card .signature p'),
      monthExpiration = document.querySelector('#card #expiration .month'),
      yearExpiration = document.querySelector('#card #expiration .year'),
      ccv = document.querySelector('#card .ccv');


/* Flip the card for the user to see the front */

const showFront = () => {
    if(card.classList.contains('active')){
        card.classList.remove('active');
    }
}

/* Card rotate*/

card.addEventListener('click', () => {
  card.classList.toggle('active');
});

/* Button - Open Form*/

btnOpenForm.addEventListener('click', () => {
  btnOpenForm.classList.toggle('active');
  form.classList.toggle('active');
});

/* Select dynamically generated - mounth */

for(let i = 1; i <= 12; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    form.selectMonth.appendChild(option);
}

/* Select dynamically generated - year */

const currentYear = new Date().getFullYear();

for( let i = currentYear; i <= currentYear + 8; i++){
    let option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    form.selectYear.appendChild(option);
}

/* Input - card number */

form.inputNumber.addEventListener('keyup', (e) => {
    let inputValue = e.target.value;

    //Whitespaces 
    form.inputNumber.value = inputValue
    .replace(/\s/g, '')
    //Remove the letters
    .replace(/\D/g, '')
    //Whitespaces every 4 digits
    .replace(/([0-9]{4})/g, '$1 ')
    //Remove last spacing
    .trim();

    cardNumber.textContent = inputValue;

    if(inputValue == ''){
        cardNumber.textContent='#### #### #### ####';
        brandLogo.innerHTML = '';
    }

    if(inputValue[0] == 4){
        brandLogo.innerHTML = '';
        const image = document.createElement('img');
        image.src = 'img/logo/visa.png';
        brandLogo.appendChild(image);
    }
        else if(inputValue[0] == 5){
        brandLogo.innerHTML = '';
        const image = document.createElement('img');
        image.src = 'img/logo/mastercard.png';
        brandLogo.appendChild(image);
    }
    
    //execute the function
    showFront();

});

/* Input - card name */

form.inputName.addEventListener('keyup', (e) => {
    let inputValue = e.target.value;
    
    form.inputName.value = inputValue.
    replace(/[0-9]/g, '');
    cardName.textContent = inputValue;
    signature.textContent = inputValue;

    if(inputValue == ''){
        cardName.textContent = 'Jhon Doe';
    }

    showFront();
});

// Select month

form.selectMonth.addEventListener('change', (e) => {
    monthExpiration.textContent = e.target.value;
    showFront();
});

// Select year

form.selectYear.addEventListener('change', (e) => {
    yearExpiration.textContent = e.target.value.slice(2);
    showFront();
});

// ccv

form.inputCCV.addEventListener('keyup', () => {
    if(!card.classList.contains('active')){
        card.classList.toggle('active');
    }

    form.inputCCV.value = form.inputCCV.value
    //Whitespaces
    .replace(/\s/g, '')
    //Remove the letters
    .replace(/\D/g, '');

    ccv.textContent = form.inputCCV.value;
});