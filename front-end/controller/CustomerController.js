function customerControlFunction() {
    saveCustomer();
    getAllCustomer();
}
function generateNewCustomerId() {
    fetch("http://localhost:8080/api/v1/customer/id")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Read response as text
        })
        .then(data => {
            console.log(data);
            $('#customerCode').val(data.data); // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function saveCustomer() {
    $('#customerPopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Save') {
            const postData = {
                customerId: $('#customerCode').val(),
                customerName: $('#customerName').val(),
                gender: $('#customerGender').val(),
                loyaltyDate: $('#customerDOJ').val(),
                customerDob: $('#customerDOB').val(),
                address: {
                    buildNo: $('#customerBuilding').val(),
                    lane: $('#customerLane').val(),
                    city: $('#customerCity').val(),
                    state: $('#customerState').val(),
                    postalCode: $('#customerPostalCode').val()
                },
                level: "NEW",
                totalPoints: 0,
                contactNo: $('#customerContactNo').val(),
                email: $('#customerEmail').val(),
                recentPurchase: null,
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/customer",
                method: "POST",
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Customer has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        console.log("resp");
                        getAllCustomer();
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

function getAllCustomer(){
    $.ajax({
        url: "http://localhost:8080/api/v1/customer",
        method: "GET",
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblCustomer tbody').empty()
            for (const customer of resp.data) {
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${customer.customerId}</td>
                                <td>${customer.customerName}</td>
                                <td>${customer.address.buildNo + " " + customer.address.lane + " " + customer.address.state + " " + customer.address.city + " " + customer.address.postalCode}</td>
                                <td>${customer.loyaltyDate}</td>
                                <td>${customer.totalPoints}</td>
                                <td>${customer.level}</td>
                                
                            </tr>`;
                $('#tblCustomer').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}
