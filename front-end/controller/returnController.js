function returnController(){
getAllOrders();
clickOrderTblRow();
}

function getAllOrders(){
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/api/v1/orders",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblOrders tbody').empty()
            for (const orders of resp.data) {
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${orders.orderNo}</td>
                                <td>${orders.purchaseDate}</td>
                                <td>${orders.total}</td>
                                <td>${orders.cashier}</td>                             
                            </tr>`;
                $('#tblOrders').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}

function getOrderAllDetails() {
$('#moreDetailsBtn').click(function () {

})
    
}
function clickOrderTblRow() {

    $('#tblOrders').on('click', 'tr', function (event) {
        console.log("Nannnaaa");

        var orderCheckbox = $(this).find('input[type="checkbox"]');
        var isCheckboxClick = $(event.target).is('input[type="checkbox"]');

        if (!isCheckboxClick) {
            orderCheckbox.prop('checked', !orderCheckbox.prop('checked'));

        }
        $('#tblOrders input[type="checkbox"]').not(orderCheckbox).prop('checked', false);

        getOrderDataByClickTblRow(orderCheckbox);
    });

    $('#tblOrders').on('change', 'input[type="checkbox"]', function () {
        getOrderDataByClickTblRow($(this).find('input[type="checkbox"]'));
        $('#tblOrders input[type="checkbox"]').not($(this)).prop('checked', false);
    });
}

function getOrderDataByClickTblRow(orderCheckbox) {
    var row = orderCheckbox.closest('tr');
    if (orderCheckbox.is(':checked')) {
        var id = row.find('td:eq(0)').text();
        const orderId = {
            orderNo: id
        }
        console.log(orderId);
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/orderDetails",
            type: "POST",
            data: JSON.stringify(orderId),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            success: function (response) {
                $('#tblOrdersDetails tbody').empty()
                for (const ordersDetails of response.data) {
                    const row = `<tr>
                                <td></td>
                                <td>${ordersDetails.inventory.itemCode}</td>
                                <td>${ordersDetails.color}</td>
                                <td>${ordersDetails.size}</td>
                                <td>${ordersDetails.itmQTY}</td>                             
                            </tr>`;
                    $('#tblOrdersDetails').append(row);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error :', error);
            }
        });
    }
}