function supplierControlFunction() {
    saveSupplier();
    getAllSuppliers()
    clickSupplierTblRow();
    updateSupplier();
}

function generateNewSupplierId() {
    fetch("http://localhost:8080/api/v1/supplier/id")
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

            $.ajax({
                url: "http://localhost:8080/api/v1/supplier",
                method: "POST",
                data: JSON.stringify(postData),
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
                        $('#supplierPopupAddBtn').attr('data-dismiss', 'modal');
                        // $('#supplierFormContainer').modal('hide');
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
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier",
        method: "GET",
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

            $.ajax({
                url: "http://localhost:8080/api/v1/supplier",
                method: "PATCH",
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
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/" + id,
            type: "GET",
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
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/" + id,
            type: "DELETE",
            success: function (response) {
                getAllSuppliers();
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