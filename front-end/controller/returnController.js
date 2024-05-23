function returnController(){
getAllOrders();
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
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblSupplier tbody').empty()
            for (const orders of resp.data) {
                const row = `<tr>
                                <th scope="row">
                                 <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value=""/>
                                </div>
                                </th>
                                <td>${orders.orderNo}</td>
                                <td>${orders.supplierName}</td>
                                <td>${orders.category}</td>
                                <td>${orders.mobileNo}</td>
                                <td>${orders.email}</td>
                             
                            </tr>`;
                $('#tblSupplier').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}