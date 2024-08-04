function employeeControlFunction() {
    saveEmployee();
    imageUploader();
    getAllEmployeeData();
    clickTblRow();
    updateEmployee();
    searchEmployee();
    activeStatusCheckBox();
    deleteEmployee()

    $('#employeeInputForm input').on('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const element = $(this);
            const isValid = validateForm(element);
            if (isValid) {
                const nextInput = element.closest('div').next('div').find('input');
                if (nextInput.length) {
                    nextInput.focus();
                } else {
                    element.closest('form').find('button[type=submit]').focus();
                }
            }
        }
    });
}

var base64String;
var id;

function saveEmployee() {
    $('#employeePopupAddBtn').click(function () {

        if ($(this).text().trim() === 'Save') {
            if ($('#imgUploader').val() === '') {
                base64String = null;
            }

            const form = $('#employeeInputForm');
            if (!validateForm(form)) {
                return;
            }

            var gender;
            if ('Select Gender' !== $('#employeeGender').val()) {
                gender = $('#employeeGender').val().toUpperCase();
            }

            const postData = {
                employeeId: $('#employeeCode').val(),
                gender: gender,
                employeeName: $('#employeeName').val(),
                employeeStatus: $('#employeeStatus').val(),
                branch: $('#employeeBranch').val(),
                designation: $('#employeeDesignation').val(),
                proPic: base64String,
                joinDate: $('#employeeDOJ').val(),
                employeeDob: $('#employeeDOB').val(),
                role: "OTHER",
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
            };
            console.log(base64String);
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/employees",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Employee has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        getAllEmployeeData();
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

        }

    })
}

