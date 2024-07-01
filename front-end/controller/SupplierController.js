function supplierControlFunction() {
    saveSupplier();
    getAllSuppliers()
    clickSupplierTblRow();
    updateSupplier();
    searchSupplier();

    $('#supplierInputForm input').on('keydown', function(event) {
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

function generateNewSupplierId() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://localhost:8080/api/v1/supplier/id", {
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
            $('#supplierCode').val(data.data); // Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function saveSupplier() {
    $('#supplierPopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Save') {

            const form = $('#supplierInputForm');
            if (!validateForm(form)) {
                return;
            }
            
            
            const postData = {
                supplierCode: $('#supplierCode').val(),
                supplierName: $('#supplierName').val(),
                email: $('#supplierEmail').val(),
                category: $('#supplierCategory').val(),
                address: {
                    buildNo: $('#supplierBuilding').val(),
                    lane: $('#supplierLane').val(),
                    city: $('#supplierCity').val(),
                    state: $('#supplierState').val(),
                    postalCode: $('#supplierPostalCode').val(),
                    supCountry: $('#supplierCountry').val(),
                },
                mobileNo: $('#supplierContactNumber01').val(),
                landNo: $('#supplierContactNumber02').val(),
            }
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/supplier",
                method: "POST",
                data: JSON.stringify(postData),
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Supplier has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        getAllSuppliers();
                        $('#supplierPopupClose').click();
                        console.log("resp");
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

function getAllSuppliers() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblSupplier tbody').empty()
            for (const supplier of resp.data) {
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${supplier.supplierCode}</td>
                                <td>${supplier.supplierName}</td>
                                <td>${supplier.category}</td>
                                <td>${supplier.mobileNo}</td>
                                <td>${supplier.email}</td>
                             
                            </tr>`;
                $('#tblSupplier').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function updateSupplier() {
    $('#supplierPopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Update') {
            const form = $('#supplierInputForm');
            if (!validateForm(form)) {
                return;
            }
            const postData = {
                supplierCode: $('#supplierCode').val(),
                supplierName: $('#supplierName').val(),
                email: $('#supplierEmail').val(),
                category: $('#supplierCategory').val(),
                address: {
                    buildNo: $('#supplierBuilding').val(),
                    lane: $('#supplierLane').val(),
                    city: $('#supplierCity').val(),
                    state: $('#supplierState').val(),
                    postalCode: $('#supplierPostalCode').val(),
                    supCountry: $('#supplierCountry').val(),
                },
                mobileNo: $('#supplierContactNumber01').val(),
                landNo: $('#supplierContactNumber02').val(),
            };
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/supplier",
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
                            title: "Supplier has been Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#supplierPopupClose').click();
                        $('#tblSupplier tr').each(function () {
                            var isChecked = $(this).find('input[type="checkbox"]').prop('checked');

                            if (isChecked) {
                                var row = $(this);
                                row.find('td:eq(0)').text($('#supplierCode').val());
                                row.find('td:eq(1)').text($('#supplierName').val());
                                row.find('td:eq(2)').text($('#supplierCategory').val());
                                row.find('td:eq(3)').text($('#supplierContactNumber01').val());
                                row.find('td:eq(4)').text($('#supplierEmail').val());
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

function clickSupplierTblRow() {

    $('#tblSupplier').on('click', 'tr', function (event) {
        console.log("Nannnaaa");

        var supplierCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            supplierCheckbox.prop('checked', !supplierCheckbox.prop('checked'));

        }
        $('#tblSupplier input[type="checkbox"]').not(supplierCheckbox).prop('checked', false);

        getSupplierDataByClickTblRow(supplierCheckbox);
    });

    $('#tblSupplier').on('change', 'input[type="checkbox"]', function () {
        getSupplierDataByClickTblRow($(this).find('input[type="checkbox"]'));
        $('#tblSupplier input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}

function getSupplierDataByClickTblRow(supplierCheckbox) {
    var row = supplierCheckbox.closest('tr');
    if (supplierCheckbox.is(':checked')) {
        var id = row.find('td:eq(0)').text();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                setSupplierDataToTextField(response)
                deleteSupplier(id);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    } else {
    }
}

function setSupplierDataToTextField(response) {
    $('#supplierCode').val(response.supplierCode);
    $('#supplierName').val(response.supplierName);
    $('#supplierCategory').val(response.category);
    $('#supplierPostalCode').val(response.address.postalCode);
    $('#supplierState').val(response.address.state);
    $('#supplierCity').val(response.address.city);
    $('#supplierLane').val(response.address.lane);
    $('#supplierBuilding').val(response.address.buildNo);
    $('#supplierCountry').val(response.address.supCountry);
    $('#supplierEmail').val(response.email);
    $('#supplierContactNumber01').val(response.mobileNo);
    $('#supplierContactNumber02').val(response.landNo);
}

function deleteSupplier(id) {
    $('#supplierDeleteBtn').click(function () {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/" + id,
            type: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                getAllSuppliers();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Supplier has been Deleted",
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

function searchSupplier() {
    $('#searchSuppliers').keyup(function (event) {

        var idOrName = $(this).val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier?idOrName=" + idOrName,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                $('#tblSupplier tbody').empty()
                for (const supplier of response.data) {
                    const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${supplier.supplierCode}</td>
                                <td>${supplier.supplierName}</td>
                                <td>${supplier.category}</td>
                                <td>${supplier.mobileNo}</td>
                                <td>${supplier.email}</td>
                                
                            </tr>`;
                    $('#tblSupplier').append(row);
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


// function setButtonState(value) {
//     if (value > 0) {
//         $("#btnAddSupplier").attr('disabled', true);
//         $("#btnUpdateSupplier").attr('disabled', true);
//         $("#btnDeleteSupplier").attr('disabled', true);
//     } else {
//         $("#btnAddSupplier").attr('disabled', false);
//         $("#btnUpdateSupplier").attr('disabled', false);
//         $("#btnDeleteSupplier").attr('disabled',false);
//     }
// }