function purchaseOrderController() {
    setCustomerDetails();
    setItemDetails();
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
                }else {
                    if (response.data !== "Customer Not Found!"){
                        $('#customerLevel').val(response.data.level);
                        $('#customerName').val(response.data.customerName);
                        $('#customerFoundStatus').addClass('d-none');
                    }else {
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
                }else {
                    if (response.data !== "Item Not Found!"){
                        $('#itemFoundStatus').addClass('d-none');
                        $('#tblOrderSize tbody').empty()
                        // response.data.sizeList.forEach(function (item, index) {
                            for (const item of response.data.sizeList) {
                                const row = `<tr>
                                <td class="invisible">${item.sizeId}</td>
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
                        // });
                    }else {
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

