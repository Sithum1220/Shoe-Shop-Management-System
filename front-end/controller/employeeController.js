
function employeeControlFunction() {
    saveEmployee();
    imageUploader();
}
var base64String;
function saveEmployee() {
    const employeePopupAddBtn = $('#employeePopupAddBtn');


    // const fileInput = $('#file-input')[0];
    // const file = fileInput.files[0];
    //
    // if (!file) {
    //     console.error('No file selected');
    //     return;
    // }

    // var reader = new FileReader();
    // const base64String = reader.result.split(',')[1]; // Get the Base64 string without the data URL prefix
    // // Send the Base64 string to the server
    // $.ajax({
    //     url: 'http://localhost:8080/api/v1/upload',
    //     type: 'POST',
    //     contentType: 'text/plain',
    //     data: base64String,
    //     success: function (response) {
    //         console.log('Upload successful:', response);
    //         // Handle successful upload
    //     },
    //     error: function (xhr, status, error) {
    //         console.error('Upload failed:', error);
    //         // Handle error
    //     }
    // });


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


        $.ajax({
            url: 'http://localhost:8080/api/v1/upload',
            type: 'POST',
            contentType: 'text/plain',
            data: base64String,
            success: function (response) {
                console.log('Upload successful:', response);
                // Handle successful upload
            },
            error: function (xhr, status, error) {
                console.error('Upload failed:', error);
                // Handle error
            }
        });
    })
}

function imageUploader() {
    const imgUploader = $('#imgUploader');
    const imgViewer = $('#imgViewer');
    imgUploader.change(function () {

        var file = this.files[0]; // Get the selected file

        if (file) {
            var reader = new FileReader(); // Initialize FileReader object

            reader.onload = function (e) {
                imgViewer.attr('src', e.target.result);
                 base64String = reader.result.split(',')[1]; // Get the Base64 string without the data URL prefix
                // Send the Base64 string to the server
                // Set image source to the read file data
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        } else {
            imgViewer.attr('src', '#'); // Clear the image source if no file is selected
        }
    })
}
