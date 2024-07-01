signUp();
signIn();
userImageUploader();
resetPw();

let base64String;
let newId;
$(document).ready(function () {
    signUpForm();
})
var currentStep = 0;
var steps = $('.form-step');
let emRole;

$('#forgotPw').click(function () {
    $('#signInClose').click();
})
$('#signUp').click(function () {
    $('#signInClose').click();
})

$('#employeeRole').change(function () {
    emRole = $('#employeeRole').val();
})

function generateNewId() {
    fetch("http://localhost:8080/api/v1/users/id")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Read response as text
        })
        .then(data => {
            console.log(data);
            newId = data.data; // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function signUp() {
    $('#signupBtn').click(function () {
        if ($('#signupBtn').text() === "Sign Up") {
            if (emRole === 'ADMIN' || emRole === 'USER') {
                if ($('#EmployeePageUserPasswword').val() === $('#EmployeePageUserPasswword2').val()) {
                    if ($('#imgUploader').val() === '') {
                        base64String = null;
                    }

                    let dob = $('#employeeDOB').val();
                    let doj = $('#employeeDOJ').val();

                    const parts = dob.split('/');
                    var mm = parts[0];
                    var dd = parts[1];
                    var yyyy = parts[2];


                    const partsDoj = doj.split('/');
                    var DOJmm = partsDoj[0];
                    var DOJdd = partsDoj[1];
                    var DOJyyyy = partsDoj[2];

                    let finalDob = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
                    let finalDOJ = `${DOJyyyy}-${DOJmm.padStart(2, '0')}-${DOJdd.padStart(2, '0')}`;

                    const userData = {
                        email: $('#employeeEmail').val(),
                        password: $('#EmployeePageUserPasswword').val(),
                        role: emRole,
                        activeStatus: true,
                        employeeDTO: {
                            email: $('#employeeEmail').val(),
                            employeeId: newId,
                            gender: $('#employeeGender').val(),
                            employeeName: $('#employeeName').val(),
                            employeeStatus: $('#employeeStatus').val(),
                            branch: $('#employeeBranch').val(),
                            designation: $('#employeeDesignation').val(),
                            proPic: base64String,
                            joinDate: finalDOJ,
                            employeeDob: finalDob,
                            role: emRole,
                            address: {
                                buildNo: $('#employeeBuilding').val(),
                                city: $('#employeeCity').val(),
                                lane: $('#employeeLane').val(),
                                state: $('#employeeState').val(),
                                postalCode: $('#employeePostalCode').val()
                            },
                            guardianName: $('#employeeGuardian').val(),
                            contactNo: $('#employeeContactNumber').val(),
                            emergencyContact: $('#employeeGuardianContact').val(),
                            activeStatus: true,
                        }
                    }
                    $.ajax({
                        url: "http://localhost:8080/api/v1/users/signup",
                        method: "POST",
                        data: JSON.stringify(userData),
                        contentType: "application/json",
                        success: function (resp) {
                            $('.txt').val("")
                            $('#employeeGender').val($('#employeeGender option:first').val());
                            $('#employeeRole').val($('#employeeRole option:first').val());
                            // Swal.fire({
                            //     position: "top-end",
                            //     icon: "success",
                            //     title: "Successfully Registered!",
                            //     showConfirmButton: false,
                            //     timer: 1500
                            // });
                            $(steps[currentStep]).removeClass('active').addClass('slide-out');
                            currentStep++;
                            $(steps[currentStep]).addClass('active slide-in');


                            $(".greetingPage").removeClass("d-none");
                            $('#signupBtn').prop("disabled", true);
                            $('#backAndClose').text("Close")
                            $('#backAndClose').attr("data-bs-dismiss", 'modal');

                        },
                        error: function (resp) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: resp.responseJSON.message,
                                footer: '<a href="#"></a>'
                            });
                        }
                    })

                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Password do not match",
                        footer: '<a href="#"></a>'
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please Add Role",
                    footer: '<a href="#"></a>'
                });
            }
        } else if ($('#signupBtn').text() === "Login Now") {
            alert("kkjkj")
            $('#employeePopupClose').click();
            $('#loginBtn').click();
        }
    })
}

