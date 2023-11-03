document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const jsonDisplay = document.getElementById('jsonDisplay'); // Added an element for displaying JSON

    // Function to validate form inputs
    function validateInput(input) {
        if (input.checkValidity()) {
            input.style.borderColor = '#ccc';
            return true;
        } else {
            input.style.borderColor = 'red';
            return false;
        }
    }

    // Function to validate email using regex
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to check overall form validity
    function checkFormValidity() {
        return validateInput(nameInput) && validateInput(emailInput) && validateInput(messageInput);
    }

    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();

        if (checkFormValidity()) {
            // Create a JSON object with form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            };

            // Convert JSON object to string
            const jsonString = JSON.stringify(formData);
            console.log(jsonString); // Log JSON string to console

            // Display JSON string on the webpage
            jsonDisplay.textContent = jsonString;
            jsonDisplay.style.display = 'block';

            // Hide the form and display success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
        }
    }

    // Event listeners for input events
    nameInput.addEventListener('input', () => validateInput(nameInput));
    emailInput.addEventListener('input', () => validateInput(emailInput));
    messageInput.addEventListener('input', () => validateInput(messageInput));

    // Event listener for blur event on email input
    emailInput.addEventListener('blur', function() {
        if (emailInput.value.trim() !== '' && !validateEmail(emailInput.value.trim())) {
            emailInput.style.borderColor = 'red';
            const errorElement = document.createElement('div');
            errorElement.classList.add('error');
            errorElement.textContent = 'Please enter a valid email address';
            emailInput.parentElement.appendChild(errorElement);
        }
    });

    // Event listener to remove error message on valid email input
    emailInput.addEventListener('input', function() {
        emailInput.style.borderColor = '';
        const errorElement = emailInput.parentElement.querySelector('.error');
        if (errorElement) {
            errorElement.remove();
        }
    });

    // Event listener for input event on message input
    messageInput.addEventListener('input', () => validateInput(messageInput));

    // Event listener for form submission
    contactForm.addEventListener('submit', handleFormSubmit);

    // Event listeners for blur events on inputs
    nameInput.addEventListener('blur', () => validateInput(nameInput));
    emailInput.addEventListener('blur', () => validateInput(emailInput));
    messageInput.addEventListener('blur', () => validateInput(messageInput));

    // Event listener to disable/enable submit button based on form validity
    contactForm.addEventListener('input', () => {
        submitButton.disabled = !checkFormValidity();
    });
});
