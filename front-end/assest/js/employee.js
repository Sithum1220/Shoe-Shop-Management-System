
function employeeFunction() {
    const addEmployee = $('#addEmployee'),
        updateEmployee = $('#updateEmployee'),
        deleteEmployee = $('#deleteEmployee'),
        showEmployeeDetails = $('#showEmployeeDetails'),
        employeeFormTitle = $('#employeeFormTitle'),
        employeePopupCancelBtn = $('#employeePopupCancelBtn'),
        employeeTxtFieldBox = $('#employeeTxtFieldBox'),
        employeeDeletePopupBox = $('#employeeDeletePopupBox'),
        employeePopupAddBtn = $('#employeePopupAddBtn'),
        employeePageUserCredentials = $('#employeePageUserCredentials'),
        employeeFormIcon = $('#employeeFormIcon'),
        employeeFormContainer = $('#employeeFormContainer'),
        employeePopupClose = $('#employeePopupClose'),
        employeeRole = $('#employeeRole');



    addEmployee.click(function () {
        home.addClass('show')
        employeePopupAddBtn.text("Save")
        employeePopupAddBtn.css('display', 'block');
        employeePopupCancelBtn.css('width', '48%');
        employeeDeletePopupBox.css('display', 'none');
        employeeTxtFieldBox.css('display', 'block');
        employeeFormIcon.attr('src', '../../assest/images/Frame07.png')
        employeeFormTitle.text('Add Employee')
        employeeFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    updateEmployee.click(function () {
        employeeFormTitle.text('Update Employee')
        home.addClass('show')
        employeePopupAddBtn.css('display', 'block');
        employeePopupAddBtn.text("Update")
        employeePopupCancelBtn.css('width', '48%');
        employeeDeletePopupBox.css('display', 'none');
        employeeTxtFieldBox.css('display', 'block');
        employeeFormIcon.attr('src', '../../assest/images/edit-btn.png')
        employeeFormContainer.css('max-width', '800px')
        enableTxtField()
    })
    deleteEmployee.click(function () {
        employeeFormTitle.text('Delete Employee')
        employeePopupAddBtn.text("Delete")
        employeePopupAddBtn.css('display', 'block');
        employeePopupCancelBtn.css('width', '48%');
        employeeTxtFieldBox.css('display', 'none');
        employeeDeletePopupBox.css('display', 'block');
        employeeFormIcon.attr('src', '../../assest/images/deleteIcon.png')
        employeeFormContainer.css('max-width', '600px')
        employeeFormContainer.css('max-transition', 'none')


        home.addClass('show')
    })
    showEmployeeDetails.click(function () {
        employeeFormTitle.text('Employee Details')
        employeePopupAddBtn.css('display', 'none');
        employeePopupCancelBtn.css('width', '100%');
        employeeFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        employeeDeletePopupBox.css('display', 'none');
        employeeTxtFieldBox.css('display', 'block');
        employeeFormContainer.css('max-width', '800px')
        home.addClass('show')
        disableTxtField();
    })
    employeePopupClose.click(function () {
        home.removeClass('show');
        employeeFormContainer.css('max-width', '800px')

    })
    employeePopupCancelBtn.click(function () {
        home.removeClass('show');
        employeeFormContainer.css('max-width', '800px')

    })
    employeeRole.change(function () {
        console.log($(this).val());
        if ($(this).val() === 'Admin' || $(this).val() === 'User') {
            employeePageUserCredentials.removeClass('d-none');
        } else {
            employeePageUserCredentials.addClass('d-none');
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

    $(document).ready(function () {
        $("#employeeDOJ").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
        $("#employeeDOB").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
    });
}