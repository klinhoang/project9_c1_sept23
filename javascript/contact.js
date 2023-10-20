document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');

    function validateInput(input) {
        if (input.checkValidity()) {
            input.style.borderColor = '#ccc';
            return true;
        } else {
            input.style.borderColor = 'red';
            return false;
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function checkFormValidity() {
        return validateInput(nameInput) && validateInput(emailInput) && validateInput(messageInput);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (checkFormValidity()) {
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
        }
    }

    nameInput.addEventListener('input', () => validateInput(nameInput));
    emailInput.addEventListener('input', () => validateInput(emailInput));
    messageInput.addEventListener('input', () => validateInput(messageInput));

    emailInput.addEventListener('blur', function() {
        if (emailInput.value.trim() !== '' && !validateEmail(emailInput.value.trim())) {
            emailInput.style.borderColor = 'red';
            const errorElement = document.createElement('div');
            errorElement.classList.add('error');
            errorElement.textContent = 'Please enter a valid email address';
            emailInput.parentElement.appendChild(errorElement);
        }
    });

    emailInput.addEventListener('input', function() {
        emailInput.style.borderColor = '';
        const errorElement = emailInput.parentElement.querySelector('.error');
        if (errorElement) {
            errorElement.remove();
        }
    });

    messageInput.addEventListener('input', () => validateInput(messageInput));

    contactForm.addEventListener('submit', handleFormSubmit);

    nameInput.addEventListener('blur', () => validateInput(nameInput));
    emailInput.addEventListener('blur', () => validateInput(emailInput));
    messageInput.addEventListener('blur', () => validateInput(messageInput));

    contactForm.addEventListener('input', () => {
        submitButton.disabled = !checkFormValidity();
    });
});
