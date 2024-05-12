function inventoryController() {
    checkItem();
    checkSupplier();
    saveItem();
    itemImageUploader();
    itemClickTblRow();
    getSizes();
}

var base64String;
var inputData = [];
function saveItem() {
    
        $('#saveSizes').click(function () {
            if (inputData.length > 0) {
                $('.inputBox').each(function (index) {
                    var color = $(this).find('input[id="itemColor"]').val();
                    var size = $(this).find('input[id="itemSize"]').val();
                    var quantity = $(this).find('input[id="itemQty"]').val();

                    if (!color || !size || !quantity) {
                        return;
                    }
                    // var itemData = {
                    //     color: color,
                    //     size: size,
                    //     qty: quantity
                    // };
                    //
                    // inputData.push(itemData);
                    inputData[index].color = color;
                    inputData[index].size = size;
                    inputData[index].qty = quantity;
                }); 
            }else {
                $('.inputBox').each(function () {
                    var color = $(this).find('input[id="itemColor"]').val();
                    var size = $(this).find('input[id="itemSize"]').val();
                    var quantity = $(this).find('input[id="itemQty"]').val();

                    if (!color || !size || !quantity) {
                        return;
                    }
                    var itemData = {
                        color: color,
                        size: size,
                        qty: quantity
                    };

                    inputData.push(itemData);
                });
            }

        });
        
    $('#inventoryPopupBtn').click(function () {
        if ($(this).text().trim() === 'Save') {
            const postData = {
                itemCode: $('#itemCode').val(),
                itemDesc: $('#itemDesc').val(),
                category: $('#itemCategory').val(),
                supplier: {
                    supplierCode: $('#supplierCode').val(),
                },
                salePrice: $('#itemSellPrice').val(),
                buyPrice: $('#itemBuyPrice').val(),
                itemPicture: base64String,
                supplierName: $('#supplierName').text(),
                sizeList: inputData,
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
                    if ($('#itemCode').val() === '') {
                        $('#itemStatus').text('');
                    } else {
                        $('#itemStatus').text(resp.data.status);
                        if (resp.data.status !== "No Item Found") {

                            console.log(resp);
                            $('#itemImgViewer').attr('src', 'data:image/jpeg;base64,' + resp.data.itemPicture);
                            $('#itemBuyPrice').val(resp.data.buyPrice);
                            $('#itemSellPrice').val(resp.data.salePrice);
                            $('#itemDesc').val(resp.data.itemDesc);
                            $('#itemCategory').val(resp.data.category);
                            $('#supplierCode').val(resp.data.supplier.supplierCode);
                            $('#supplierName').text(resp.data.supplierName);
                            base64String = resp.data.itemPicture;
                            
                            $('.inputBox').not(':first').remove();

                            inputData = resp.data.sizeList;
                            resp.data.sizeList.forEach(function (item, index) {
                                if (index > 0) {
                                    var newInput = $('.inputBox:first').clone();
                                    $('#inputContainer').append(newInput);
                                }
                                var inputBox = $('.inputBox');
                                inputBox.eq(index).find('input[id="itemColor"]').val(item.color);
                                inputBox.eq(index).find('input[id="itemSize"]').val(item.size);
                                // inputBox.eq(index).find('input[id="itemQty"]').val(item.qty);
                            });
                            $('#itemStatus').css('color', 'green');
                            $('.dis').prop('disabled', true);

                        } else {
                            $('#itemImgViewer').attr('src', '#');
                            $('#itemBuyPrice').val('');
                            $('#itemSellPrice').val('');
                            $('#itemSize').val('');
                            $('#itemDesc').val('');
                            $('#supplierCode').val('');
                            $('#itemCategory').val('');
                            $('#itemStatus').css('color', 'red');
                            $('#inputContainer .inputBox:not(:first)').remove();
                            $('#itemColor, #itemSize, #itemQty').val('');
                            $('.dis').prop('disabled', false);
                            
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
                        $('#supplierName').text('');
                    } else {
                        if (resp.data === 'Supplier Not Found') {
                            $('#supplierName').css('color', 'red');
                            $('#supplierName').text(resp.data);
                        } else {
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

function getSizes() {

}