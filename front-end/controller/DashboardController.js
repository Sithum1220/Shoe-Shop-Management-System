setProfileImageAndName();
updateGreeting();
totalSalesOfASelectedDate();
totalProfitOfASelectedDate();
mostSaleItemOfASelectedDate();
fetchLastThreeOrders();
totalItemsSoldOnDate();


documentReady();

function documentReady() {
    $(document).ready(function () {
        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`;
        let day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
        let finalTodayDate = month + '/' + day + '/' + year;
        $('#totalSaleDate').val(finalTodayDate).change();
        $('#totalProfitDate').val(finalTodayDate).change();
        $('#mostSaleItemStatusDate').val(finalTodayDate).change();
        $('#totalItemsSoldDate').val(finalTodayDate).change();
        resetPw();
    });
}


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
            $('#profileName').text(response.data.employeeName)
            $('#welcomeName').text(response.data.employeeName + ',')

            let joinDate = response.data.joinDate;

            const date = new Date(joinDate);
            const options = {year: 'numeric', month: 'long'};
            const finalDate = date.toLocaleDateString('en-US', options);
            let parts = finalDate.split(' ');
            let month = parts[0];
            let year = parts[1];
            $('#joinDate').text(month + ', ' + year);
            const uploadDiv = $('.profile-photo');
            uploadDiv.empty();
            const img = $('<img>').attr('src', 'data:image/jpeg;base64,' + response.data.proPic)
            $('#profilePicViewer').attr('src', 'data:image/jpeg;base64,' + response.data.proPic)
            $('#resetPicViewer').attr('src', 'data:image/jpeg;base64,' + response.data.proPic)
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
                } else {
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
                    percentage = percentage.toFixed(2);

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
    } else {
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

function fetchLastThreeOrders() {
    const accessToken = localStorage.getItem('accessToken');

    $.ajax({
        url: 'http://localhost:8080/api/v1/dashboard/recent',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (response) {
            // Clear existing rows
            $('#orders-body').empty();
            // Append new rows
            response.data.forEach(function (order) {
                let row = `<tr>
                                <td>${order.orderNo}</td>
                                <td>${order.purchaseDate}</td>
                                <td>${order.cashier}</td>
                                <td>${order.total}</td>
                                <td>${order.status}</td>
                            </tr>`;
                $('#orders-body').append(row);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching orders:', error);
            $('#orders-body').html(`<tr><td colspan="5">Error fetching orders. Please try again later.</td></tr>`);
        }
    });
}

function totalItemsSoldOnDate() {
    $('#totalItemsSoldDate').change(function () {

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
            url: "http://localhost:8080/api/v1/dashboard/totalItemsSold/" + finalDate,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                let totalItem = response.data;
                // Format total sales: add leading zero if less than 10
                let finalTotalItem = totalItem < 10 ? `0${totalItem}` : `${totalItem}`;
                $('#totalItemsSold').text(finalTotalItem);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
    })
}

function resetPw() {
    var resetPageCurrentStep = 0;
    var resetPWSteps = $('.formStep');

    $('.nextStep').click(function () {

        let checkBtn = true;
        if ($('#changePW').text() === 'Close') {
            console.log("AA")
            $('#wrongPW').addClass('d-none');
            resetPageCurrentStep = 0;
            $(resetPWSteps[resetPageCurrentStep]).addClass('active');
            $('#closeBtn').click();
            checkBtn = false;
            $('#changePW').text("Get Verification")
            $('#errorMsg').css('color', 'red');
            $('.checkPW').css('border', 'red solid 1px');
            $('#email').val('');
            $('#code').val('');
            $('#newPassword').val('');
            $('#confirmPassword').val('');

        }

        if (checkBtn) {
            console.log(resetPageCurrentStep);
            if (resetPageCurrentStep === 0) {
                let emailForm = $('#emailForm');
                if (!validateForm(emailForm)) {
                    return;
                }

                $('#msg').text("Provide the email address associated with your account to recover your password.")
                $('#changePW').text("Get Verification")

                var email = $('#email').val();
                if (email === localStorage.getItem('email')) {

                    $(resetPWSteps[resetPageCurrentStep]).removeClass('active').addClass('slide-out');
                    $(resetPWSteps[resetPageCurrentStep + 1]).addClass('active slide-in');
                    $('#wrongPW').addClass('d-none');
                    $.ajax({
                        url: 'http://localhost:8080/api/v1/users/request-password-reset/' + email,
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(email),
                        success: function (response) {
                            $('#wrongPW').addClass('d-none');
                            console.log(response);
                            resetPageCurrentStep = 1;

                        },
                        error: function (xhr, status, error) {
                            $('#errorMsg').text(xhr.responseJSON.message);
                            $('#wrongPW').removeClass('d-none');
                            $('#errorMsg').css('color', 'red');
                            $('.checkPW').css('border', 'red solid 1px');
                        }
                    });
                } else {
                    $('#errorMsg').text("Wrong Email Address");
                    $('#wrongPW').removeClass('d-none');
                    $('#errorMsg').css('color', 'red');
                    $('.checkPW').css('border', 'red solid 1px');
                }
            } else if (resetPageCurrentStep === 1) {

                let codeForm = $('#codeForm');
                if (!validateForm(codeForm)) {
                    return;
                }
                $('#msg').text("we have sent a password reset code by email. Enter it below to reset your password")
                $('#changePW').text("Change Password")

                let token = $('#code').val();

                $.ajax({
                    url: 'http://localhost:8080/api/v1/users/reset-password?token=' + token,
                    type: 'POST',
                    contentType: 'application/json',
                    success: function (response) {
                        resetPageCurrentStep = 2;
                        console.log("lllll")
                        $('#wrongPW').addClass('d-none');
                        $(resetPWSteps[resetPageCurrentStep - 1]).removeClass('active').addClass('slide-out');
                        $(resetPWSteps[resetPageCurrentStep]).addClass('active slide-in');

                    },
                    error: function (xhr, status, error) {
                        $('#errorMsg').text(xhr.responseJSON.message);
                        $('#wrongPW').removeClass('d-none');
                        $('#errorMsg').css('color', 'red');
                        $('.checkPW').css('border', 'red solid 1px');
                    }
                });
            } else if (resetPageCurrentStep === 2) {
                let pwForm = $('#pwForm');
                if (!validateForm(pwForm)) {
                    return;
                }

                $('#msg').text("Reset Your Password")
                $('#signupBtn').text("Change Password")

                console.log("AWA")
                var newPassword = $('#newPassword').val();
                var confirmPassword = $('#confirmPassword').val();

                if (newPassword === confirmPassword) {
                    var token = $('#code').val();

                    $.ajax({
                        url: 'http://localhost:8080/api/v1/users/save-password?token=' + token+'&newPassword=' + newPassword,
                        type: 'POST',
                        contentType: 'application/json',
                        success: function (response) {
                            console.log(response);
                            $('#errorMsg').text(response);
                            $('#errorMsg').css('color', 'green');
                            $('.checkPW').css('border', 'green solid 1px');
                            $('#wrongPW').removeClass('d-none');
                            $('#changePW').text("Close");
                            $(resetPWSteps[resetPageCurrentStep]).removeClass('active').addClass('slide-out');
                        },
                        error: function (xhr, status, error) {
                            $('#errorMsg').text(xhr.responseJSON.message);
                            $('#wrongPW').removeClass('d-none');
                            $('#errorMsg').css('color', 'red');
                            $('.checkPW').css('border', 'red solid 1px');
                        }
                    });

                } else {
                    $('#errorMsg').text("Passwords does not match!");
                    $('#wrongPW').removeClass('d-none');
                    $('#errorMsg').css('color', 'red');
                    $('.checkPW').css('border', 'red solid 1px');
                }
            }
        }
    });
}