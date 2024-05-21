function purchaseOrderController() {
    setCustomerDetails();
    setItemDetails();
    generateNewOrderId();
    clickOrderItemDetailsTblRow();
    addToCart();
    purchaseOrder();
}

customerFoundStatus = $('#customerFoundStatus');
let newId;
const itemCart = [];
let itemUnitPrice
let itemQty;
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

    let itemSizeId;
    let itemColor;
    let itemSize;
    let itemSizeQty;
    let checkBoxChecked = false;
    
    $('#addToCart').click(function () {
        if ($('#OrderItemId').val() !== '') {
            $('#tblOrderSize tbody tr').each(function() {
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
                    if ($(this).find('td:eq(3)').text() > 0){
                        $(this).find('td:eq(3)').text(itemSizeQty - parseInt($('#itemQty').val()));

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
                        let totalQuantity = itemCart[i].itmQTY + newItemQty;
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
                        orderNo: newId,
                        paymentMethod:null,
                        customerId: {
                            customerId: $('#orderCustomerId').val()
                        },
                        itmQTY: newItemQty,
                        inventory: {
                            itemCode: $('#OrderItemId').val(),
                            sizeList: [{
                                sizeId: itemSizeId
                            }]
                        },
                        unitPrice: itemUnitPrice,
                        color: itemColor,
                        size: itemSize
                    };

                    itemCart.push(cartDetails);
                }

                $('#tblCart tbody').empty();
                for (const cart of itemCart) {
                    const row = `<tr>
                    <th scope="row">
                         <div class="form-check">
                             <input class="form-check-input" type="checkbox" value=""/>
                        </div>
                     </th>
                     
                    <td>${cart.orderNo}</td>
                    <td>${cart.inventory.itemCode}</td>
                     <td>${cart.itmQTY}</td>
                     <td>${cart.color}</td>
                     <td>${cart.size}</td>
                     <td>${cart.unitPrice * cart.itmQTY}</td>
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
                text: "Please Add item",
                footer: '<a href="#"></a>'
            });
        }

        $('#itemQty').val('');
        $('#tblOrderSize tbody tr').each(function() {
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

function purchaseOrder() {
    $('#paymentMethod').change(function () {
        if ($(this).val() === 'Cash Payment') {

            $('#amount').keyup(function () {
                const amount = $(this).val();
                let balance = amount - $('#totalPrice').text()

                $('#balancePrice').text(balance);
            });

        } else if ($(this).val() === 'Card Payment'){
            $('#balancePrice').text('00.00');
        }
    })
    
    $('#purchaseOrder').click(function () {
        for (let i = 0; i < itemCart.length; i++) {
            itemCart[i].paymentMethod = $('#paymentMethod').val();
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
