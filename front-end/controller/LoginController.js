signUp();
signIn();
userImageUploader();
let base64String;

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
            $('#employeeCode').val(data.data); // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function signUp() {
    $('#saveBtn').click(function () {
        if ($('#employeeRole').val() === 'ADMIN' || $('#employeeRole').val() === 'USER') {
            if ($('#EmployeePageUserPasswword').val() === $('#EmployeePageUserPasswword2').val()) {
                if ($('#imgUploader').val() === ''){
                    base64String = null;
                }
                const userData = {
                    email: $('#employeeEmail').val(),
                    password: $('#EmployeePageUserPasswword').val(),
                    role: $('#employeeRole').val().toUpperCase(),
                    activeStatus: true,
                    employeeDTO: {
                        email: $('#employeeEmail').val(),
                        employeeId: $('#employeeCode').val(),
                        gender: $('#employeeGender').val().toUpperCase(),
                        employeeName: $('#employeeName').val(),
                        employeeStatus: $('#employeeStatus').val(),
                        branch: $('#employeeBranch').val(),
                        designation: $('#employeeDesignation').val(),
                        proPic: base64String,
                        joinDate: $('#employeeDOJ').val(),
                        employeeDob: $('#employeeDOB').val(),
                        role: $('#employeeRole').val().toUpperCase(),
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
                        $('#employeePopupCancelBtn').click();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Successfully Registered!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    },
                    error: function (resp) {
                        console.log('error')
                        console.log(resp)
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
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');

            $.ajax({
                url: "http://localhost:8080/api/v1/users/" + value.email,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (res, textStatus, xhr) {
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('cashier', value.email);
                    if (res.role === "ADMIN") {
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
    const userImgUploader = $('#imgUploader');
    const imgViewer = $('#imgViewer');

    userImgUploader.change(function () {

        var file = this.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                imgViewer.attr('src', e.target.result);
                base64String = reader.result.split(',')[1];
            };

            reader.readAsDataURL(file);
        } else {
            imgViewer.attr('src', '#');
        }
    })
}

$('#employeePopupCancelBtn,#employeePopupClose').click(function () {
    $('.txt').val("")
    $('#employeeGender').val($('#employeeGender option:first').val());
    $('#employeeRole').val($('#employeeRole option:first').val());
});