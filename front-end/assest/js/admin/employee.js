
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
        employeeFormIcon.attr('src', '../../assest/images/Frame07.png')
        employeeFormTitle.text('Add Employee')
        $("#employeeGender").prop('disabled', false);
        $("#employeeDOB").prop('disabled', false);
        $("#employeeDOJ").prop('disabled', false);
        $("#employeeRole").prop('disabled', false);
        enableTxtField()
    })
    updateEmployee.click(function () {
        home.addClass('show')
        employeeFormTitle.text('Update Employee')
        employeePopupAddBtn.css('display', 'block');
        employeePopupAddBtn.text("Update")
        employeePopupCancelBtn.css('width', '48%');
        employeeFormIcon.attr('src', '../../assest/images/edit-btn.png')
        $("#employeeGender").prop('disabled', false);
        $("#employeeDOB").prop('disabled', false);
        $("#employeeDOJ").prop('disabled', false);
        $("#employeeRole").prop('disabled', false);
        enableTxtField()
    })
    deleteEmployee.click(function () {

    })
    showEmployeeDetails.click(function () {
        home.addClass('show')
        employeeFormTitle.text('Employee Details')
        employeePopupAddBtn.css('display', 'none');
        employeePopupCancelBtn.css('width', '100%');
        employeeFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        employeeTxtFieldBox.css('display', 'block');
        $("#employeeGender").prop('disabled', true);
        $("#employeeDOB").prop('disabled', true);
        $("#employeeDOJ").prop('disabled', true);
        $("#employeeRole").prop('disabled', true);
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