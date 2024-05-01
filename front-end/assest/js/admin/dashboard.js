const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn'),
    home = $('.home'),
    home2 = $('.home2'),
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
        userFunction();
    });
})

function pagination() {
    const tableHeader = document.querySelector('.table-header');
    const table = document.querySelector('.mytable');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const rowsPerPage = 10; // Change as needed
    let currentPage = 0;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            updateButtons();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalRows = table.querySelectorAll('tbody tr').length;
        if (currentPage < Math.ceil(totalRows / rowsPerPage) - 1) {
            currentPage++;
            showPage(currentPage);
            updateButtons();
        }
    });

    window.addEventListener('scroll', function () {
        const tableRect = table.getBoundingClientRect();
        const paginationContainer = document.querySelector('.pagination-container');
        const paginationRect = paginationContainer.getBoundingClientRect();

        if (tableRect.bottom < paginationRect.height) {
            paginationContainer.style.bottom = `${tableRect.bottom - paginationRect.height}px`;
        } else {
            paginationContainer.style.bottom = '20px';
        }
    });

    function showPage(pageNumber) {
        const start = pageNumber * rowsPerPage;
        const end = start + rowsPerPage;

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index >= start && index < end) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function updateButtons() {
        const totalRows = table.querySelectorAll('tbody tr').length;
        if (currentPage === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        if ((currentPage + 1) * rowsPerPage >= totalRows) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    showPage(currentPage);
    updateButtons();
}
function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}