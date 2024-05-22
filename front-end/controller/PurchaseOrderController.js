function purchaseOrderController() {
    setCustomerDetails();
    setItemDetails();
    generateNewOrderId();
    clickOrderItemDetailsTblRow();
    addToCart();
    purchaseOrder();
    clickCartDetailsTblRow();
    deleteCart();
}

customerFoundStatus = $('#customerFoundStatus');
let newId;
const itemCart = [];
let itemUnitPrice
let itemQty;
let itemResponse = [];


let itemSizeId;
let itemColor;
let itemSize;
let itemSizeQty;
let totalQuantity;
let checkBoxChecked = false;
var OrderItemId;
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

function loadDataSizeTable() {
    $('#tblOrderSize tbody').empty()
    for (const item of itemResponse) {
        if (OrderItemId === item.inventory) {
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
    }
}


function setItemDetails() {
    $('#OrderItemId').keyup(function () {
        OrderItemId = $(this).val();
        const code = {
            itemCode: $(this).val(),
        }
        console.log($(this).val())
        console.log('aaasss')
        console.log(itemResponse)
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
                        // response.data.sizeList.forEach(function (item, index) {
                        for (const responseElement of response.data.sizeList) {
                            // Check if itemResponse is empty
                            if (itemResponse.length === 0) {
                                itemResponse.push(responseElement); // If empty, just add responseElement
                            } else {
                                let exists = false;
                                // Check if responseElement already exists in itemResponse
                                for (const item of itemResponse) {
                                    if (item.sizeId === responseElement.sizeId) {
                                        exists = true;
                                        break; // If it exists, no need to check further
                                    }
                                }
                                // If responseElement doesn't exist in itemResponse, add it
                                if (!exists) {
                                    itemResponse.push(responseElement);
                                }
                                console.log("itemResponse");
                                console.log(itemResponse);
                            }
                        }
                        
                        loadDataSizeTable();
                        // console.log(itemResponse);
                        $('#viewItem').attr('src', 'data:image/jpeg;base64,' + response.data.itemPicture);
                        console.log(response.data);
                        itemUnitPrice = response.data.salePrice;
                        itemQty = response.data.qty;
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
            $('#tblOrderSize tbody tr').each(function () {
                let checkBox = $(this).find('input[type="checkbox"]').is(':checked');

                if (checkBox) {
                    checkBoxChecked = true;
                    itemSizeId = $(this).find('td:eq(0)').text(); // Assuming first data column is at index 1
                    itemSize = $(this).find('td:eq(1)').text(); // Adjust index as per your table structure
                    itemColor = $(this).find('td:eq(2)').text(); // Adjust index as per your table structure
                    itemSizeQty = $(this).find('td:eq(3)').text(); // Adjust index as per your table structure

                    console.log('Item Size ID:', itemSizeId);
                    console.log('Item Color:', itemColor);
                    console.log('Item Size:', itemSize);
                    console.log('Item Size Quantity:', itemSizeQty);
                    // if ($(this).find('td:eq(3)').text() > 0) {
                    //     $(this).find('td:eq(3)').text(itemSizeQty - parseInt($('#itemQty').val()));
                    // }
                    console.log(itemResponse);

                    if ($(this).find('td:eq(3)').text() > 0) {
                        for (const item of itemResponse) {
                            if (item.sizeId === parseInt(itemSizeId)) {


                                item.qty -= parseInt($('#itemQty').val()); // Update the quantity directly on the matched item
                                loadDataSizeTable();

                                console.log("AAAAA");
                                console.log(itemResponse);
                                break; // Exiting the loop since we found the item we were looking for
                            }
                        }

                    }
                }
            });

            if (!checkBoxChecked) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please Select Sizes",
                    footer: '<a href="#"></a>'
                });
                return;
            }
            if (parseInt(itemSizeQty) >= parseInt($('#itemQty').val())) {

                let newItemQty = parseInt($('#itemQty').val());

                let itemExists = false;
                for (let i = 0; i < itemCart.length; i++) {
                    if (itemCart[i].saleDetailPK.itemCode === $('#OrderItemId').val() && itemCart[i].color === itemColor && itemCart[i].size === itemSize) {
                        // Update quantity if the item with the same color exists
                        console.log("totalQuantity: " + totalQuantity);

                        totalQuantity = itemCart[i].itmQTY + newItemQty;

                        if (totalQuantity > itemQty) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "The quantity you selected exceeds the available stock. Please adjust your order.",
                                footer: '<a href="#"></a>'
                            });

                            return;
                        }

                        // Update quantity if the item with the same color exists
                        itemCart[i].itmQTY = totalQuantity;
                        itemExists = true;
                        break; // Exit the loop since we found the item
                    }
                }

                if (!itemExists) {

                    const cartDetails = {
                        saleDetailPK: {
                            orderNo: newId,
                            itemCode: $('#OrderItemId').val()
                        },
                        paymentMethod: null,
                        customerId: {
                            customerId: $('#orderCustomerId').val()
                        },
                        itmQTY: newItemQty,
                        // inventory: {
                        //     itemCode: $('#OrderItemId').val(),
                        //     sizeList: [{
                        //         sizeId: itemSizeId
                        //     }]
                        // },
                        sizeDTO: {
                            id: itemSizeId
                        },
                        unitPrice: itemUnitPrice,
                        color: itemColor,
                        size: itemSize,
                        sizeId: itemSizeId
                    };

                    itemCart.push(cartDetails);
                }

                tblCartDataLoad();

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
                text: "Please Add item",
                footer: '<a href="#"></a>'
            });
        }

        $('#itemQty').val('');
        $('#tblOrderSize tbody tr').each(function () {
            $(this).find('input[type="checkbox"]').prop('checked', false);
            checkBoxChecked = false;
        })


        let total = 0;
        itemCart.forEach(item => {
            total += item.itmQTY * item.unitPrice; // Calculate total price for each item
        });

        $('#totalPrice').text(total);
        console.log(itemCart);
    })
}

