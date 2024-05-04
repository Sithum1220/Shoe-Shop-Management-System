function employeeControlFunction() {
    saveEmployee();

}

function saveEmployee() {
    const  employeePopupAddBtn = $('#employeePopupAddBtn');
    
    employeePopupAddBtn.click(function () {

        if($('#employeeRole').val() === "Admin" || $('#employeeRole').val() === "User"){
           var role = $('#employeeRole').val().toUpperCase();
        }
        if($('#employeeGender').val() === "Male" || $('#employeeGender').val() === "Female"){
            var gender = $('#employeeGender').val().toUpperCase();
        }
        
        const postData = {
            employeeId: $('#employeeCode').val(),
            gender: gender,
            employeeName: $('#employeeName').val(),
            employeeStatus: $('#employeeStatus').val(),
            branch: $('#employeeBranch').val(),
            designation: $('#employeeDesignation').val(),
            joinDate: $('#employeeDOJ').val(),
            employeeDob: $('#employeeDOB').val(),
            role:role,
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

