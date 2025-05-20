document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const formContainer = document.querySelector('.form-container');
    const registerTrigger = document.querySelector('.register-trigger');

    // Show form when hovering over the trigger
    registerTrigger.addEventListener('mouseenter', function() {
        formContainer.style.opacity = '1';
        formContainer.style.visibility = 'visible';
        formContainer.style.transform = 'translateY(0)';
    });

    // Keep form visible when hovering over it
    formContainer.addEventListener('mouseenter', function() {
        formContainer.style.opacity = '1';
        formContainer.style.visibility = 'visible';
        formContainer.style.transform = 'translateY(0)';
    });

    // Hide form when mouse leaves both trigger and form
    formContainer.addEventListener('mouseleave', function() {
        formContainer.style.opacity = '0';
        formContainer.style.visibility = 'hidden';
        formContainer.style.transform = 'translateY(20px)';
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        clearErrors();
        
        // Validate inputs
        const fullnameValid = validateFullname();
        const emailValid = validateEmail();
        const passwordValid = validatePassword();
        const confirmPasswordValid = validateConfirmPassword();
        const phoneValid = validatePhone();
        
        if (fullnameValid && emailValid && passwordValid && confirmPasswordValid && phoneValid) {
            // Form is valid - you can submit to server here
            alert('Registration successful!');
            form.reset();
        }
    });

    // Field validation functions
    function validateFullname() {
        const fullname = document.getElementById('fullname');
        const errorElement = document.getElementById('fullname-error');
        
        if (fullname.value.trim() === '') {
            showError(fullname, errorElement, 'Full name is required');
            return false;
        } else if (fullname.value.trim().length < 3) {
            showError(fullname, errorElement, 'Full name must be at least 3 characters');
            return false;
        }
        
        showSuccess(fullname);
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email');
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.value.trim() === '') {
            showError(email, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, errorElement, 'Please enter a valid email');
            return false;
        }
        
        showSuccess(email);
        return true;
    }

    function validatePassword() {
        const password = document.getElementById('password');
        const errorElement = document.getElementById('password-error');
        
        if (password.value.trim() === '') {
            showError(password, errorElement, 'Password is required');
            return false;
        } else if (password.value.length < 8) {
            showError(password, errorElement, 'Password must be at least 8 characters');
            return false;
        }
        
        showSuccess(password);
        return true;
    }

    function validateConfirmPassword() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const errorElement = document.getElementById('confirmPassword-error');
        
        if (confirmPassword.value.trim() === '') {
            showError(confirmPassword, errorElement, 'Please confirm your password');
            return false;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, errorElement, 'Passwords do not match');
            return false;
        }
        
        showSuccess(confirmPassword);
        return true;
    }

    function validatePhone() {
        const phone = document.getElementById('phone');
        const errorElement = document.getElementById('phone-error');
        const phoneRegex = /^[0-9]{10,15}$/;
        
        if (phone.value.trim() === '') {
            showError(phone, errorElement, 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(phone.value)) {
            showError(phone, errorElement, 'Please enter a valid phone number');
            return false;
        }
        
        showSuccess(phone);
        return true;
    }

    // Helper functions
    function showError(input, errorElement, message) {
        input.parentElement.classList.add('error');
        errorElement.textContent = message;
    }

    function showSuccess(input) {
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('success');
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(element => {
            element.textContent = '';
        });
        
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
            group.classList.remove('success');
        });
    }

    // Real-time validation for better UX
    document.getElementById('fullname').addEventListener('blur', validateFullname);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirmPassword').addEventListener('blur', validateConfirmPassword);
    document.getElementById('phone').addEventListener('blur', validatePhone);
});