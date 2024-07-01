function customerControlFunction() {
    saveCustomer();
    getAllCustomer();
    clickCustomerTblRow();
    searchCustomer();
    $('#customerInputForm input').on('keydown', function(event) {
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

function generateNewCustomerId() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://localhost:8080/api/v1/customer/id",{
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
            $('#customerCode').val(data.data); // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function saveCustomer() {
    $('#customerPopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Save') {
            const form = $('#customerInputForm');
            if (!validateForm(form)) {
                return;
            }
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

            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/customer",
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
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/customer",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblCustomer tbody').empty()
            for (const customer of resp.data) {
                if (customer.customerId !== 'Nan') {
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
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function clickCustomerTblRow() {
    console.log("kkkkkkk")
    $('#tblCustomer').on('click', 'tr', function (event) {


        var customerCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            customerCheckbox.prop('checked', !customerCheckbox.prop('checked'));

        }
        $('#tblCustomer input[type="checkbox"]').not(customerCheckbox).prop('checked', false);

        getCustomerDataByClickTblRow(customerCheckbox);
    });

    $('#tblCustomer').on('change', 'input[type="checkbox"]', function () {
        getCustomerDataByClickTblRow($(this).find('input[type="checkbox"]'));
        $('#tblCustomer input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}

function getCustomerDataByClickTblRow(customerCheckbox) {
    var row = customerCheckbox.closest('tr');
    if (customerCheckbox.is(':checked')) {
        var id = row.find('td:eq(0)').text();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/customer/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                setCustomerDataToTextField(response)
                customerUpdate(response);
                deleteCustomer(id);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    } else {
    }
}

function setCustomerDataToTextField(response) {
    $('#customerCode').val(response.customerId);
    $('#customerName').val(response.customerName);
    $('#customerGender').val(response.gender);
    $('#customerDOB').val(response.customerDob);
    $('#customerDOJ').val(response.loyaltyDate);
    $('#customerBuilding').val(response.address.buildNo);
    $('#customerLane').val(response.address.lane);
    $('#customerCity').val(response.address.city);
    $('#customerState').val(response.address.state);
    $('#customerPostalCode').val(response.address.postalCode);
    $('#customerContactNo').val(response.contactNo);
    $('#customerEmail').val(response.email);
    $('#customerLevel').val(response.level);
    $('#customerPoint').val(response.totalPoints);
    $('#customerRecentPurchaseDate').val(response.recentPurchase);
}

function customerUpdate(response) {
    console.log("updateCustomer");
    $('#customerPopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Update') {
            const form = $('#customerInputForm');
            if (!validateForm(form)) {
                return;
            }
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
                totalPoints: response.totalPoints,
                level: response.level,
                recentPurchase: response.recentPurchase,
                contactNo: $('#customerContactNo').val(),
                email: $('#customerEmail').val(),
            };
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/customer",
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
                            title: "Customer has been Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#tblCustomer tr').each(function () {
                            var isChecked = $(this).find('input[type="checkbox"]').prop('checked');

                            if (isChecked) {
                                var row = $(this);
                                row.find('td:eq(0)').text($('#customerCode').val());
                                row.find('td:eq(1)').text($('#customerName').val());
                                row.find('td:eq(2)').text($('#customerBuilding').val()+" "+
                                    $('#customerLane').val()+" "+$('#customerState').val()+" "+$('#customerCity').val()
                                    +" "+$('#customerPostalCode').val());
                                row.find('td:eq(3)').text($('#customerDOJ').val());
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

function deleteCustomer(id) {
    $('#customerDeleteBtn').click(function () {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/customer/" + id,
            type: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                getAllCustomer();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Customer has been Deleted",
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

function searchCustomer() {
    $('#searchCustomer').keyup(function (event) {

        var idOrName = $(this).val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/customer?idOrName=" + idOrName,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                $('#tblCustomer tbody').empty()
                for (const customer of response.data) {
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