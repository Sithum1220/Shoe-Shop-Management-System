const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const customerBtn = $('#customerBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn'),
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
    customerBtn.removeClass('active')
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
    customerBtn.removeClass('active')
    dashboard.css('display', 'none');
    $('#supplierSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();

    fetch('http://localhost:63342/shoe_management_system/front-end/Pages/admin/employee.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#employeeMainSection').innerHTML;

            $("#pages").html(extractedContent);
            employeeFunction();
            pagination();
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
    dashboard.css('display', 'none');
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#userSection').remove();
    $('#customerSection').remove();

    fetch('http://localhost:63342/shoe_management_system/front-end/Pages/admin/supplier.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#supplierMainSection').innerHTML;

            $("#pages").html(extractedContent);
            supplierFunction();
            pagination();
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
    dashboard.css('display', 'none');
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#supplierSection').remove();
    $('#userSection').remove();

    fetch('http://localhost:63342/shoe_management_system/front-end/Pages/customers/customer.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#customerMainSection').innerHTML;

            $("#pages").html(extractedContent);
            customerFunction();
            pagination();
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
    
    $('#employeSection').remove();
    $('#userSection').remove();
    $('#supplierSection').remove();
    dashboard.css('display', 'none');

    fetch('http://localhost:63342/shoe_management_system/front-end/Pages/admin/inventory.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#InventoryMainSection').innerHTML;

            $("#pages").html(extractedContent);
            inventoryFunction();
            pagination();
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
    customerBtn.removeClass('active')
    userBtn.addClass('active')
    $('#employeSection').remove();
    $('#inventorySection').remove();
    $('#supplierSection').remove();
    dashboard.css('display', 'none');

    fetch('http://localhost:63342/shoe_management_system/front-end/Pages/admin/user.html')
        .then(response => response.text())
        .then(data => {
            console.log("HTML file loaded successfully:", data);

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            var extractedContent = tempDiv.querySelector('#UserMainSection').innerHTML;

            $("#pages").html(extractedContent);
            inventoryFunction();
            pagination();
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
function datePicker() {
        $("#employeeDOJ").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
        $("#employeeDOB").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
}