function signIn() {

    $('#loginNow').click(function () {

        let signInForm = $('#signInForm');
        if (!validateForm(signInForm)) {
            return;
        }

        let value = {
            email: $("#log-in-Username").val(),
            password: $("#log-in-Password").val(),
        }
        console.log(value);
        $.ajax({
            url: "http://localhost:8080/api/v1/users/signin",
            method: "POST",
            data: JSON.stringify(value),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('email', value.email);
                localStorage.setItem('password', value.password);
                localStorage.setItem('accessToken', res.token);
                console.log("User SignIn Successfully " + res.token);
                $.ajax({
                    url: "http://localhost:8080/api/v1/users/" + value.email,
                    method: "GET",
                    dataType: "json",
                    success: function (res, textStatus, xhr) {
                        localStorage.setItem('role', res.role);
                        localStorage.setItem('cashier', value.email);
                        if (res.activeStatus === true) {
                            if (res.role === "ADMIN") {
                                console.log("Admin");
                                window.location.href = '../Pages/admin/dashboard.html'
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Successfully Login!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                $('.wrongPW').addClass('d-none')
                            } else if (res.role === "USER") {
                                console.log("User");
                                window.location.href = '../Pages/user/dashboard.html'
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Successfully Login!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                $('.wrongPW').addClass('d-none')
                            }

                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Sorry! Your User Account Disabled, Please Contact Manager",
                                footer: '<a href="#"></a>'
                            });
                        }
                    },
                    error: function (ob, textStatus, error) {

                    }
                });

            },
            error: function (ob, textStatus, error) {
                $('.wrongPW').removeClass('d-none')
            }
        });
    })
}

function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}

function performAuthenticatedRequest() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        $.ajax({
            url: "http://localhost:8080/api/v1/users/signin",
            method: "POST",
            data: JSON.stringify({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
            }),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('accessToken', res.token);
                console.log("sign in Successfully " + res.token);
            },
            error: function (ob, textStatus, error) {
                console.log("token renew sign in error " + accessToken);
            }
        });
    } else {

    }
}

function userImageUploader() {
    const imgUploader = $('#imgUploader');
    const uploadDiv = $('#uploadDiv');

    uploadDiv.click(function () {
        imgUploader.click();
    });

    imgUploader.change(function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                uploadDiv.empty();  // Clear any existing content
                const img = $('<img>').attr('src', e.target.result);
                uploadDiv.append(img);  // Add the image to the div

                // Save the base64 string
                base64String = e.target.result.split(',')[1];
                console.log(base64String);  // You can remove this line if you don't need to log it
            };

            reader.readAsDataURL(file);
        } else {
            uploadDiv.empty();  // Clear the div if no file is selected
            uploadDiv.text('Click to upload files');  // Reset placeholder text
        }
    });
}

$('#backAndClose,#employeePopupClose').click(function () {
    if ($('#backAndClose').text() === 'Close') {
        $('.txt').val("")
        $('#employeeGender').val($('#employeeGender option:first').val());
        $('#employeeRole').val($('#employeeRole option:first').val());
        $('#backAndClose').attr("data-bs-dismiss", 'modal');
    }
});

