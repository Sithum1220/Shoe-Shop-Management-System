signUp();
signIn();
userImageUploader();

let base64String;
let newId;
$(document).ready(function () {
    signUpForm();
})
var currentStep = 0;
var steps = $('.form-step');
let emRole;


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


                            $(".greetingPage").removeClass("d-none");
                            $('#signupBtn').prop("disabled", true);
                            $('#backAndClose').text("Close")
                            $('#backAndClose').attr("data-bs-dismiss", 'modal');
                            slider();
                            currentStep = 0;
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
                            $('#wrongPW').addClass('d-none')
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
                            $('#wrongPW').addClass('d-none')
                        }
                    },
                    error: function (ob, textStatus, error) {

                    }
                });

            },
            error: function (ob, textStatus, error) {
                $('#wrongPW').removeClass('d-none')
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
        $(steps[currentStep]).removeClass('active').addClass('slide-out');
        currentStep++;

        if ($('.greetingPage').hasClass('d-none')) {
            if (currentStep === 7) {
                currentStep = 6;
            }
        }
        if (currentStep === 0) {
            $('#title').text("Enter Your Details")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Close")

        } else if (currentStep === 1) {
            $('#title').text("Enter Your Address")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        } else if (currentStep === 2) {
            $('#title').text("Enter Your Contact")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        } else if (currentStep === 3) {
            $('#title').text("Enter Your Guardian Contact")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        } else if (currentStep === 4) {
            $('#title').text("Enter Your Company Details")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        } else if (currentStep === 5) {
            $('#title').text("Create New Password")
            $('#signupBtn').text("Next")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        } else if (currentStep === 6) {
            $('#title').text("Set Your Profile")
            $('#signupBtn').text("Sign Up")
            $('#backAndClose').text("Back")
            $('#backAndClose').removeAttr("data-bs-dismiss", 'modal');

        }
        $(steps[currentStep]).addClass('active slide-in');
    }
}



