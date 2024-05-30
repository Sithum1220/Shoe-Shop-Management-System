const signinBtn = $('#signinBtn'),
    form_container = $('.form-container'),
    form_close = $('.from_close'),
    loginBtn = $('#loginNow'),
    pwShowHide = $('.pw_hide'),
    adminBtn = $('#adminBtn'),
    cashierBtn = $('#cashierBtn'),
    adminInputBox = $('.adminInputBox'),
    cashierInputBox = $('.cashierInputBox'),
    employeeRole = $('#employeeRole'),
    employeePageUserCredentials = $('.employeePageUserCredentials');



signinBtn.click(function () {
    $("#log-in-Password").val('')
    $('#wrongPW').addClass('d-none')
})
form_close.click(function () {
    $("#log-in-Username").val('')
})



// cashierBtn.click(function () {
//     adminBtn.css("background", "white").css("color", "#000");
//     cashierBtn.css("background", "#1F5F9F").css("color", "#fff");
//     adminInputBox.css("display", "none");
//     cashierInputBox.css("display", "block");
// })
// adminBtn.click(function () {
//     adminBtn.css("background", "#1F5F9F").css("color", "#fff");
//     cashierBtn.css("background", "white").css("color", "#000");
//     adminInputBox.css("display", "block");
//     cashierInputBox.css("display", "none");
// })
$('#SignUpButton').click(function () {
    generateNewId();
    currentStep = 0;
    $(".greetingPage").addClass("d-none");
    $('#signupBtn').prop("disabled", false);

})

employeeRole.change(function () {
    console.log($(this).val());
    $('#EmployeePageUserPasswword').val("")
    $('#EmployeePageUserPasswword2').val("")
    if ($(this).val() === 'ADMIN' || $(this).val() === 'USER') {
        employeePageUserCredentials.removeClass('d-none');
    } else {
        employeePageUserCredentials.addClass('d-none');
    }
})