function tblCartDataLoad() {
    $('#tblCart tbody').empty();
    for (const cart of itemCart) {
        const row = `<tr>
                    <th scope="row">
                         <div class="form-check">
                             <input class="form-check-input" type="checkbox" value=""/>
                        </div>
                     </th>
                     
                    <td>${cart.sizeId}</td>
                    <td>${cart.saleDetailPK.orderNo}</td>
                    <td>${cart.saleDetailPK.itemCode}</td>
                     <td>${cart.itmQTY}</td>
                     <td>${cart.color}</td>
                     <td>${cart.size}</td>
                     <td>${cart.unitPrice * cart.itmQTY}</td>
                  </tr>`;

        $('#tblCart').append(row);
    }
}

function purchaseOrder() {
    $('#paymentMethod').change(function () {
        if ($(this).val() === 'Cash Payment') {

            $('#amount').keyup(function () {
                const amount = $(this).val();
                let balance = amount - $('#totalPrice').text()

                $('#balancePrice').text(balance);
            });

        } else if ($(this).val() === 'Card Payment') {
            $('#balancePrice').text('00.00');
        }
    })


    $('#purchaseOrder').click(function () {
        for (let i = 0; i < itemCart.length; i++) {
            itemCart[i].paymentMethod = $('#paymentMethod').val();
            if (itemCart[i].customerId.customerId === '') {
                itemCart[i].customerId.customerId = 'Nan';
                console.log(itemCart[i].customerId);
            }
        }


        console.log(itemCart);
        $.ajax({
            url: "http://localhost:8080/api/v1/orders",
            method: "POST",
            data: JSON.stringify(itemCart),
            contentType: "application/json",
            success: function (resp) {
                if (resp.state == 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Order has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    $('#tblCart tbody').empty();
                    $('#totalPrice').text('00.00')
                    $('#balancePrice').text('00.00')
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

    });

    $('#tblOrderSize').on('change', 'input[type="checkbox"]', function () {
        $('#tblOrderSize input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}

function clickCartDetailsTblRow() {

    $('#tblCart').on('click', 'tr', function (event) {
        console.log("Nannnaaa");

        var cartCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            cartCheckbox.prop('checked', !cartCheckbox.prop('checked'));

        }
        $('#tblCart input[type="checkbox"]').not(cartCheckbox).prop('checked', false);

    });

    $('#tblCart').on('change', 'input[type="checkbox"]', function () {
        // deleteCart($(this).find('input[type="checkbox"]'));
        $('#tblCart input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}


function deleteCart() {

    $('#removeCart').click(function () {
        let id;
        let qty;
        let sizeId;
        $('#tblCart tbody tr').each(function () {
            let checkBox = $(this).find('input[type="checkbox"]').is(':checked');
            // var row = checkBox.closest('tr');

            if (checkBox) {

                id = $(this).find('td:eq(2)').text();
                qty = $(this).find('td:eq(3)').text();
                sizeId = $(this).find('td:eq(0)').text();

                console.log(id);
                console.log("totalQuantity: " + totalQuantity);
                console.log("itemQty: " + itemQty);
                console.log("qty: " + qty);
                $(this).remove();
            }

        });
        let index = itemCart.findIndex(function (cartItem) {
            return cartItem.saleDetailPK.itemCode === id;
        });

        for (const item of itemResponse) {
            if (item.sizeId === parseInt(sizeId)) {
                item.qty += parseInt(qty);
                loadDataSizeTable();
                break;
            }
        }
        // Remove the item from the array if found
        if (index !== -1) {
            console.log("fuck");
            itemCart.splice(index, 1);
            // totalQuantity = 0;
        }
        console.log(itemResponse);

        console.log("------")
        console.log(itemResponse);

        // Optionally remove the row from the table

    })
}