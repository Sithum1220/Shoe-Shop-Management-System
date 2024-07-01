function inventoryController() {
    checkItem();
    checkSupplier();
    saveItem();
    itemImageUploader();
    itemClickTblRow();
    getAllItems();
    updateItem();

    $('#inventoryInputForm input').on('keydown', function(event) {
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

var itemBase64String;
var inputData = [];
var itemId;
var inputBoxLength;

function saveItem() {
        $('#saveSizes').click(function () {
            const form = $('#inputContainer');
            
            if (!validateForm(form)) {
                return;
            }
            if (inputData.length > 0) {
                console.log("Saving Sizes length: "+$('.inputBox').length);

                $('.inputBox').each(function () {
                    var color = $(this).find('input[id="itemColor"]:enabled').val();
                    var size = $(this).find('input[id="itemSize"]:enabled').val();
                    var quantity = $(this).find('input[id="itemQty"]:enabled').val();

                    if (!color || !size || !quantity) {
                        return;
                    }

                    var itemData = {
                        color: color,
                        size: size,
                        qty: quantity,
                        itemCode: $('#itemCode').val()
                    };

                    inputData.push(itemData);
                });


                $('.inputBox').each(function (index) {
                    console.log(index)
                    var color = $(this).find('input[id="itemColor"]:disabled').val();
                    var size = $(this).find('input[id="itemSize"]:disabled').val();
                    var quantity = $(this).find('input[id="itemQty"]:enabled').val();

                    // if (!color || !size || !quantity) {
                    //     return;
                    // }
                    
                    if (inputData[index].id !== undefined){
                        inputData[index].color = color;
                        inputData[index].size = size;
                        inputData[index].qty = quantity;
                    }
                    // Update the corresponding entry in the `inputData` array
                    

                    // Log the values for debugging
                    // console.log(quantity);
                    // console.log(color);
                    // console.log(size);
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
                        qty: quantity,
                        itemCode:$('#itemCode').val()
                    };
                    inputData.push(itemData);
                });
            }
            
            $('#sizeClose').click();

        });
        console.log(inputData);
    $('#inventoryPopupBtn').click(function () {
        if ($(this).text().trim() === 'Save') {
            const form = $('#inventoryInputForm');
            if (!validateForm(form)) {
                return;
            }
            if ($('#itemImgViewer').src === '#'){
                itemBase64String = null;
            }
            const postData = {
                itemCode: $('#itemCode').val(),
                itemDesc: $('#itemDesc').val(),
                category: $('#itemCategory').val(),
                supplier: {
                    supplierCode: $('#supplierCode').val(),
                },
                salePrice: $('#itemSellPrice').val(),
                buyPrice: $('#itemBuyPrice').val(),
                itemPicture: itemBase64String,
                supplierName: $('#supplierName').text(),
                sizeList: inputData,
            };
            
            console.log(postData);
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/inventory",
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
                            title: "Item has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#itemPopupCancelBtn').click();
                        getAllItems();
                    }
                },
                error: function (resp) {
                    console.log("kkjj")
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

function checkItem() {
    $('#itemCode').keyup(function () {
        const code = {
            itemCode: $(this).val()
        }
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/status",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(code),
            dataType: "json",
            contentType: "application/json",
            success: function (resp) {
                if (resp.state == 200) {
                    console.log(resp);
                    if ($('#itemCode').val() === '') {
                        $('#itemStatus').text('');
                    } else {
                        $('#itemStatus').text(resp.data.status);
                        if (resp.data.status !== "No Item Found") {

                            console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
                            $('#itemImgViewer').attr('src', 'data:image/jpeg;base64,' + resp.data.itemPicture);
                            $('#itemBuyPrice').val(resp.data.buyPrice);
                            $('#itemSellPrice').val(resp.data.salePrice);
                            $('#itemDesc').val(resp.data.itemDesc);
                            $('#itemCategory').val(resp.data.category);
                            $('#supplierCode').val(resp.data.supplier.supplierCode);
                            $('#supplierName').text(resp.data.supplierName);
                            // $('#itemImgUploader').val(resp.data.itemPicture);
                            itemBase64String = resp.data.itemPicture;
                            
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
                                inputBox.eq(index).find('input[id="itemQty"]').val(0);
                                inputBox.eq(index).find('input[id="itemQty"]').on('focus', function(){
                                    if ($(this).val() === '0') {
                                        $(this).val('');
                                    }
                                });

                                inputBox.eq(index).find('input[id="itemQty"]').on('blur', function(){
                                    if ($(this).val() === '') {
                                        $(this).val('0');
                                    }
                                });
                            });
                            inputBoxLength =$('.inputBox').length;
                            console.log("inputBox length: "+ $('.inputBox').length);
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
                            $('#supplierName').text('');
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
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/supplier",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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
                itemBase64String = reader.result.split(',')[1];
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
        setItemImage(itemCheckbox);
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
        itemId = row.find('td:eq(0)').text();
        console.log(row.find('td:eq(0)').text());
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/" + itemId,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                $('#itemImg').attr('src', 'data:image/jpeg;base64,' + response.itemPicture);
                console.log(response);
                setDataToInput(response)
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

function updateItem() {

    if (inputData.length > 0) {
        $('.inputBox').each(function (index) {
            const form = $('#inputContainer');

            if (!validateForm(form)) {
                return;
            }
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
            console.log(quantity)
            console.log(color)
            console.log(size)
            inputData[index].color = color;
            inputData[index].size = size;
            inputData[index].qty = quantity;
        });
    }

    $('#inventoryPopupBtn').click(function () {
        if ($(this).text().trim() === 'Update') {
            const form = $('#inventoryInputForm');
            if (!validateForm(form)) {
                return;
            }
            const postData = {
                itemCode: $('#itemCode').val(),
                itemDesc: $('#itemDesc').val(),
                category: $('#itemCategory').val(),
                supplier: {
                    supplierCode: $('#supplierCode').val(),
                },
                salePrice: $('#itemSellPrice').val(),
                buyPrice: $('#itemBuyPrice').val(),
                itemPicture: itemBase64String,
                supplierName: $('#supplierName').text(),
                sizeList: inputData,
            };

            console.log(postData);
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/inventory",
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
                            title: "Item has been Updated",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $('#itemPopupCancelBtn').click();
                        getAllItems();
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

function getAllItems() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblInventory tbody').empty()
            for (const inventory of resp.data) {
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${inventory.itemCode}</td>
                                <td>${inventory.supplier.supplierCode}</td>
                                <td>${inventory.supplierName}</td>
                                <td>${inventory.itemDesc}</td>
                                <td>${inventory.category}</td>
                                <td>${inventory.status}</td>                             
                            </tr>`;
                $('#tblInventory').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function setDataToInput(resp) {
    $('#itemImgViewer').attr('src', 'data:image/jpeg;base64,' + resp.itemPicture);
    $('#itemCode').val(resp.itemCode);
    $('#itemBuyPrice').val(resp.buyPrice);
    $('#itemSellPrice').val(resp.salePrice);
    $('#itemDesc').val(resp.itemDesc);
    $('#itemCategory').val(resp.category);
    $('#supplierCode').val(resp.supplier.supplierCode);
    $('#supplierName').text(resp.supplierName);
    $('#itemStatus').text(resp.status);
    itemBase64String = resp.itemPicture;
    $('.inputBox').not(':first').remove();
    $('#itemStatus').css('color', 'green');
    inputData = resp.sizeList;
    resp.sizeList.forEach(function (item, index) {
        if (index > 0) {
            var newInput = $('.inputBox:first').clone();
            $('#inputContainer').append(newInput);
        }

        var inputBox = $('.inputBox');
        inputBox.eq(index).find('input[id="itemColor"]').val(item.color);
        inputBox.eq(index).find('input[id="itemSize"]').val(item.size);
        inputBox.eq(index).find('input[id="itemQty"]').val(item.qty);

    });
}