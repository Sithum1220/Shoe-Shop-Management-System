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
    $('#inventorySection').remove();
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
    $('#inventorySection').remove();

    fetch('http://localhost:63342/shoe_management_system/front-end/Pages/customers/customer.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);
            
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#customerSection').innerHTML;
            
            $("#pages").html(extractedContent);
                customerFunction();
                pagination();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
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
    // $('#employeSection').remove();
    // $('#inventorySection').remove();
    // $('#userSection').remove();
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
    dashboard.css('display', 'none');
    $('#customerSection').remove();

    fetch('http://localhost:63342/shoe_management_system/front-end/Pages/user/inventory.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#inventorySection').innerHTML;

            $("#pages").html(extractedContent);
            inventoryFunction();
            pagination();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
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
