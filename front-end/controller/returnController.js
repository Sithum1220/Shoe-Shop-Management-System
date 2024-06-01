function returnController() {
    getAllOrders();
    clickOrderTblRow();
    checkCanBeReturnedOrder();
    clearOrderIdInput();
   
}

let OrderNo;

function getAllOrders() {
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
                let row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${orders.orderNo}</td>
                                <td>${orders.purchaseDate}</td>
                                <td>${orders.cashier}</td>  
                                <td>${orders.total}</td>`;
                            
                if (orders.status === 'RETURNED') {
                    row += `<td class="highlight">${orders.status}</td>`
                }else if (orders.status === 'CONFIRMED') {
                    row += `<td className="highlight1">${orders.status}</td>`
                }else {
                    row += `<td>${orders.status}</td>`
                }

                row += `</tr>`;
                $('#tblOrders').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
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
        OrderNo = id
        const orderId = {
            orderNo: id
        }
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
                $('#tblOrdersDetails tbody').empty();
                for (const ordersDetails of response.data) {
                    console.log("returnedQty: " + ordersDetails.returnedQty);

                    let row = `<tr>
            <td>${ordersDetails.inventory.itemCode}</td>
            <td>${ordersDetails.color}</td>
            <td>${ordersDetails.size}</td>
            <td>${ordersDetails.itmQTY}</td>
            <td>${ordersDetails.itmTotal}</td>`;

                    if (ordersDetails.returnedQty !== 0) {
                        row += `<td class="highlight" data-toggle="tooltip" data-placement="top" title="${ordersDetails.returnedQty + " Qty has been returned."}">${ordersDetails.status}</td>`;
                    } else {
                        row += `<td>${ordersDetails.status}</td>`;
                    }

                    row += `</tr>`;

                    $('#tblOrdersDetails').append(row);
                }

                // Initialize tooltips after appending rows
                $('[data-toggle="tooltip"]').tooltip();
            },
            error: function (xhr, status, error) {
                console.error('Error :', error);
            }
        });
    }
}

function checkCanBeReturnedOrder() {
    $('#returnFormBtn').click(function () {
        $('#orderId').val(OrderNo);
        let id = $('#orderId').val()
        if ($('#orderId').val() !== '') {
            console.log("fuck")
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/orders/" + id,
                type: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (response) {
                    if (response.data) {
                        $('#returnStatus').addClass('d-none');
                        $('#orderType').prop('disabled', false);
                        returnFullOrders(id)
                        console.log(response.data)
                        console.log("true Hode");
                    } else {
                        $('#returnStatus').removeClass('d-none');
                        $('#orderType').prop('disabled', true);
                        console.log(response.data)
                        console.log("false Hode");
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Failed to fetch:', error);
                }
            });
        }
    })
}

function clearOrderIdInput() {
    $('#returnPopupCancelBtn, #returnPopupClose').click(function () {
        $('#tblOrders input[type="checkbox"]').not($(this)).prop('checked', false);
        $('#orderId').val('')
        OrderNo = null;
        $('#returnStatus').addClass('d-none');
        $('#orderType').prop('disabled', false);
    })
}

function returnFullOrders(id) {

    $('#returnPopupAddBtn').click(function () {

        const orderType = $('#orderType').val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        if (orderType === 'Full Order') {
            $.ajax({
                url: "http://localhost:8080/api/v1/orders/" + id,
                type: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                contentType: "application/json",
                success: function (response) {
                    getAllOrders();
                    console.log(response.data);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Order has been Returned",
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function (resp) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
            });
        } else if (orderType === 'One Item') {

            const form = $('#returnItemInputForm');
            if (!validateForm(form)) {
                return;
            }
            
            alert("aaa")
            const itemId = $('#itemId').val();
            const itemColor = $('#itemColor').val();
            const itemSize = $('#itemSize').val();
            const itemQty = $('#itemQty').val();

            const data = {
                inventory: {
                    itemCode: itemId,
                },
                size: itemSize,
                color: itemColor,
                orderNo: {
                    orderNo: id,
                },
                itmQTY: itemQty
            }
            $.ajax({
                url: "http://localhost:8080/api/v1/orders/oneItem",
                type: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {
                    getAllOrders();
                    console.log(response.data);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item has been Returned",
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function (resp) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: resp.responseJSON.message,
                        footer: '<a href="#"></a>'
                    });
                }
            });
        }
    })

}