const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const customerBtn = $('#customerBtn');
const customerOrderBtn = $('#customerOrderBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn'),
    dashboard = $('#dashboard'),
    logout = $('#logout'),
    returnBtn = $('#returnBtn');

dashboardBtn.click(function () {
    // $('#dashboard').css("display", "block");
    // $('#employee').css("display", "none");
    // $('#supplier').css("display", "none");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.addClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    customerBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    returnBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    
    dashboard.css('display', 'block');
    $('#employeSection').remove();
    $('#supplierSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
    $('#customerSection').remove();
    $('#customerOrderSection').remove();
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
    customerBtn.removeClass('active')
    returnBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    
    dashboard.css('display', 'none');
    $('#supplierSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
    // $('#tblEmployee tbody').empty()

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/admin/employee.html')
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
    customerBtn.removeClass('active')
    returnBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    
    dashboard.css('display', 'none');
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
    $('#customerSection').remove();

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/admin/supplier.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#supplierMainSection').innerHTML;

            $("#pages").html(extractedContent);
            supplierFunction();
            supplierControlFunction();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
})
customerBtn.click(function () {
    // $('#employee').css("display", "none");
    // $('#dashboard').css("display", "none");
    // $('#supplier').css("display", "block");
    // $('#inventory').css("display", "none");
    // $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.addClass('active')
    returnBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    
    dashboard.css('display', 'none');
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#supplierSection').remove();
    $('#userSection').remove();

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
    customerBtn.removeClass('active')
    returnBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    
    $('#employeSection').remove();
    $('#userSection').remove();
    $('#supplierSection').remove();
    dashboard.css('display', 'none');

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/admin/inventory.html')
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
    returnBtn.removeClass('active')
    customerBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    userBtn.addClass('active')
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#supplierSection').remove();
    dashboard.css('display', 'none');

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/admin/user.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#UserMainSection').innerHTML;

            $("#pages").html(extractedContent);
            userController();
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
})

customerOrderBtn.click(function () {
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
    customerOrderBtn.addClass('active')
    returnBtn.removeClass('active')
    userBtn.removeClass('active')
    dashboard.css('display', 'none');
    
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#supplierSection').remove();

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

returnBtn.click(function () {
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    customerBtn.removeClass('active')
    customerOrderBtn.removeClass('active')
    returnBtn.addClass('active')
    userBtn.removeClass('active')
    dashboard.css('display', 'none');

    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#supplierSection').remove();

    fetch('http://localhost:63342/Shoe-Shop-Management-System/front-end/Pages/admin/return.html')
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
// function datePicker() {
//         $("#employeeDOJ").datepicker({
//             dateFormat: 'yy-mm-dd',
//             maxDate: new Date()
//         });
//         $("#employeeDOB").datepicker({
//             dateFormat: 'yy-mm-dd',
//             maxDate: new Date()
//         });
// }

logout.click(function () {
    console.log('logout clicked');
    window.location.href = '../../Home/index.html'
})