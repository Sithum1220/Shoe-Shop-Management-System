function supplierControlFunction() {
    saveSupplier();
    getAllSuppliers()
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

}