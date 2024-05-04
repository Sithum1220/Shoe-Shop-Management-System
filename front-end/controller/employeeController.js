function employeeControlFunction() {
    saveEmployee();
    imageUploader();
    getAllEmployeeData();
    clickTblRow();
    updateCustomer();
}

var base64String;

function saveEmployee() {
    $('#employeePopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Save') {
            console.log("Saving Employee");
            if ($('#employeeRole').val() === "Admin" || $('#employeeRole').val() === "User") {
                var role = $('#employeeRole').val().toUpperCase();
            }
            if ($('#employeeGender').val() === "Male" || $('#employeeGender').val() === "Female") {
                var employeeGender = $('#employeeGender').val().toUpperCase();
            }

            const postData = {
                employeeId: $('#employeeCode').val(),
                gender: employeeGender,
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

            $.ajax({
                url: "http://localhost:8080/api/v1/employees",
                method: "POST",
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
    const imgViewer = $('#imgViewer');

    imgUploader.change(function () {

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

function getAllEmployeeData() {
    $('#tblEmployee tbody').empty()
    $.ajax({
        url: "http://localhost:8080/api/v1/employees",
        method: "GET",
        success: function (resp) {
            console.log("Success: ", resp);
           
            for (const employee of resp.data) {
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + ", " + employee.address.lane + ", " + employee.address.state + ", " + employee.address.city + ", " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                
                            </tr>`;
                $('#tblEmployee').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function clickTblRow() {

    $('#tblEmployee').on('click', 'tr', function (event) {
        // Check if the current checkbox is not the specified one
        // Toggle the checked state of the checkbox

        // Uncheck all other checkboxes

        var checkbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            checkbox.prop('checked', !checkbox.prop('checked'));

        }
        $('#tblEmployee input[type="checkbox"]').not(checkbox).prop('checked', false);

        // Uncheck all other checkboxes
        setImage(checkbox);
    });

    $('#tblEmployee').on('change', 'input[type="checkbox"]', function () {
        setImage($(this).find('input[type="checkbox"]'));
        $('#tblEmployee input[type="checkbox"]').not($(this)).prop('checked', false);
    });


}


function setImage(checkbox) {
    var row = checkbox.closest('tr');
    if (checkbox.is(':checked')) {
        var id = row.find('td:eq(0)').text();
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "GET",
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

function updateCustomer(checkBox) {
    $('#employeePopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Update') {

            if ($('#employeeRole').val() === "Admin" || $('#employeeRole').val() === "User") {
                var role = $('#employeeRole').val().toUpperCase();
            }
            if ($('#employeeGender').val() === "Male" || $('#employeeGender').val() === "Female") {
                var employeeGender = $('#employeeGender').val().toUpperCase();
            }

            const postData = {
                employeeId: $('#employeeCode').val(),
                gender: employeeGender,
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

            $.ajax({
                url: "http://localhost:8080/api/v1/employees",
                method: "PATCH",
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
    console.log(response.address.building);
    $('#imgViewer').attr('src', 'data:image/jpeg;base64,' + response.proPic)
}

function generateNewId() {
    fetch("http://localhost:8080/api/v1/employees/id")
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