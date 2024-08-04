function purchaseOrderController() {
    setCustomerDetails();
    setItemDetails();
    clickOrderItemDetailsTblRow();
    addToCart();
    purchaseOrder();
    clickCartDetailsTblRow();
    deleteCart();
    generateNewOrderId();
}

let newId;
let itemCart = [];
let itemUnitPrice
let itemQty;
let itemResponse = [];
let date = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
let itemSizeId;
let itemColor;
let itemSize;
let itemSizeQty;
let customerName;
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
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/customer",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (response) {
                if ($('#orderCustomerId').val() === '') {
                    $('#customerFoundStatus').addClass('d-none');
                } else {
                    if (response.data !== "Customer Not Found!") {
                        $('#customerLevel').val(response.data.level);
                        $('#customerName').val(response.data.customerName);
                        // customerName = response.data.customerName;
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
                                <td class="text-white">${item.sizeId}</td>
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
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/item",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(code),
            contentType: "application/json",
            success: function (response) {
                if ($('#OrderItemId').val() === '') {
                    $('#itemFoundStatus').addClass('d-none');
                } else {
                    if (response.data !== "Item Not Found!") {
                        $('#itemFoundStatus').addClass('d-none');
                        for (const responseElement of response.data.sizeList) {
                            if (itemResponse.length === 0) {
                                itemResponse.push(responseElement);
                            } else {
                                let exists = false;
                                for (const item of itemResponse) {
                                    if (item.sizeId === responseElement.sizeId) {
                                        exists = true;
                                        break;
                                    }
                                }
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

        // const form = $('#itemDetailsForm');
        // if (!validateForm(form)) {
        //     return;
        // }
        
        if ($('#OrderItemId').val() !== '') {
            $('#tblOrderSize tbody tr').each(function () {
                let checkBox = $(this).find('input[type="checkbox"]').is(':checked');
                if (checkBox) {
                    checkBoxChecked = true;
                    itemSizeId = $(this).find('td:eq(0)').text();
                    itemSize = $(this).find('td:eq(1)').text();
                    itemColor = $(this).find('td:eq(2)').text();
                    itemSizeQty = $(this).find('td:eq(3)').text();

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


                                item.qty -= parseInt($('#itemQty').val());
                                loadDataSizeTable();

                                console.log("AAAAA");
                                console.log(itemResponse);
                                break;
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
                    if (itemCart[i].inventory.itemCode === $('#OrderItemId').val() && itemCart[i].color === itemColor && itemCart[i].size === itemSize) {
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
                        itemCart[i].itmTotal = itemCart[i].unitPrice * itemCart[i].itmQTY;
                        itemExists = true;
                        break; // Exit the loop since we found the item
                    }
                }

                if (!itemExists) {

                    const cartDetails = {

                        itmQTY: newItemQty,

                        inventory: {
                            itemCode: $('#OrderItemId').val(),
                        },

                        orderNo: {
                            orderNo: newId
                        },
                        itmTotal: itemUnitPrice * parseInt($('#itemQty').val()),

                        sizeDTO: {
                            id: itemSizeId
                        },
                        Order_Status: "ACTIVE",
                        unitPrice: itemUnitPrice,
                        color: itemColor,
                        size: itemSize,
                        sizeId: itemSizeId
                    };

                    console.log(cartDetails);
                    console.log(date);
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
                     
                    <td class="text-white">${cart.sizeId}</td>
                    <td>${cart.orderNo.orderNo}</td>
                    <td>${cart.inventory.itemCode}</td>
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

        $('#balancePrice').text('00.00');

        if ($(this).val() === 'Cash Payment') {

            $('#amount').off('keyup');

            $('#amount').keyup(function () {
                let amount = parseFloat($(this).val());
                let totalPrice = parseFloat($('#totalPrice').text());

                if (!isNaN(amount) && amount > 0) {
                    let balance = amount - totalPrice;
                    $('#balancePrice').text(balance.toFixed(2));
                } else {
                    $('#balancePrice').text('00.00');
                }
            });

        } else if ($(this).val() === 'Card Payment') {

            $('#amount').off('keyup');
        }
    });

    let cashierName;
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/employees/byEmail/" + localStorage.getItem("email"),
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            cashierName = response.data.employeeName;
            console.log(cashierName)
        },
        error: function (xhr, status, error) {
            console.error('Failed to fetch image:', error);
        }
    });


    $('#purchaseOrder').click(function () {

        // const form = $('#itemDetailsForm');
        // if (!validateForm(form)) {
        //     const form2 = $('#paymentForm');
        //     if (!validateForm(form2)) {
        //         return;
        //     }
        //     return;
        // }
        //
        // const form2 = $('#paymentForm');
        // if (!validateForm(form2)) {
        //     return;
        // }
        
        let total = 0;
        itemCart.forEach(item => {
            total += item.itmQTY * item.unitPrice; // Calculate total price for each item
        });

        let customerId;
        if ($('#orderCustomerId').val() === '') {
            customerId = null;
        }else {
            customerId = $('#orderCustomerId').val();
        }
        console.log(total);
        const data = {
            orderNo: newId,
            // purchaseDate: date,
            total: total,
            paymentMethod: $('#paymentMethod').val(),
            cashier: cashierName,
            customerName: $('#customerName').val(),
            customerId: {
                customerId: customerId
            },
            saleDetails: itemCart,
            Order_Status: "ACTIVE"
        }

        console.log(data);

        $.ajax({
            url: "http://localhost:8080/api/v1/orders",
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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

                    // generateNewOrderId();
                    generateNewOrderId();
                    fetchLastThreeOrders();
                    totalSalesOfASelectedDate();
                    totalProfitOfASelectedDate();
                    mostSaleItemOfASelectedDate();
                    totalItemsSoldOnDate();
                    documentReady();
                    itemCart = [];
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
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://localhost:8080/api/v1/orders/id", {
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