
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
        smallPopupClose = $('#smallPopupClose'),
        smallPopupCancelBtn = $('#smallPopupCancelBtn'),
        smallPopupAddBtn = $('#smallPopupAddBtn'),
        smallPopupBox = $('#smallPopupBox'),
        smallFormTitle = $('#smallFormTitle'),
        smallFormIcon = $('#smallFormIcon'),
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
        $("#employeeGender").prop('disabled', false);
        $("#employeeDOB").prop('disabled', false);
        $("#employeeDOJ").prop('disabled', false);
        $("#employeeRole").prop('disabled', false);
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
        $("#employeeGender").prop('disabled', false);
        $("#employeeDOB").prop('disabled', false);
        $("#employeeDOJ").prop('disabled', false);
        $("#employeeRole").prop('disabled', false);
        enableTxtField()
    })
    deleteEmployee.click(function () {
        // employeeFormTitle.text('Delete Employee')
        // employeePopupAddBtn.text("Delete")
        // employeePopupAddBtn.css('display', 'block');
        // employeePopupCancelBtn.css('width', '48%');
        // employeeTxtFieldBox.css('display', 'none');
        // employeeDeletePopupBox.css('display', 'block');
        // employeeFormIcon.attr('src', '../../assest/images/deleteIcon.png')
        // employeeFormContainer.css('max-width', '600px')
        // employeeFormContainer.css('max-transition', 'none')
        home2.addClass('show2')
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

    smallPopupClose.click(function () {
        home2.removeClass('show2');
    })
    smallPopupCancelBtn.click(function () {
        home2.removeClass('show2');
    })
    smallPopupAddBtn.click(function () {
        home2.removeClass('show2');
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