function signUpForm() {
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true
    });

    $('.next-step').click(function () {
        slider();
    });

    $('.prev-step').click(function () {
        // if ($('#backAndClose').text() === 'Back') {
        if (currentStep > 0) {
            $(steps[currentStep]).removeClass('active').addClass('slide-in');
            currentStep--;
            if (currentStep === 0) {
                $('#title').text("Enter Your Details")
                $('#signupBtn').text("Next")
                $('#backAndClose').text("Close")
                $('#backAndClose').attr("data-bs-dismiss", 'modal');
            } else if (currentStep === 1) {
                $('#title').text("Enter Your Address")
                $('#signupBtn').text("Next")
                $('#backAndClose').text("Back")

            } else if (currentStep === 2) {
                $('#title').text("Enter Your Contact")
                $('#signupBtn').text("Next")
                $('#backAndClose').text("Back")

            } else if (currentStep === 3) {
                $('#title').text("Enter Your Guardian Contact")
                $('#signupBtn').text("Next")
                $('#backAndClose').text("Back")

            } else if (currentStep === 4) {
                $('#title').text("Enter Your Company Details")
                $('#signupBtn').text("Next")
                $('#backAndClose').text("Back")

            } else if (currentStep === 5) {
                $('#title').text("Create New Password")
                $('#signupBtn').text("Next")
                $('#backAndClose').text("Back")

            } else if (currentStep === 6) {
                $('#title').text("Set Your Profile")
                $('#signupBtn').text("Sign Up")
                $('#backAndClose').text("Back")
            }
            $(steps[currentStep]).addClass('active slide-out');
        }
        // }else {
        //     $('#backAndClose').attr("data-bs-dismiss",'modal');
        //     $('#backAndClose').click();
        // }
    });

}

function slider() {
    if (currentStep < steps.length - 1) {

        // if ($('.greetingPage').hasClass('d-none')) {
        //     if (currentStep === 7) {
        //         currentStep = 6;
        //     }
        // }
        if (currentStep === 0) {

            let nameFiledForm = $('#nameFiledForm');
            if (!validateForm(nameFiledForm)) {
                return;
            }

            $(steps[currentStep]).removeClass('active').addClass('slide-out');
            currentStep++;
            $(steps[currentStep]).addClass('active slide-in');

            $('#title').text("Enter Your Address")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        } else if (currentStep === 1) {


            let addressFiledForm = $('#addressFiledForm');
            if (!validateForm(addressFiledForm)) {
                return;
            }
            $(steps[currentStep]).removeClass('active').addClass('slide-out');
            currentStep++;
            $(steps[currentStep]).addClass('active slide-in');

            $('#title').text("Enter Your Contact")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');
        } else if (currentStep === 2) {
            let contactFiledForm = $('#contactFiledForm');
            if (!validateForm(contactFiledForm)) {
                return;
            }

            $(steps[currentStep]).removeClass('active').addClass('slide-out');
            currentStep++;
            $(steps[currentStep]).addClass('active slide-in');

            $('#title').text("Enter Your Guardian Contact")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');
        } else if (currentStep === 3) {

            let guardianFiledForm = $('#guardianFiledForm');
            if (!validateForm(guardianFiledForm)) {
                return;
            }

            $(steps[currentStep]).removeClass('active').addClass('slide-out');
            currentStep++;
            $(steps[currentStep]).addClass('active slide-in');

            $('#title').text("Enter Your Company Details")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        } else if (currentStep === 4) {
            let companyFiledForm = $('#companyFiledForm');
            if (!validateForm(companyFiledForm)) {
                return;
            }
            $(steps[currentStep]).removeClass('active').addClass('slide-out');
            currentStep++;
            $(steps[currentStep]).addClass('active slide-in');

            $('#title').text("Create New Password")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');
        } else if (currentStep === 5) {
            let passwordFiledForm = $('#passwordFiledForm');
            if (!validateForm(passwordFiledForm)) {
                return;
            }
            $(steps[currentStep]).removeClass('active').addClass('slide-out');
            currentStep++;
            $(steps[currentStep]).addClass('active slide-in');

            $('#title').text("Set Your Profile")
            $('#signupBtn').text("Sign Up")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        }
    }
}

