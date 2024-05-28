
setProfileImageAndName();
updateGreeting();
totalSalesOfASelectedDate();
totalProfitOfASelectedDate();
mostSaleItemOfASelectedDate();

$(document).ready(function(){
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true
    });

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1 < 10 ? `0${today.getMonth()+1}` : `${today.getMonth()+1}`;
    let day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    let finalTodayDate = month+'/'+day+'/'+year;
    $('#totalSaleDate').val(finalTodayDate).change();
    $('#totalProfitDate').val(finalTodayDate).change();
    $('#mostSaleItemStatusDate').val(finalTodayDate).change();
});

function setProfileImageAndName() {
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
            $('#name').text(response.data.employeeName)
            const uploadDiv = $('.profile-photo');
            uploadDiv.empty();
            const img = $('<img>').attr('src', 'data:image/jpeg;base64,' + response.data.proPic)
            uploadDiv.append(img);
        },
        error: function (xhr, status, error) {
            console.error('Failed to fetch image:', error);
        }
    });
}

function updateGreeting() {
    // Get the current date and time
    const now = new Date();
    const hours = now.getHours();

    // Define the greeting based on the time of day
    let greeting;
    if (hours < 12) {
        greeting = "Good Morning!";
    } else if (hours < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    $('#greeting').text(greeting);
}

setInterval(updateGreeting, 3600000);

function totalSalesOfASelectedDate() {
    $('#totalSaleDate').change(function () {

        const accessToken = localStorage.getItem('accessToken');
        let date = $(this).val();

        const parts = date.split('/');
        if (parts.length !== 3) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Invalid Date',
                footer: '<a href="#"></a>'
            });

            return;
        }

        var mm = parts[0];
        var dd = parts[1];
        var yyyy = parts[2];

        let finalDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;

        $.ajax({
            url: "http://localhost:8080/api/v1/dashboard/totalSale/" + finalDate,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                let totalSales = response.data;
                // Format total sales: add leading zero if less than 10
                let formattedTotalSales = totalSales < 10 ? `0${totalSales}` : `${totalSales}`;
                $('#totalSale').text(formattedTotalSales);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    })

}

function totalProfitOfASelectedDate() {
    $('#totalProfitDate').change(function () {
        const accessToken = localStorage.getItem('accessToken');
        let date = $(this).val();

        const parts = date.split('/');
        if (parts.length !== 3) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Invalid Date',
                footer: '<a href="#"></a>'
            });

            return;
        }

        var mm = parts[0];
        var dd = parts[1];
        var yyyy = parts[2];

        let finalDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;

        $.ajax({
            url: "http://localhost:8080/api/v1/dashboard/totalProfit/" + finalDate,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                let totalSales = response.data;
                // Format total sales: add leading zero if less than 10
                let formattedTotalSales = totalSales < 10 ? `0${totalSales}` : `${totalSales}`;
                $('#totalProfit').text(formattedTotalSales);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    })

}

function mostSaleItemOfASelectedDate() {
    $('#mostSaleItemStatusDate').change(function () {
        const accessToken = localStorage.getItem('accessToken');
        let date = $(this).val();

        const parts = date.split('/');
        if (parts.length !== 3) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Invalid Date',
                footer: '<a href="#"></a>'
            });

            return;
        }

        var mm = parts[0];
        var dd = parts[1];
        var yyyy = parts[2];

        let finalDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;

        $.ajax({
            url: "http://localhost:8080/api/v1/dashboard/mostSaleItem/" + finalDate,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                let soldQty = response.data.salesCount;
                // Format total sales: add leading zero if less than 10
                if (response.data.itemCode !== undefined) {
                    let finalSoldQty = soldQty < 10 ? `0${soldQty}` : `${soldQty}`;
                    $('#soldQty').text(finalSoldQty);
                    $('#mostSaleItemCode').text(response.data.itemCode);
                }else {
                    $('#soldQty').text('00');
                    $('#mostSaleItemCode').text('No Orders');
                }
                getMostSaleItemDetails(response.data.itemCode)
                
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    })
}

function getMostSaleItemDetails(itemId) {
    if (itemId !== undefined) {
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/" + itemId,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                $('#mostSaleItemPic').attr('src', 'data:image/jpeg;base64,' + response.itemPicture);
                $('#mostSaleItemNameDiv').removeClass('d-none');
                if (response.status === "Available") {
                    $('#mostSaleItemStatus').css('color', 'green');
                } else if (response.status === "LOW") {
                    $('#mostSaleItemStatus').css('color', '#F5B412');
                } else {
                    $('#mostSaleItemStatus').css('color', 'red');
                }
                $('#mostSaleItemStatus').text(response.status);
                $('#mostSaleItemName').text(response.itemDesc);
                $('#qtyOnHand').text(response.qty < 10 ? `0${response.qty}` : `${response.qty}`);

                $('.progress-circle').each(function () {
                    let value = $(this).data('value');
                    let percentage = (response.qty / response.originalQty) * 100;

                    let cssValue;
                    if (percentage > 50) {
                        cssValue = 'conic-gradient(#28a745 ' + (percentage * 3.6) + 'deg, #e9ecef 0deg)';
                        $(this).find('.progress-value').css('color', '#28a745');
                    } else if (percentage <= 50 && percentage > 20) {
                        cssValue = 'conic-gradient(#F5B412 ' + (percentage * 3.6) + 'deg, #e9ecef 0deg)';
                        $(this).find('.progress-value').css('color', '#F5B412');
                    } else if (percentage <= 20) {
                        cssValue = 'conic-gradient(red ' + (percentage * 3.6) + 'deg, #e9ecef 0deg)';
                        $(this).find('.progress-value').css('color', 'red');
                    }
                    $(this).css('background', cssValue);
                    $(this).find('.progress-value').text(percentage + '%');
                });

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    }else {
        $('#mostSaleItemPic').attr('src', '#');
        $('#mostSaleItemNameDiv').addClass('d-none');
        $('#mostSaleItemStatus').css('color', 'red');
        $('#mostSaleItemStatus').text('No Orders');
        $('#qtyOnHand').text('00');

        $('.progress-circle').each(function () {
            let cssValue = 'conic-gradient(red ' + (0 * 3.6) + 'deg, #e9ecef 0deg)';
                $(this).find('.progress-value').css('color', 'black');
            $(this).css('background', cssValue);
            $(this).find('.progress-value').text(0 + '%');
        });
    }
}

// function formatDate(date) {
//     var mm = date.getMonth() + 1; // January is 0!
//     var dd = date.getDate();
//     var yyyy = date.getFullYear();
//
//     return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
// }