function imageUploader() {
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

function getAllEmployeeAjaxReq(status, value) {
    console.log(status);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/employees/" + status + "/" + value,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblEmployee tbody').empty()
            for (const employee of resp.data) {
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + " " + employee.address.lane + " " +
                employee.address.state + " " + employee.address.city + " " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                <td>${employee.role}</td>
                                
                            </tr>`;
                $('#tblEmployee').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function getAllEmployeeData() {

    if ($('#employeeActiveCheckBox').prop('checked')) {
        getAllEmployeeAjaxReq("active", true);
        $('#addEmployee,#updateEmployee,#deleteEmployee').attr('disabled', false);
    } else {
        getAllEmployeeAjaxReq("active", false);
        $('#addEmployee,#updateEmployee,#deleteEmployee').attr('disabled', true);
    }
}

function activeStatusCheckBox() {
    $('#employeeActiveCheckBox').change(function () {
        getAllEmployeeData();
    })
}

function clickTblRow() {

    $('#tblEmployee').on('click', 'tr', function (event) {
        // Check if the current checkbox is not the specified one
        // Toggle the checked state of the checkbox

        // Uncheck all other checkboxes

        var employeeCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            employeeCheckbox.prop('checked', !employeeCheckbox.prop('checked'));

        }
        $('#tblEmployee input[type="checkbox"]').not(employeeCheckbox).prop('checked', false);

        // Uncheck all other checkboxes
        setImage(employeeCheckbox);
        updateEmployee(employeeCheckbox)
    });

    $('#tblEmployee').on('change', 'input[type="checkbox"]', function () {
        setImage($(this).find('input[type="checkbox"]'));
        $('#tblEmployee input[type="checkbox"]').not($(this)).prop('checked', false);
    });


}

function setImage(employeeCheckbox) {
    var row = employeeCheckbox.closest('tr');
    if (employeeCheckbox.is(':checked')) {
        id = row.find('td:eq(0)').text();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                $('#employeeImg').attr('src', 'data:image/jpeg;base64,' + response.proPic);
                console.log(response);
                setDataToTextField(response)
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    } else {
        $('#employeeImg').attr('src', '#');
    }
}

function updateEmployee(employeeCheckbox) {
    $('#employeePopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Update') {
            var role;
            var gender;
            if ('none' !== $('#employeeRole').val()) {
                role = $('#employeeRole').val().toUpperCase();
            }
            if ('Select Gender' !== $('#employeeGender').val()) {
                gender = $('#employeeGender').val().toUpperCase();
            }


            const postData = {
                employeeId: $('#employeeCode').val(),
                gender: gender,
                employeeName: $('#employeeName').val(),
                employeeStatus: $('#employeeStatus').val(),
                branch: $('#employeeBranch').val(),
                designation: $('#employeeDesignation').val(),
                proPic: base64String,
                joinDate: $('#employeeDOJ').val(),
                employeeDob: $('#employeeDOB').val(),
                role: role,
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
            };
            console.log(base64String);
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/employees",
                method: "PATCH",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Employee has been Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        setImage(employeeCheckbox)
                        $('#tblEmployee tr').each(function () {
                            var isChecked = $(this).find('input[type="checkbox"]').prop('checked');

                            if (isChecked) {
                                // Update data of checked row
                                var row = $(this);

                                // Example: Update first name to 'New First Name' and last name to 'New Last Name'
                                row.find('td:eq(0)').text($('#employeeCode').val());
                                row.find('td:eq(1)').text($('#employeeName').val());
                                row.find('td:eq(2)').text($('#employeeBuilding').val() + " " +
                                    $('#employeeLane').val() + " " + $('#employeeState').val() + " " + $('#employeeCity').val()
                                    + " " + $('#employeePostalCode').val());
                                row.find('td:eq(3)').text($('#employeeContactNumber').val());
                                row.find('td:eq(4)').text($('#employeeDOJ').val());
                                row.find('td:eq(5)').text($('#employeeBranch').val());
                            }
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

        }
    });
}

function setDataToTextField(response) {

    $('#employeeCode').val(response.employeeId);
    $('#employeeName').val(response.employeeName);
    $('#employeeStatus').val(response.employeeStatus);
    $('#employeeBranch').val(response.branch);
    $('#employeeDesignation').val(response.designation);
    $('#employeeDOJ').val(response.joinDate);
    $('#employeeDOB').val(response.employeeDob);
    $('#employeeBuilding').val(response.address.buildNo);
    $('#employeeCity').val(response.address.city);
    $('#employeeLane').val(response.address.lane);
    $('#employeeState').val(response.address.state);
    $('#employeePostalCode').val(response.address.postalCode);
    $('#employeeEmail').val(response.email);
    $('#employeeGuardian').val(response.guardianName);
    $('#employeeContactNumber').val(response.contactNo);
    $('#employeeGuardianContact').val(response.emergencyContact);
    $('#employeeGender').val(response.gender);
    $('#employeeRole').val(response.role);

    console.log(response.role)

    base64String = response.proPic;
    // $('#imgViewer').attr('src', 'data:image/jpeg;base64,' + response.proPic)
    const uploadDiv = $('#uploadDiv');
    uploadDiv.empty();  // Clear any existing content
    const img = $('<img>').attr('src', 'data:image/jpeg;base64,' + response.proPic)
    uploadDiv.append(img);
}

function generateNewEmployeeId() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://localhost:8080/api/v1/employees/id",
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        })
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

function deleteEmployee() {
    $('#deleteEmployeeBtn').click(function () {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                getAllEmployeeData();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Employee has been Deleted",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (resp) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });
    })
}

function searchEmployee() {
    $('#search_employee').keyup(function (event) {
        var idOrName = $(this).val();

        if ($('#employeeActiveCheckBox').prop('checked')) {
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/employees?idOrName=" + idOrName + "&activeStatus=" + true,
                type: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (response) {
                    $('#tblEmployee tbody').empty()
                    for (const employee of response.data) {
                        const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + " " + employee.address.lane + " " + employee.address.state + " " + employee.address.city + " " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                
                            </tr>`;
                        $('#tblEmployee').append(row);
                    }
                },
                error: function (resp) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
            });
        } else {
            $.ajax({
                url: "http://localhost:8080/api/v1/employees?idOrName=" + idOrName + "&activeStatus=" + false,
                type: "GET",
                dataType: "json",
                success: function (response) {
                    $('#tblEmployee tbody').empty()
                    for (const employee of response.data) {
                        const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + " " + employee.address.lane + " " + employee.address.state + " " + employee.address.city + " " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                
                            </tr>`;
                        $('#tblEmployee').append(row);
                    }
                },
                error: function (resp) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
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

// var respLength;
// function getAllEmployeeCount(nextBtn) {
//     $.ajax({
//         url: "http://localhost:8080/api/v1/employees/count",
//         method: "GET",
//         success: function (resp) {
//             console.log("Suss: ", resp);
//             if (resp.data > 10){
//                 nextBtn.prop("disabled", false);
//             }
//         },
//         error: function (error) {
//             console.log("error: ", error);
//         }
//     })
// }
//
// // noinspection JSVoidFunctionReturnValueUsed
//
// function pagination() {
//     const tableHeader = $('.table-header');
//     const table = $('.mytable');
//     const prevBtn = $('.prev-btn');
//     const nextBtn = $('.next-btn');
//     const rowsPerPage = 10; // Change as needed
//     let currentPage = 0;
//
//     getAllEmployeeData(currentPage);
//
//     getAllEmployeeCount(nextBtn);
//
//     prevBtn.click(function () {
//         if (currentPage > 0) {
//             currentPage--;
//             showPage(currentPage);
//             updateButtons();
//             getAllEmployeeData(currentPage);
//         }
//     });
//
//     nextBtn.click(function () {
//         const totalRows = table.find('tbody tr').length;
//         console.log("Total Row: "+totalRows);
//         if (totalRows >= rowsPerPage) {
//             currentPage++;
//             showPage(currentPage);
//             updateButtons();
//             getAllEmployeeData(currentPage);
//         }
//     });
//
//     $(window).scroll(function () {
//         const tableRect = table[0].getBoundingClientRect();
//         const paginationContainer = $('.pagination-container');
//         const paginationRect = paginationContainer[0].getBoundingClientRect();
//
//         if (tableRect.bottom < paginationRect.height) {
//             paginationContainer.css('bottom', `${tableRect.bottom - paginationRect.height}px`);
//         } else {
//             paginationContainer.css('bottom', '20px');
//         }
//     });
//
//     function showPage(pageNumber) {
//         const start = pageNumber * rowsPerPage;
//         const end = start + rowsPerPage;
//
//         const rows = table.find('tbody tr');
//         rows.each(function (index, row) {
//             if (index >= start && index < end) {
//                 $(row).show();
//             } else {
//                 $(row).hide();
//                 rows.empty();
//             }
//         });
//     }
//
//     function updateButtons() {
//         const totalRows = table.find('tbody tr').length;
//         if (currentPage === 0) {
//             prevBtn.prop('disabled', true);
//         } else {
//             prevBtn.prop('disabled', false);
//         }
//
//         if ((currentPage + 1) * rowsPerPage >= totalRows) {
//             nextBtn.prop('disabled', true);
//         } else {
//             nextBtn.prop('disabled', false);
//         }
//     }
//
//     showPage(currentPage);
//     updateButtons();
// }