signUp();
generateNewId();

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

                const userData = {
                    email: $('#employeeEmail').val(),
                    password: $('#EmployeePageUserPasswword').val(),
                    role: $('#employeeRole').val().toUpperCase(),
                    activeStatus: true,
                    employeeDTO: {
                        email: $('#employeeEmail').val(),
                    }
                }
                const postData = {
                    employeeId: $('#employeeCode').val(),
                    gender: $('#employeeGender').val().toUpperCase(),
                    employeeName: $('#employeeName').val(),
                    employeeStatus: $('#employeeStatus').val(),
                    branch: $('#employeeBranch').val(),
                    designation: $('#employeeDesignation').val(),
                    // proPic: base64String,
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
                    email: $('#employeeEmail').val(),
                    guardianName: $('#employeeGuardian').val(),
                    contactNo: $('#employeeContactNumber').val(),
                    emergencyContact: $('#employeeGuardianContact').val(),
                    activeStatus: true,
                    // password: $('#EmployeePageUserPasswword').val()
                };

                
                $.ajax({
                    url: "http://localhost:8080/api/v1/users",
                    method: "POST",
                    data: JSON.stringify(postData),
                    contentType: "application/json",
                    success: function (resp) {
                        if (resp.state == 200) {
                            console.log(resp);
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Successfully Registered!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    },
                    error: function (resp) {
                        console.log(resp)
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: resp.responseJSON.message,
                            footer: '<a href="#"></a>'
                        });
                    }
                })
                
                $.ajax({
                    url: "http://localhost:8080/api/v1/users/signup",
                    method: "POST",
                    data: JSON.stringify(userData),
                    contentType: "application/json",
                    success: function (resp) {
                        if (resp.state == 200) {
                            console.log(resp);
                            localStorage.setItem('accessToken',resp.token)
                        }
                    },
                    error: function (resp) {
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