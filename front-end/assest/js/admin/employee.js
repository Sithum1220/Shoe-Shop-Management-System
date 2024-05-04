function employeeFunction() {
    const addEmployee = $('#addEmployee'),
        updateEmployee = $('#updateEmployee'),
        deleteEmployee = $('#deleteEmployee'),
        showEmployeeDetails = $('#showEmployeeDetails'),
        employeeFormTitle = $('#employeeFormTitle'),
        employeePopupCancelBtn = $('#employeePopupCancelBtn'),
        employeeTxtFieldBox = $('#employeeTxtFieldBox'),
        employeeDeletePopupBox = $('#employeeDeletePopupBox'),
        employeePopupAddBtn = $('#employeePopupAddBtn'),
        employeePageUserCredentials = $('#employeePageUserCredentials'),
        employeeFormIcon = $('#employeeFormIcon'),
        employeeFormContainer = $('#employeeFormContainer'),
        employeePopupClose = $('#employeePopupClose'),
        employeeRole = $('#employeeRole');


    addEmployee.click(function () {
        employeePopupAddBtn.text("Save")
        employeePopupAddBtn.css('display', 'block');
        employeePopupCancelBtn.css('width', '48%');
        employeeFormIcon.attr('src', '../../assest/images/Frame07.png')
        employeeFormTitle.text('Add Employee')
        $("#employeeGender").prop('disabled', false);
        $("#employeeDOB").prop('disabled', false);
        $("#employeeDOJ").prop('disabled', false);
        $("#employeeRole").prop('disabled', false);
        enableTxtField()
        $('#employeeCode').attr('readonly', "");
        fetch("http://localhost:8080/api/v1/employees")
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
        
    })
    updateEmployee.click(function () {
        employeeFormTitle.text('Update Employee')
        employeePopupAddBtn.css('display', 'block');
        employeePopupAddBtn.text("Update")
        employeePopupCancelBtn.css('width', '48%');
        employeeFormIcon.attr('src', '../../assest/images/edit-btn.png')
        $("#employeeGender").prop('disabled', false);
        $("#employeeDOB").prop('disabled', false);
        $("#employeeDOJ").prop('disabled', false);
        $("#employeeRole").prop('disabled', false);
        enableTxtField()
    })
    deleteEmployee.click(function () {

    })
    showEmployeeDetails.click(function () {
        employeeFormTitle.text('Employee Details')
        employeePopupAddBtn.css('display', 'none');
        employeePopupCancelBtn.css('width', '100%');
        employeeFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        employeeTxtFieldBox.css('display', 'block');
        $("#employeeGender").prop('disabled', true);
        $("#employeeDOB").prop('disabled', true);
        $("#employeeDOJ").prop('disabled', true);
        $("#employeeRole").prop('disabled', true);
        disableTxtField();
    })

    employeeRole.change(function () {
        console.log($(this).val());
        if ($(this).val() === 'Admin' || $(this).val() === 'User') {
            employeePageUserCredentials.removeClass('d-none');
        } else {
            employeePageUserCredentials.addClass('d-none');
        }
    })
    
    employeePopupAddBtn.click(function () {
        const postData = {
            employeeId: $('#employeeCode').val(),
            gender: $('#employeeGender option:selected').text().toUpperCase(),
            employeeName: $('#employeeName').val(),
            employeeStatus: $('#employeeStatus').val(),
            branch: $('#employeeBranch').val(),
            designation: $('#employeeDesignation').val(),
            role: $('#employeeRole').val().toUpperCase(),
            joinDate: $('#employeeDOJ').val(),
            employeeDob: $('#employeeDOB').val(),
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
        console.log(postData);

        $.ajax({
            url: "http://localhost:8080/api/v1/employees",
            method: "POST",
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: function (resp, textStatus, jqxhr) {
                console.log("success: ", resp);
                console.log("success: ", textStatus);
                console.log("success: ", jqxhr);
                /*if(jqxhr.status == 201)
                    alert("Added customer successfully")*/
                if (resp.code === 200) {
                    alert(jqxhr.responseText);
                }
            },
            error: function (resp) {
                alert(resp.responseJSON.message);
            }
        })


// Fetch POST request
//         fetch("http://localhost:8080/api/v1/employees", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(postData) // Convert data to JSON format
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
    })

    $(document).ready(function () {
        $("#employeeDOJ").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
        $("#employeeDOB").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
    });
}