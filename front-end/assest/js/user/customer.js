function customerFunction() {
    const addCustomer = $('#addCustomer'),
        updateCustomer = $('#updateCustomer'),
        deleteCustomer = $('#deleteCustomer'),
        showCustomerDetails = $('#showCustomerDetails'),
        customerFormTitle = $('#customerFormTitle'),
        customerPopupCancelBtn = $('#customerPopupCancelBtn'),
        customerPopupAddBtn = $('#customerPopupAddBtn'),
        customerFormIcon = $('#customerFormIcon'),
        customerPopupClose = $('#customerPopupClose');

    addCustomer.click(function () {
        home.addClass('show')
        customerPopupAddBtn.text("Save")
        customerPopupAddBtn.css('display', 'block');
        customerPopupCancelBtn.css('width', '48%');
        customerFormIcon.attr('src', '../../assest/images/Frame07.png')
        customerFormTitle.text('Add Customer')
        $("#customerGender").prop('disabled', false);
        $("#customerDOB").prop('disabled', false);
        $("#customerDOJ").prop('disabled', false);
        enableTxtField()
    })
    updateCustomer.click(function () {
        home.addClass('show')
        customerFormTitle.text('Update Customer')
        customerPopupAddBtn.css('display', 'block');
        customerPopupAddBtn.text("Update")
        customerPopupCancelBtn.css('width', '48%');
        customerFormIcon.attr('src', '../../assest/images/edit-btn.png')
        $("#customerGender").prop('disabled', false);
        $("#customerDOB").prop('disabled', false);
        $("#customerDOJ").prop('disabled', false);
        enableTxtField()
    })
    deleteCustomer.click(function () {

    })
    showCustomerDetails.click(function () {
        home.addClass('show')
        customerFormTitle.text('Customer Details')
        customerPopupAddBtn.css('display', 'none');
        customerPopupCancelBtn.css('width', '100%');
        customerFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        $("#customerGender").prop('disabled', false);
        $("#customerDOB").prop('disabled', false);
        $("#customerDOJ").prop('disabled', false);
        disableTxtField();
    })
    customerPopupClose.click(function () {
        home.removeClass('show');

    })
    customerPopupCancelBtn.click(function () {
        home.removeClass('show');

    })

    $(document).ready(function () {
        $("#customerDOB").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
        $("#customerDOJ").datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: new Date()
        });
    });
}