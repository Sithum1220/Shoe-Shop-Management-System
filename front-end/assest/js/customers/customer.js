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
        customerPopupAddBtn.text("Save")
        customerPopupAddBtn.css('display', 'block');
        // customerPopupCancelBtn.css('width', '48%');
        customerFormIcon.attr('src', '../../assest/images/Frame07.png')
        customerFormTitle.text('Add Customer')
        enableTxtField()
        $('.txt').val("")
        $('#customerGender').val($('#customerGender option:first').val());
        $('#supplierCode').attr('readonly', "");
        $("#customerGender,#customerDOB,#customerDOJ").prop('disabled', false);
        $('.hideTxt').addClass('d-none');
        generateNewCustomerId();
    })
    updateCustomer.click(function () {
        customerFormTitle.text('Update Customer')
        customerPopupAddBtn.css('display', 'block');
        customerPopupAddBtn.text("Update")
        // customerPopupCancelBtn.css('width', '48%');
        customerFormIcon.attr('src', '../../assest/images/edit-btn.png')
        $("#customerGender,#customerDOB,#customerDOJ").prop('disabled', false);
        $('.hideTxt').addClass('d-none');

        enableTxtField()
    })
    deleteCustomer.click(function () {

    })
    showCustomerDetails.click(function () {
        customerFormTitle.text('Customer Details')
        customerPopupAddBtn.css('display', 'none');
        customerPopupCancelBtn.css('width', '100%');
        customerFormIcon.attr('src', '../../assest/images/detailsIcon.png')
        $("#customerGender,#customerDOB,#customerDOJ").prop('disabled', true);
        disableTxtField();
        $('.hideTxt').removeClass('d-none');
    })
    $('#customerPopupCancelBtn,#customerPopupClose').click(function () {
        $('#tblCustomer tr').each(function () {
            $('#tblCustomer input[type="checkbox"]').not($(this)).prop('checked', false);
        })
        $('.txt').val("")
        $('#customerGender').val($('#customerGender option:first').val());
    });

}   
// $(document).ready(function () {
//     $("#customerDOB").datepicker({
//         dateFormat: 'yy-mm-dd',
//         maxDate: new Date()
//     });
//     $("#customerDOJ").datepicker({
//         dateFormat: 'yy-mm-dd',
//         maxDate: new Date()
//     });
// });