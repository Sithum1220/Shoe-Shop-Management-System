const sideMenu = $('.aside');
const menuBtn = $('#menu-btn');
const closeBtn = $('#close-btn');
const darkMode = $('.dark-mode');
const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn');

$('#employee').css("display", "none");
$('#supplier').css("display", "none");
$('#inventory').css("display", "none");
$('#users').css("display", "none");

menuBtn.click(function () {
    sideMenu.style.display = 'block';
})

closeBtn.click(function () {
    sideMenu.style.display = 'none';
})

darkMode.click(function () {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.$('span:nth-child(1)').addClass().toggle('active')
    darkMode.$('span:nth-child(2)').addClass().toggle('active')
})

function loadDataTable() {
    Orders.forEach(order => {
        const tr = document.createElement('tr');
        const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary">Details</td>`;
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
    });
}

function htmlLoad() {
    $(document).ready(function(){
        $("#loadBtn").click(function(){
            
        });
    });
}

dashboardBtn.click(function () {
    $('#dashboard').css("display", "block");
    $('#employee').css("display", "none");
    $('#supplier').css("display", "none");
    $('#inventory').css("display", "none");
    $('#users').css("display", "none");
    dashboardBtn.addClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
})
loadDataTable()

employeeBtn.click(function () {
    $('#employee').css("display", "block");
    $('#dashboard').css("display", "none");
    $('#supplier').css("display", "none");
    $('#inventory').css("display", "none");
    $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.addClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    $.ajax({
        url: "../employee/index.html",
        dataType: 'html',
        success: function(response) {
            $("#employee").html(response);
        }
    });
})
supplierBtn.click(function () {
    $('#employee').css("display", "none");
    $('#dashboard').css("display", "none");
    $('#supplier').css("display", "block");
    $('#inventory').css("display", "none");
    $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.addClass('active')
    userBtn.removeClass('active')
    inventoryBtn.removeClass('active')

})
inventoryBtn.click(function () {
    $('#employee').css("display", "none");
    $('#dashboard').css("display", "none");
    $('#supplier').css("display", "none");
    $('#inventory').css("display", "block");
    $('#users').css("display", "none");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    userBtn.removeClass('active')
    inventoryBtn.addClass('active')
})

userBtn.click(function () {
    $('#employee').css("display", "none");
    $('#dashboard').css("display", "none");
    $('#supplier').css("display", "none");
    $('#inventory').css("display", "none");
    $('#users').css("display", "block");
    dashboardBtn.removeClass('active')
    employeeBtn.removeClass('active')
    supplierBtn.removeClass('active')
    inventoryBtn.removeClass('active')
    userBtn.addClass('active')
    
})