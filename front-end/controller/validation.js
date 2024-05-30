function addError(element, message) {
    element.next('.error').remove();
    element.after('<span class="error">' + message + '</span>');
    element.css('border', '1px solid red');
}


function validateRequired(element) {
    if (!element.val()) {
        addError(element, 'This field is required');
        return false;
    }
    return true;
}

function validateMobileNumber(element) {
    if (!element.val().match(/^(?:7|0|\+94)[0-9]{9,10}$/)) {
        if (element.val() !== ''){
            addError(element, 'Invalid Mobile Number');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    return true;
}

function validateLandNumber(element) {
    if (!element.val().match(/^[0]{1}[12345689]{1}[0-9]{1}[0-9]{7}$/)) {
        if (element.val() !== ''){
            addError(element, 'Invalid Land Number');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    return true;
}

function validateLettersAndSpaces(element) {
    if (!element.val().match(/^[a-zA-Z\s]+$/)) {
        if (element.val() !== ''){
            addError(element, 'This field must contain only letters and spaces');
        }else {
            addError(element, 'This field is required');
        }
        return false;
    }
    return true;
}

function validateNumeric(element) {
    if (!element.val().match(/^[0-9]+$/)) {
        if (element.val() !== ''){
            addError(element, 'This field must be numeric');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    return true;
}

function validateLength(element, minLength, maxLength) {
    const length = element.val().length;
    if (length < minLength || length > maxLength) {
        addError(element, `This field must be between ${minLength} and ${maxLength} characters`);
        return false;
    }
    return true;
}

function validateEmail(element) {
    if (!element.val().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        if (element.val() !== ''){
            addError(element, 'Please enter a valid email address');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    return true;
}


function validateForm(form) {

    form.find('.error').remove();

    let isValid = true;


    form.find('[data-validate]').each(function () {
        const element = $(this);
        const validations = element.data('validate').split(' ');
        console.log(element)
        validations.forEach(validation => {
            switch (validation) {
                case 'required':
                    if (!validateRequired(element)) isValid = false;
                    break;
                case 'mobile-number':
                    if (!validateMobileNumber(element)) isValid = false;
                    break;
                case 'land-number':
                    if (!validateLandNumber(element)) isValid = false;
                    break;
                case 'letters':
                    if (!validateLettersAndSpaces(element)) isValid = false;
                    break;
                case 'numeric':
                    if (!validateNumeric(element)) isValid = false;
                    break;
                case 'email':
                    if (!validateEmail(element)) isValid = false;
                    break;
                case 'length':
                    const minLength = element.data('min-length') || 0;
                    const maxLength = element.data('max-length') || Infinity;
                    if (!validateLength(element, minLength, maxLength)) isValid = false;
                    break;
            }
        });
    });

    return isValid;
}

