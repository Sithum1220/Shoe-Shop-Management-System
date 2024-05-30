const dashboardBtn = $('#dashboardBtn');
const customerBtn = $('#customerBtn');
const orderBtn = $('#orderBtn');
const inventoryBtn = $('#inventoryBtn');
const profileBtn = $('#profileBtn'),
    dashboard = $('#dashboard'),
 customerOrderBtn = $('#customerOrderBtn'),
    employeeBtn = $('#employeeBtn'),
    logout = $('#logout'),
    returnBtn = $('#returnBtn');

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
    employeeBtn.removeClass('active')
    dashboard.css('display', 'block');
    returnBtn.removeClass('active')
    $('#customerSection').remove();
    $('#inventorySection').remove();
    $('#customerOrderSection').remove();
    $('#employeSection').remove();
    
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
    returnBtn.removeClass('active')
    employeeBtn.removeClass('active')
    dashboard.css('display', 'none');
    // $('#supplierSection').remove();
    // $('#inventorySection').remove();
    $('#customerOrderSection').remove();
    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/customers/customer.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#customerMainSection').innerHTML;

            $("#pages").html(extractedContent);
            customerFunction();
            customerControlFunction();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
    
})

employeeBtn.click(function () {
    dashboardBtn.removeClass('active')
    customerBtn.removeClass('active')
    orderBtn.removeClass('active')
    employeeBtn.addClass('active')
    inventoryBtn.removeClass('active')
    returnBtn.removeClass('active')
    profileBtn.removeClass('active')
    dashboard.css('display', 'none');

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/user/employee.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#employeeMainSection').innerHTML;

            $("#pages").html(extractedContent);
            employeeFunction();
            employeeControlFunction();
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
    returnBtn.removeClass('active')

    employeeBtn.removeClass('active')
    profileBtn.removeClass('active')
    dashboard.css('display', 'none');
    // $('#employeSection').remove();
    // $('#inventorySection').remove();
    // $('#userSection').remove();
    // $('#pages').load('supplier.html #supplierSection', function () {
    //     pagination();
    //     supplierFunction();
    // });

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/customers/customerOrder.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#customerOrderMainSection').innerHTML;

            $("#pages").html(extractedContent);
            customerOrderFunction();
            purchaseOrderController();
            // orderController();
            // customerFunction();
            // customerControlFunction();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
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
    returnBtn.removeClass('active')

    profileBtn.removeClass('active')
    employeeBtn.removeClass('active')
    inventoryBtn.addClass('active')
    dashboard.css('display', 'none');
    $('#customerSection').remove();

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/user/inventory.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#InventoryMainSection').innerHTML;

            $("#pages").html(extractedContent);
            inventoryFunction();
            inventoryController();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
})


returnBtn.click(function () {
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    returnBtn.addClass('active')
    dashboard.css('display', 'none');

    $('#employeSection').remove();
    $('#inventorySection').remove();

    fetch('return.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#returnMainSection').innerHTML;

            $("#pages").html(extractedContent);
            returnFunction();
            returnController();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
})

function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}

logout.click(function () {
    console.log('logout clicked');
    window.location.href = '../../Home/index.html'
})