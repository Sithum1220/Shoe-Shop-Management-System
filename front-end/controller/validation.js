function addError(element, message) {
    element.next('.error').remove();
    element.css('border', '1px solid green');
    element.after('<span class="error">' + message + '</span>');
    element.css('border', '1px solid red');
}

function removeError(element) {
    element.next('.error').remove();
    element.css('border', '');
}
function validateRequired(element) {
    if (!element.val()) {
        addError(element, 'This field is required');
        return false;
    }
    removeError(element)
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
    removeError(element);
    return true;
}
function validateAnyMobileNumber(element) {
    if (!element.val().match(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)) {
        if (element.val() !== ''){
            addError(element, 'Invalid Mobile Number');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    removeError(element);
    return true;
}

function validateItemId(element) {
    if (!element.val().match(/^[A-Z]{3}\d{4}[1-9]$/)) {
        if (element.val() !== ''){
            addError(element, 'Invalid Id.(e.g. FSM00001)');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    removeError(element);
    return true;
}
function validateSupId(element) {
    if (!element.val().match(/^S\d{2}-\d{2}[1-9]$/)) {
        if (element.val() !== ''){
            addError(element, 'Invalid Id.(e.g. S00-001)');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    removeError(element);
    return true;
}

function validateEmptyAndLetters(element) {
    if (!element.val().match(/^[A-Za-z ]+$/)) {
        if (!element.val()){
            removeError(element);
            return true;
        }else {
            addError(element, 'This field must contain only letters and spaces');
            return false;
        }
        
    }
    removeError(element);
    return true;
}

function validateEmptyAndDecimalForPrice(element) {
    if (!element.val().match(/^\d+(\.\d{1,2})?$/)) {
        if (!element.val()){
            removeError(element);
            return true;
        }else {
            addError(element, 'Invalid Price.');
            return false;
        }
        
    }
    removeError(element);
    return true;
}
function validateEmptyAndNumbers(element) {
    if (!element.val().match(/^\d{4}$/)) {
        if (!element.val()){
            removeError(element);
            return true;
        }else {
            addError(element, 'Invalid Price.');
            return false;
        }
        
    }
    removeError(element);
    return true;
}

function validateCusId(element) {
    if (!element.val().match(/^C\d{2}-\d{2}[1-9]$/)) {
        if (!element.val()){
            removeError(element);
            return true;
        }else {
            addError(element, 'Invalid Id.(e.g. C00-001)');
            return false;
        }
        
    }
    removeError(element);
    return true;
}

function validatePassword(element) {
    if (!element.val().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {

        if (element.val() !== ''){
            addError(element, '1. At least 8 characters long <br>' +
                '2. Contains at least one uppercase letter <br>' +
                '3. Contains at least one lowercase letter <br>' +
                '4. Contains at least one digit <br>' +
                '5. Contains at least one special character <br>' +
                '(e.g., !@#$%^&*)');
        }else {
            addError(element, 'This field is required');
        }
        return false;
    }
    removeError(element);
    return true;
}

function validatePrice(element) {
    if (!element.val().match(/^\d+(\.\d{1,2})?$/)) {
        if (element.val() !== ''){
            addError(element, 'Invalid Price');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    removeError(element)
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
    removeError(element)
    return true;
}
function validateAnyLandNumber(element) {
    if (!element.val().match(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)) {
        if (element.val() !== ''){
            addError(element, 'Invalid Land Number');
        }else {
            addError(element, 'This field is required');
        }

        return false;
    }
    removeError(element)
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
    removeError(element)
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
    removeError(element)
    return true;
}

function validateLength(element, minLength, maxLength) {
    const length = element.val().length;
    if (length < minLength || length > maxLength) {
        addError(element, `This field must be between ${minLength} and ${maxLength} characters`);
        return false;
    }
    removeError(element)
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
    removeError(element)
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
                case 'price':
                    if (!validatePrice(element)) isValid = false;
                    break;
                case 'empty-price':
                    if (!validateEmptyAndDecimalForPrice(element)) isValid = false;
                    break;
                case 'password':
                    if (!validatePassword(element)) isValid = false;
                    break;
                case 'Id':
                    if (!validateItemId(element)) isValid = false;
                    break;
                case 'supId':
                    if (!validateSupId(element)) isValid = false;
                    break;
                case 'cusId':
                    if (!validateCusId(element)) isValid = false;
                    break;
                case 'empty-numbers':
                    if (!validateEmptyAndNumbers(element)) isValid = false;
                    break;
                case 'any-land-numbers':
                    if (!validateAnyLandNumber(element)) isValid = false;
                    break;
                case 'any-mobile-numbers':
                    if (!validateAnyMobileNumber(element)) isValid = false;
                    break;
                case 'empty-letters':
                    if (!validateEmptyAndLetters(element)) isValid = false;
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