function resetPw() {
    var resetPageCurrentStep = 0;
    var resetPWSteps = $('.formStep');

    $('.nextStep').click(function () {

        let checkBtn = true;
        if ($('#changePW').text() === 'Close') {
            console.log("AA")
            $('#wrongPW').addClass('d-none');
            resetPageCurrentStep = 0;
            $(resetPWSteps[resetPageCurrentStep]).addClass('active');
            $('#closeBtn').click();
            checkBtn = false;
            $('#changePW').text("Get Verification")
            $('#errorMsg').css('color', 'red');
            $('.checkPW').css('border', 'red solid 1px');
            $('#email').val('');
            $('#code').val('');
            $('#newPassword').val('');
            $('#confirmPassword').val('');

        }

        if (checkBtn) {
            if (resetPageCurrentStep === 0) {

                let emailForm = $('#emailForm');
                if (!validateForm(emailForm)) {
                    return;
                }

                $('#msg').text("Provide the email address associated with your account to recover your password.")
                $('#changePW').text("Get Verification")

                var email = $('#email').val();

                $.ajax({
                    url: 'http://localhost:8080/api/v1/users/request-password-reset/' + email,
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(email),
                    success: function (response) {
                        console.log(resetPageCurrentStep);
                        $('#wrongPW').addClass('d-none');
                        console.log(response);
                        resetPageCurrentStep = 1;
                        $(resetPWSteps[resetPageCurrentStep - 1]).removeClass('active').addClass('slide-out');
                        $(resetPWSteps[resetPageCurrentStep]).addClass('active slide-in');
                        $('#wrongPW').addClass('d-none');
                    },
                    error: function (xhr, status, error) {
                        $('#errorMsg').text(xhr.responseJSON.message);
                        $('#wrongPW').removeClass('d-none');
                        $('#errorMsg').css('color', 'red');
                        $('.checkPW').css('border', 'red solid 1px');
                    }
                });
            } else if (resetPageCurrentStep === 1) {

                let codeForm = $('#codeForm');
                if (!validateForm(codeForm)) {
                    return;
                }

                $('#msg').text("we have sent a password reset code by email. Enter it below to reset your password")
                $('#changePW').text("Change Password")

                let token = $('#code').val();

                $.ajax({
                    url: 'http://localhost:8080/api/v1/users/reset-password?token=' + token,
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (response) {
                        resetPageCurrentStep = 2;
                        console.log("lllll")
                        $('#wrongPW').addClass('d-none');
                        $(resetPWSteps[resetPageCurrentStep - 1]).removeClass('active').addClass('slide-out');
                        $(resetPWSteps[resetPageCurrentStep]).addClass('active slide-in');

                    },
                    error: function (xhr, status, error) {
                        $('#errorMsg').text(xhr.responseJSON.message);
                        $('#wrongPW').removeClass('d-none');
                        $('#errorMsg').css('color', 'red');
                        $('.checkPW').css('border', 'red solid 1px');
                    }
                });
            } else if (resetPageCurrentStep === 2) {

                let pwForm = $('#pwForm');
                if (!validateForm(pwForm)) {
                    return;
                }

                $('#msg').text("Reset Your Password")
                $('#signupBtn').text("Change Password")

                console.log("AWA")
                var newPassword = $('#newPassword').val();
                var confirmPassword = $('#confirmPassword').val();

                if (newPassword === confirmPassword) {

                    var token = $('#code').val();

                    $.ajax({
                        url: 'http://localhost:8080/api/v1/users/save-password?token=' + token + '&newPassword=' + newPassword,
                        type: 'POST',
                        contentType: 'application/json',
                        success: function (response) {
                            console.log(response);
                            $('#errorMsg').text(response);
                            $('#errorMsg').css('color', 'green');
                            $('.checkPW').css('border', 'green solid 1px');
                            $('#wrongPW').removeClass('d-none');
                            $('#changePW').text("Close");
                            $(resetPWSteps[resetPageCurrentStep]).removeClass('active').addClass('slide-out');
                        },
                        error: function (xhr, status, error) {
                            $('#errorMsg').text(xhr.responseJSON.message);
                            $('#wrongPW').removeClass('d-none');
                            $('#errorMsg').css('color', 'red');
                            $('.checkPW').css('border', 'red solid 1px');
                        }
                    });

                } else {
                    $('#errorMsg').text("Passwords does not match!");
                    $('#wrongPW').removeClass('d-none');
                    $('#errorMsg').css('color', 'red');
                    $('.checkPW').css('border', 'red solid 1px');
                }
            }
        }
    });
}

