const dashboardBtn = $('#dashboardBtn');
const customerBtn = $('#customerBtn');
const orderBtn = $('#orderBtn');
const inventoryBtn = $('#inventoryBtn');
const profileBtn = $('#profileBtn'),
    home = $('.home'),
    dashboard = $('#dashboard');

dashboardBtn.click(function () {
    // $('#dashboard').css("display", "block");
    // $('#employee').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.addClass('active')
    customerBtn.removeClass('active')
    orderBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    profileBtn.removeClass('active')
    dashboard.css('display', 'block');
    $('#customerSection').remove();
    // $('#supplierSection').remove();
    // $('#inventorySection').remove();
    // $('#userSection').remove();
})

customerBtn.click(function () {
    // $('#employee').css("display", "block");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    customerBtn.addClass('active')
    orderBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    profileBtn.removeClass('active')
    dashboard.css('display', 'none');
    // $('#supplierSection').remove();
    // $('#inventorySection').remove();
    // $('#userSection').remove();
    $('#pages').load('customer.html #customerSection', function () {
        customerFunction();
        pagination();
    });
})
orderBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "block");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    orderBtn.addClass('active')
    inventoryBtn.removeClass('active')
    profileBtn.removeClass('active')
    dashboard.css('display', 'none');
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
    // $('#pages').load('supplier.html #supplierSection', function () {
    //     pagination();
    //     supplierFunction();
    // });
})
inventoryBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "block");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    orderBtn.removeClass('active')
    profileBtn.removeClass('active')
    inventoryBtn.addClass('active')
    // $('#employeSection').remove();
    // $('#userSection').remove();
    // $('#supplierSection').remove();
    // dashboard.css('display', 'none');
    // $('#pages').load('inventory.html #inventorySection', function () {
    //     pagination();
    //     inventoryFunction();
    // });
})

profileBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "block");
    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    orderBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    profileBtn.addClass('active')
    // $('#employeSection').remove();
    // $('#inventorySection').remove();
    // $('#supplierSection').remove();
    // dashboard.css('display', 'none');
    // $('#pages').load('user.html #userSection', function () {
    //     pagination();
    //     userFunction();
    // });
})

function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}
