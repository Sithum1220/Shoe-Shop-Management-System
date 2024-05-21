function purchaseOrderController() {
    setCustomerDetails();
    setItemDetails();
    generateNewOrderId();
    clickOrderItemDetailsTblRow();
    addToCart();
}

const orderCustomerId = $('#orderCustomerId'),
    customerName = $('#customerName'),
    customerLevel = $('#customerLevel'),
    OrderItemId = $('#OrderItemId'),
    itemQty = $('#itemQty'),
    viewItem = $('#viewItem'),
    totalPrice = $('#totalPrice'),
    balancePrice = $('#balancePrice'),
    last4Digit = $('#last4Digit'),
    bankName = $('#bankName'),
    amount = $('#amount');
customerFoundStatus = $('#customerFoundStatus');
let newId;
const itemCart = [];
let itemUnitPrice;
var checkBoxLength;
var itemColor;
var itemSizeId;
var itemSize;
var itemSizeQty;
var enoughQty;

function setCustomerDetails() {
    console.log("Controller: PurchaseOrderController");
    $('#orderCustomerId').keyup(function () {
        var customerId = $(this).val();

        const code = {
            customerId: $(this).val()
        }
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/customer",
            method: "POST",
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (response) {
                if ($('#orderCustomerId').val() === '') {
                    $('#customerFoundStatus').addClass('d-none');
                } else {
                    if (response.data !== "Customer Not Found!") {
                        $('#customerLevel').val(response.data.level);
                        $('#customerName').val(response.data.customerName);
                        $('#customerFoundStatus').addClass('d-none');
                    } else {
                        console.log("response");
                        $('#customerFoundStatus').removeClass('d-none');
                        $('#customerFoundStatus').text("Customer Not Found!");
                        $('#customerLevel').val('');
                        $('#customerName').val('');
                    }
                }
            },
            error: function (resp) {
                // console.log(resp);
            }
        });
    })

}

function setItemDetails() {
    $('#OrderItemId').keyup(function () {
        const code = {
            itemCode: $(this).val(),
        }
        console.log($(this).val())
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/item",
            method: "POST",
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (response) {
                if ($('#OrderItemId').val() === '') {
                    $('#itemFoundStatus').addClass('d-none');
                } else {
                    if (response.data !== "Item Not Found!") {
                        $('#itemFoundStatus').addClass('d-none');
                        $('#tblOrderSize tbody').empty()
                        // response.data.sizeList.forEach(function (item, index) {
                        for (const item of response.data.sizeList) {
                            const row = `<tr>
                                <td>${item.sizeId}</td>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${item.size}</td>
                                <td>${item.color}</td>
                                <td>${item.qty}</td>
                            </tr>`;
                            $('#tblOrderSize').append(row);
                        }
                        $('#viewItem').attr('src', 'data:image/jpeg;base64,' + response.data.itemPicture);
                        console.log(response.data);
                        console.log(itemSizeId);
                        itemUnitPrice = response.data.salePrice;
                        // });
                    } else {
                        console.log("response");
                        $('#tblOrderSize tbody').empty()
                        $('#itemFoundStatus').removeClass('d-none');
                        $('#viewItem').attr('src', '#');
                    }
                }
            },
            error: function (resp) {
                // console.log(resp);
            }
        });

    })
}

function addToCart() {

    $('#addToCart').click(function () {
        if ($('#OrderItemId').val() !== '') {
            if (checkBoxLength) {
                if (parseInt(itemSizeQty) > parseInt($('#itemQty').val())) {
                    console.log(itemSizeId)
                    console.log(itemColor)
                    console.log(itemSize)
                    console.log(itemSizeQty)
                    const cartDetails = {
                        orderNo: newId,
                        paymentMethod: $('#paymentMethod').val(),
                        Customer: {
                            customerId: $('#orderCustomerId').val()
                        },
                        itmQTY: $('#itemQty').val(),
                        Inventory: {
                            itemCode: $('#OrderItemId').val(),
                            sizeList: {
                                sizeId: itemSizeId
                            }
                        },
                        unitPrice: itemUnitPrice,
                        color: itemColor,
                        size: itemSize
                    }

                    console.log(cartDetails)
                    console.log(id)
                    itemCart.push(cartDetails);
                    $('#tblCart tbody').empty()
                    for (const cart of itemCart) {
                        const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${cart.orderNo}</td>
                                <td>${cart.Inventory.itemCode}</td>
                                <td>${cart.itmQTY}</td>
                                <td>${cart.color}</td>
                                <td>${cart.size}</td>
                                <td>${cart.unitPrice}</td>
                             
                            </tr>`;
                        $('#tblCart').append(row);
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "item is not enough.",
                        footer: '<a href="#"></a>'
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please Select Sizes",
                    footer: '<a href="#"></a>'
                });
            }
        }else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Add item",
                footer: '<a href="#"></a>'
            });  
        }

        $('#orderCustomerId').val('');
        $('#OrderItemId').val('');
        $('#itemQty').val('');
        $('#tblOrderSize tbody').empty()
        $('#itemFoundStatus').addClass('d-none');
        $('#viewItem').attr('src', '#');
    })
}

function generateNewOrderId() {
    fetch("http://localhost:8080/api/v1/orders/id")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Read response as text
        })
        .then(data => {
            console.log(data);
            newId = data.data// Assuming data is a string
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function clickOrderItemDetailsTblRow() {

    $('#tblOrderSize').on('click', 'tr', function (event) {
        console.log("Nannnaaa");

        var orderSizeCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            orderSizeCheckbox.prop('checked', !orderSizeCheckbox.prop('checked'));

        }
        $('#tblOrderSize input[type="checkbox"]').not(orderSizeCheckbox).prop('checked', false);

        // getSupplierDataByClickTblRow(supplierCheckbox);
        const row = orderSizeCheckbox.closest('tr');
        itemSizeId = row.find('td:eq(0)').text()
        itemColor = row.find('td:eq(2)').text()
        itemSize = row.find('td:eq(1)').text()
        itemSizeQty = row.find('td:eq(3)').text()

        console.log(itemSizeId)
        console.log(itemColor)
        console.log(itemSize)
        console.log(itemSizeQty)
        checkBoxLength = orderSizeCheckbox !== 0;
    });

    $('#tblOrderSize').on('change', 'input[type="checkbox"]', function () {
        const row = $(this).find('input[type="checkbox"]');
        itemSizeId = row.find('td:eq(0)').text()
        itemColor = row.find('td:eq(2)').text()
        itemSize = row.find('td:eq(1)').text()
        $('#tblOrderSize input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}

// function getSupplierDataByClickTblRow(supplierCheckbox) {
//     var row = supplierCheckbox.closest('tr');
//     if (supplierCheckbox.is(':checked')) {
//         var id = row.find('td:eq(0)').text();
//         $.ajax({
//             url: "http://localhost:8080/api/v1/supplier/" + id,
//             type: "GET",
//             dataType: "json",
//             success: function (response) {
//                 console.log(response);
//                 setSupplierDataToTextField(response)
//                 deleteSupplier(id);
//             },
//             error: function (xhr, status, error) {
//                 console.error('Failed to fetch image:', error);
//             }
//         });
//     } else {
//     }
// }