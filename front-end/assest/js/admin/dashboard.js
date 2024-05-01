const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn'),
    home = $('.home'),
    dashboard = $('#dashboard');

dashboardBtn.click(function () {
    // $('#dashboard').css("display", "block");
    // $('#employee').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.addClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    dashboard.css('display', 'block');
    $('#employeSection').remove();
    $('#supplierSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
})

employeeBtn.click(function () {
    // $('#employee').css("display", "block");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.addClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    dashboard.css('display', 'none');
    $('#supplierSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
    $('#pages').load('employee.html #employeSection', function () {
        pagination();
        employeeFunction();
    });
})
supplierBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "block");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    dashboard.css('display', 'none');
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
    $('#pages').load('supplier.html #supplierSection', function () {
        pagination();
        supplierFunction();
    });
})
inventoryBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "block");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.addClass('active')
    $('#employeSection').remove();
    $('#userSection').remove();
    $('#supplierSection').remove();
    dashboard.css('display', 'none');
    $('#pages').load('inventory.html #inventorySection', function () {
        pagination();
        inventoryFunction();
    });
})

userBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "block");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.addClass('active')
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#supplierSection').remove();
    dashboard.css('display', 'none');
    $('#pages').load('user.html #userSection', function () {
        pagination();
    });
})

function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}