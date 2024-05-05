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
        employeePageUserCredentials = $('.employeePageUserCredentials'),
        employeeFormIcon = $('#employeeFormIcon'),
        employeeFormContainer = $('#employeeFormContainer'),
        employeePopupClose = $('#employeePopupClose'),
        employeeRole = $('#employeeRole');
    const imgUploader = $('#imgUploader');
    const imgViewer = $('#imgViewer');

    addEmployee.click(function () {
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
        $('#employeeCode').attr('readonly', "");
        $('.txt').val("")
        $('#employeeGender').val($('#employeeGender option:first').val());
        $('#employeeRole').val($('#employeeRole option:first').val());
        $('#imgViewer').attr('src','#')
        generateNewId();
    })
    updateEmployee.click(function () {
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
        employeeFormTitle.text('Employee Details')
        employeePopupAddBtn.css('display', 'none');
        employeePopupCancelBtn.css('width', '100%');
        employeeFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        employeeTxtFieldBox.css('display', 'block');
        $("#employeeGender").prop('disabled', true);
        $("#employeeDOB").prop('disabled', true);
        $("#employeeDOJ").prop('disabled', true);
        $("#employeeRole").prop('disabled', true);
        $("#imgUploader").prop('disabled', true);
        disableTxtField();
    })
    
    employeeRole.change(function () {
        console.log($(this).val());
        if ($(this).val() === 'ADMIN' || $(this).val() === 'USER') {
            employeePageUserCredentials.removeClass('d-none');
        } else {
            employeePageUserCredentials.addClass('d-none');
        }
    })

    $('#employeePopupCancelBtn').click(function () {
        $('#tblEmployee tr').each(function () {
            $('#tblEmployee input[type="checkbox"]').not($(this)).prop('checked', false);
        })
        $('.txt').val("")
        $('#employeeGender').val($('#employeeGender option:first').val());
        $('#employeeRole').val($('#employeeRole option:first').val());
        $('#imgViewer').attr('src','#')
    });
    $('#employeePopupClose').click(function () {
        $('#tblEmployee tr').each(function () {
            $('#tblEmployee input[type="checkbox"]').not($(this)).prop('checked', false);
        })
        $('.txt').val("")
        $('#employeeGender').val($('#employeeGender option:first').val());
        $('#employeeRole').val($('#employeeRole option:first').val());
        $('#imgViewer').attr('src','#')
    });

}