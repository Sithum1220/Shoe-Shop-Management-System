const dashboardBtn = $('#dashboardBtn');
const employeeBtn = $('#employeeBtn');
const supplierBtn = $('#supplierBtn');
const inventoryBtn = $('#inventoryBtn');
const userBtn = $('#userBtn');
const addEmployee = $('#addEmployee'),
    updateEmployee = $('#updateEmployee'),
    deleteEmployee = $('#deleteEmployee'),
    showDetails = $('#showDetails'),
    userCredentials = $('#userCredentials'),
    form_close = $('.from_close'),
    employeeRole = $('#employeeRole'),
    home = $('.home');

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

})


const tableHeader = document.querySelector('.table-header');
const table = document.querySelector('#mytable');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const rowsPerPage = 10; // Change as needed
let currentPage = 0;

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
        paginationContainer.style.bottom = '20px'; // Adjust as needed
    }
});

// Show the first page initially
showPage(currentPage);
updateButtons();

addEmployee.click(function () {
    $('#mainlable').text('Add Employee Details')
    home.addClass('show')
    $('#saveBtn').text("Save")
enableTxtField()
})
updateEmployee.click(function () {
    $('#mainlable').text('Update Employee Details')
    home.addClass('show')
    $('#saveBtn').text("Update")
enableTxtField()
})
deleteEmployee.click(function () {
    $('#mainlable').text('Delete Employee Details')
    $('#saveBtn').text("Delete")

    home.addClass('show')
})
showDetails.click(function () {
    $('#mainlable').text('All Employee Details')
    disableTxtField();
    $('#saveBtn').text("Close")
    $('#saveBtn').click(function () {
        home.removeClass('show');
    })

    home.addClass('show')

})
form_close.click(function () {
    home.removeClass('show');
})

var value = employeeRole.val();


employeeRole.change(function () {
    console.log($(this).val());
    if ($(this).val() == 'Admin' || $(this).val() == 'User') {
        $('#userCredentials').removeClass('d-none');
    } else {
        $('#userCredentials').addClass('d-none');
    }
})

function disableTxtField() {
    $("#employeeCode").prop('disabled', true);
    $("#employeeName").prop('disabled', true);
    $("#employeeGender").prop('disabled', true);
    $("#employeeStatus").prop('disabled', true);
    $("#employeeDesignation").prop('disabled', true);
    $("#employeeDOB").prop('disabled', true);
    $("#employeeDOJ").prop('disabled', true);
    $("#employeeBranch").prop('disabled', true);
    $("#employeeBuilding").prop('disabled', true);
    $("#employeeCity").prop('disabled', true);
    $("#employeeLane").prop('disabled', true);
    $("#employeeState").prop('disabled', true);
    $("#employeeEmail").prop('disabled', true);
    $("#employeeRole").prop('disabled', true);
    $("#employeePostalCode").prop('disabled', true);
    $("#employeeContactNumber").prop('disabled', true);
    $("#employeeGuardian").prop('disabled', true);
    $("#employeeGuardianContact").prop('disabled', true);
}

function enableTxtField() {
    $("#employeeCode").prop('disabled', false);
    $("#employeeName").prop('disabled', false);
    $("#employeeGender").prop('disabled', false);
    $("#employeeStatus").prop('disabled', false);
    $("#employeeDesignation").prop('disabled', false);
    $("#employeeDOB").prop('disabled', false);
    $("#employeeDOJ").prop('disabled', false);
    $("#employeeBranch").prop('disabled', false);
    $("#employeeBuilding").prop('disabled', false);
    $("#employeeCity").prop('disabled', false);
    $("#employeeLane").prop('disabled', false);
    $("#employeeState").prop('disabled', false);
    $("#employeeEmail").prop('disabled', false);
    $("#employeeRole").prop('disabled', false);
    $("#employeePostalCode").prop('disabled', false);
    $("#employeeContactNumber").prop('disabled', false);
    $("#employeeGuardian").prop('disabled', false);
    $("#employeeGuardianContact").prop('disabled', false);
}


