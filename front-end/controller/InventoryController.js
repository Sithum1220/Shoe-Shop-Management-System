function inventoryController() {
    checkItem();
    checkSupplier();
    saveItem();
    itemImageUploader();
    itemClickTblRow();
}

var base64String;

function saveItem() {

    $('#itemPopupAddBtn').click(function () {
        if ($(this).text().trim() === 'Save') {
            const postData = {
                itemCode: $('#itemCode').val(),
                itemDesc: $('#itemDesc').val(),
                qty: $('#itemQty').val(),
                size: $('#itemSize').val(),
                category: $('#itemCategory').val(),
                supplier: {
                    supplierCode: $('#supplierCode').val(),
                },
                salePrice: $('#itemSellPrice').val(),
                buyPrice: $('#itemBuyPrice').val(),
                itemPicture:base64String
            };
            console.log(postData);
            $.ajax({
                url: "http://localhost:8080/api/v1/inventory",
                method: "POST",
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function (resp) {
                    if (resp.state == 200) {
                        console.log(resp);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Item has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // getAllEmployeeData();
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
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password do not match",
                footer: '<a href="#"></a>'
            });
        }

    })
}
function checkItem() {
    $('#itemCode').keyup(function () {
        const code = {
            itemCode: $(this).val()
        }
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/status",
            method: "POST",
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (resp) {
                if (resp.state == 200) {
                    console.log(resp);
                    var split = resp.data.split(",");
                    if ($('#itemCode').val() === '') {
                        $('#itemStatus').text('Item Status');
                    }else {
                        $('#itemStatus').text(split[0]);
                        if (split[0] !== "No Item Found") {
                            console.log(split[0]);
                            base64String = split[1];
                            $('#itemImgViewer').attr('src', 'data:image/jpeg;base64,' + split[1]);
                        }else {
                            $('#itemImgViewer').attr('src', '#');
                        }
                    }
                   
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
function checkSupplier() {
    $('#supplierCode').keyup(function () {
        const code = {
            supplier: {
                supplierCode: $(this).val()
            }
        }
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/supplier",
            method: "POST",
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (resp) {
                if (resp.state == 200) {
                    console.log(resp);
                    if ($('#supplierCode').val() === '') {
                        $('#supplierName').text('Supplier Name');
                        $('#supplierName').css('color', 'black');
                    }else {
                        if (resp.data === 'Supplier Not Found') {
                            $('#supplierName').css('color', 'red');
                            $('#supplierName').text(resp.data);
                        }else {
                            $('#supplierName').css('color', 'green');
                            $('#supplierName').text(resp.data);
                        }
                        
                    }

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

function itemImageUploader() {
    const itemImageUploader = $('#itemImgUploader');
    const itemImageViewer = $('#itemImgViewer');

    itemImageUploader.change(function () {

        var file = this.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                itemImageViewer.attr('src', e.target.result);
                base64String = reader.result.split(',')[1];
            };

            reader.readAsDataURL(file);
        } else {
            itemImageViewer.attr('src', '#');
        }
    })
}

function itemClickTblRow() {

    $('#tblInventory').on('click', 'tr', function (event) {
        // Check if the current checkbox is not the specified one
        // Toggle the checked state of the checkbox

        // Uncheck all other checkboxes

        var itemCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            itemCheckbox.prop('checked', !itemCheckbox.prop('checked'));

        }
        $('#tblInventory input[type="checkbox"]').not(itemCheckbox).prop('checked', false);

        // Uncheck all other checkboxes
        setImage(itemCheckbox);
        // updateCustomer(employeeCheckbox)
    });

    $('#tblInventory').on('change', 'input[type="checkbox"]', function () {
        setItemImage($(this).find('input[type="checkbox"]'));
        $('#tblInventory input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}

function setItemImage(itemCheckbox) {
    var row = itemCheckbox.closest('tr');
    if (itemCheckbox.is(':checked')) {
        var id = row.find('td:eq(0)').text();
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/" + id,
            type: "GET",
            dataType: "json",
            success: function (response) {
                $('#itemImg').attr('src', 'data:image/jpeg;base64,' + response.proPic);
                console.log(response);
                // setDataToTextField(response)
                // deleteEmployee(id)
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    } else {
        $('#itemImg').attr('src', '#');
    }
}
