function employeeControlFunction() {
    saveEmployee();
    imageUploader();
    getAllEmployeeData()
}

var base64String;

function saveEmployee() {
    const employeePopupAddBtn = $('#employeePopupAddBtn');

    employeePopupAddBtn.click(function () {

        if ($('#employeeRole').val() === "Admin" || $('#employeeRole').val() === "User") {
            var role = $('#employeeRole').val().toUpperCase();
        }
        if ($('#employeeGender').val() === "Male" || $('#employeeGender').val() === "Female") {
            var gender = $('#employeeGender').val().toUpperCase();
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