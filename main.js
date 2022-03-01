const form = document.querySelector('form');
const errorMessage = document.querySelector('#error-container');

const firstName = document.querySelector('#first-name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const psw = document.querySelector('#psw');
const pswConfirm = document.querySelector('#psw-confirm');
const pswError = document.querySelector('#psw ~ span.error');
const pswConfirmError = document.querySelector('#psw-confirm ~ span.error');

const fields = [firstName, email, phone, psw, pswConfirm];
let errorSpan;
let label;

form.addEventListener('submit', function (e) {
  for (const field of fields) {
    if (!field.validity.valid) {
      displayError(field);
      e.preventDefault();
      errorMessage.textContent =
        'There is an error in your form. Please check it again.';
      errorMessage.setAttribute(
        'style',
        'background: rgba(203, 124, 137, 0.5); padding: 1rem 2rem;',
      );
      break;
    } else {
      errorMessage.textContent = 'Welcome !!';
      errorMessage.setAttribute(
        'style',
        'background: rgba(17, 157, 164, 0.5); padding: 1rem 2rem;',
      );
    }
  }
});

fields.forEach((field) => {
  field.addEventListener('input', getValidity);
});

function getValidity() {
  if (this === psw || this === pswConfirm) {
    getPsw();
  } else {
    displayError(this);
  }
}

function displayError(input) {
  errorSpan = document.querySelector(`#${input.id} ~ span.error`);
  label = document.querySelector(`.${input.id} > label`).textContent;

  if (input.validity.valid && input !== psw) {
    errorSpan.textContent = '';
  } else {
    // Email
    if (input === email) {
      if (email.validity.valueMissing) {
        errorSpan.textContent = 'You need to enter an email adress.';
      } else if (email.validity.typeMismatch) {
        errorSpan.textContent = 'You must provide a valid email adress.';
      }
      // Password
    } else if (input === pswConfirm) {
      console.log('eezrz');
      pswConfirmError.textContent = 'Passwords do not match!';
    } else if (input === psw) {
      errorSpan.textContent =
        'Your password must be at least 6 characters and contain at least one uppercase, one lowercase, and one number.';
    }
    if (input.validity.tooShort) {
      errorSpan.textContent = `${label} should be at least ${input.minLength} characters.`;
    }
  }
}

function getPsw() {
  if (!psw.validity.valid) {
    displayError(psw);
  } else {
    pswError.textContent = '';
  }
  if (psw.value !== pswConfirm.value) {
    pswConfirm.setCustomValidity('Invalid');
    displayError(pswConfirm);
  } else {
    pswConfirmError.textContent = '';
    if (psw.validity.valid) {
      pswConfirm.setCustomValidity('');
    }
  }
}
